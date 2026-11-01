#!/usr/bin/env python3
"""Validate the editorial JSON and regenerate its Markdown, CSV and offline HTML views."""
from pathlib import Path
from collections import Counter
import csv
import json
import re

BASE = Path(__file__).resolve().parent
data = json.loads((BASE / 'services.json').read_text(encoding='utf-8'))
services = data['services']
categories = data['categories']
service_map = {s['id']: s for s in services}
category_map = {c['id']: c for c in categories}
group_map = {g['id']: g for c in categories for g in c['groups']}
source_ids = {s['id'] for s in data['sources']}

assert len(service_map) == len(services), 'Duplicate service ID'
assert len(category_map) == len(categories), 'Duplicate category ID'
assert len(group_map) == sum(len(c['groups']) for c in categories), 'Duplicate group ID'
assert len({s['label'].casefold() for s in services}) == len(services), 'Duplicate canonical label'
assert all(re.fullmatch(r'[a-z0-9_]+(?:\.[a-z0-9_]+)+', s['id']) for s in services)
membership = Counter()
for category in categories:
    for group in category['groups']:
        for service_id in group['service_ids']:
            assert service_id in service_map, f'Missing service: {service_id}'
            service = service_map[service_id]
            assert service['category_id'] == category['id']
            assert service['group_id'] == group['id']
            membership[service_id] += 1
assert set(membership) == set(service_map)
assert all(count == 1 for count in membership.values()), 'Each service must have one canonical parent'
references = []
for entry in data['shortcuts'] + data['crosslinks'] + data['screenshot_mapping']:
    references.extend(entry.get('service_ids', []))
    if 'category_id' in entry:
        assert entry['category_id'] in category_map
    if 'group_id' in entry:
        assert entry['group_id'] in group_map
for entry in data['crosslinks']:
    assert entry['from_group'] in group_map
for entry in data['symptom_routes']:
    references.extend(entry['candidate_service_ids'])
assert not set(references) - set(service_map), 'Unresolved service references'
assert all(set(s['source_ids']) <= source_ids for s in services)
assert all(s['visibility'] in ['public', 'review_required'] for s in services)

core = [s for s in services if s['module'] == 'core' and s['visibility'] == 'public']
commercial = [s for s in services if s['module'] == 'commercial']
held = [s for s in services if s['visibility'] == 'review_required']

with (BASE / 'services.csv').open('w', newline='', encoding='utf-8-sig') as file:
    fields = ['id', 'category', 'group', 'service', 'aliases', 'module', 'visibility', 'powertrains', 'fuel_types', 'requirements', 'source_ids']
    writer = csv.DictWriter(file, fieldnames=fields)
    writer.writeheader()
    for service in services:
        row = dict(id=service['id'], category=category_map[service['category_id']]['label'], group=group_map[service['group_id']]['label'], service=service['label'])
        for field in fields[4:]:
            value = service[field]
            row[field] = '; '.join(value) if isinstance(value, list) else value
        writer.writerow(row)

lines = [
    '# Fixi — полное дерево автоуслуг', '',
    f'Исследовательская версия от 1 ноября 2026 года. {len(core)} основных услуг, {len(commercial)} позиций грузового расширения и {len(held)} запросов на отдельное решение о публикации. Всего {len(services)} записей, {len(group_map)} групп.', '',
    'Это предложение для предметной проверки и UX-тестирования. Лист — клиентская задача, а не обязательно одна операция технологической карты. Варианты работ, материалы, методы и совместимость подтверждаются отдельно.', '',
    '- [Обоснование UX и источники](../research/service-taxonomy-research.md)',
    '- [Интерактивный просмотр](explorer.html)',
    '- [JSON — исходные данные](services.json) · [CSV — экспорт](services.csv)', '',
    '## Как читать дерево', '',
    'Категория → группа работ → услуга. Марки, модели, год, деталь кузова, размер колеса и материал — фильтры и параметры. Связанные входы используют тот же ID, поэтому не создают дублей услуг и подтверждений.', '',
    'Обозначения: `⚑` — отдельная компетенция / проверка условий; `⏸` — решение о публикации отложено, скрыто в обычном просмотре. Это продуктовые метки, а не правовая оценка.', '',
]
for category in categories:
    lines.extend([f'## {category["label"]}', '', f'ID: `{category["id"]}`. {category["section"]}.', ''])
    for group in category['groups']:
        lines.extend([f'### {group["label"]}', ''])
        for service_id in group['service_ids']:
            service = service_map[service_id]
            mark = '⏸ ' if service['visibility'] != 'public' else '⚑ ' if service['requirements'] else ''
            aliases = f'. Поиск: {", ".join(service["aliases"])}.' if service['aliases'] else '.'
            lines.append(f'- {mark}**{service["label"]}** — `{service_id}`{aliases}')
        crosslinks = [link for link in data['crosslinks'] if link['from_group'] == group['id']]
        for link in crosslinks:
            lines.extend(['', 'Связанные входы: ' + '; '.join(service_map[i]['label'] for i in link['service_ids']) + '.'])
        lines.append('')
lines.extend(['## Источники семейств услуг', '', 'Ссылки подтверждают охват семейств и наблюдения о предложениях. Группировка и синтезированные записи — авторский проект Fixi; источники не подтверждают каждую строку или наличие услуги у конкретного исполнителя.', ''])
for source in data['sources']:
    lines.append(f'- **{source["id"]}** [{source["title"]}]({source["url"]}) — {source["relevance"]}. Доступ: {source["accessed_at"]}.')
(BASE / 'tree.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')

lines = ['# Перенос категорий со скриншота', '', f'Сопоставлены все {len(data["screenshot_mapping"])} читаемых названий. Числа возле названий не использовались как статистика спроса или количества исполнителей: их происхождение и значение не подтверждены.', '', '| Исходное название | Решение | Цель | Комментарий |', '| --- | --- | --- | --- |']
for entry in data['screenshot_mapping']:
    targets = [f'{service_map[i]["label"]} (`{i}`)' for i in entry['service_ids']]
    if 'category_id' in entry:
        targets.insert(0, f'Категория: {category_map[entry["category_id"]]["label"]}')
    if 'group_id' in entry:
        targets.insert(0, f'Группа: {group_map[entry["group_id"]]["label"]}')
    lines.append(f'| {entry["source_label"]} | {entry["status"]} | {"; ".join(targets)} | {entry["note"]} |')
(BASE / 'screenshot-mapping.md').write_text('\n'.join(lines) + '\n', encoding='utf-8')

payload = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
template = (BASE / 'explorer.template.html').read_text(encoding='utf-8')
assert template.count('__CATALOG_DATA__') == 1
(BASE / 'explorer.html').write_text(template.replace('__CATALOG_DATA__', payload), encoding='utf-8')

print(json.dumps(dict(core_public=len(core), commercial=len(commercial), held=len(held), total=len(services), groups=len(group_map), aliases=sum(len(s['aliases']) for s in services), screenshot_labels=len(data['screenshot_mapping']), sources=len(source_ids)), ensure_ascii=False))
