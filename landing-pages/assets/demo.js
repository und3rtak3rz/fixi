(() => {
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  // All locations, offers and conversations on these pages are illustrative.
  // No account, repair request or verification document is sent to a server.
  const dialog = document.createElement('dialog');
  dialog.className = 'demo-dialog';
  dialog.setAttribute('aria-labelledby', 'demo-dialog-title');
  dialog.innerHTML = `
    <div class="dialog-top"><span>Fixi · интерактивный концепт</span><button type="button" class="dialog-close" aria-label="Закрыть">×</button></div>
    <div data-dialog-content></div>`;
  document.body.append(dialog);
  $('.dialog-close', dialog).addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  const vehicleFields = `
    <div class="field-grid"><div class="field"><label for="request-brand">Марка</label><select id="request-brand" name="brand"><option>BYD</option><option>Tesla</option><option>Volkswagen</option><option>BMW</option><option>Geely</option><option>Другая</option></select></div>
    <div class="field"><label for="request-model">Модель и год</label><input id="request-model" name="model" placeholder="Например, Han, 2023" required maxlength="80"></div></div>
    <div class="field"><label for="request-city">Город</label><select id="request-city" name="city"><option>Минск</option><option>Брест</option><option>Витебск</option><option>Гомель</option><option>Гродно</option><option>Могилёв</option></select></div>
    <div class="field"><label for="request-problem">Что случилось?</label><textarea id="request-problem" name="problem" placeholder="Опишите симптомы своими словами" required maxlength="2000"></textarea></div>`;

  function openDialog(kind, source) {
    const content = $('[data-dialog-content]', dialog);
    const titles = { request: 'Расскажите, что случилось', provider: 'Стать исполнителем', login: 'Ваш профиль в Fixi', ai: 'Разберёмся с симптомами', station: source?.dataset.name || 'Мастерская' };
    let fields = '';
    let button = 'Посмотреть черновик';
    let description = 'Подходящие СТО смогут предложить условия. Здесь можно попробовать форму без отправки заявки.';
    if (kind === 'request' || kind === 'ai') {
      fields = vehicleFields;
      if (kind === 'ai') description = 'Будущий помощник будет искать по мануалам вашей модели и показывать источники. В этом концепте доступен пример уточняющего вопроса.';
    } else if (kind === 'provider') {
      description = 'Один аккаунт для клиента и исполнителя. Сначала — статус и данные, затем — проверка модератором.';
      fields = `<div class="field"><label for="provider-type">Ваш статус</label><select id="provider-type" name="status"><option>Физическое лицо</option><option>Индивидуальный предприниматель</option><option>Юридическое лицо</option></select></div><div class="field"><label for="provider-name">Название СТО или имя</label><input id="provider-name" name="name" placeholder="Как вас найдут клиенты" required maxlength="100"></div><p class="dialog-legal">На следующем этапе продукта будет проверка данных и документов. В демонстрации документы не запрашиваются.</p>`;
      button = 'Посмотреть следующие шаги';
    } else if (kind === 'login') {
      description = 'Гараж, заявки и отзывы в одном профиле. Из него можно подключить роль исполнителя.';
      fields = `<div class="field"><label for="account-email">Электронная почта</label><input id="account-email" name="email" type="email" placeholder="you@example.com" autocomplete="email" required></div>`;
      button = 'Попробовать регистрацию';
    } else {
      description = 'Пример карточки СТО. Название, рейтинг и услуги приведены для демонстрации интерфейса.';
      fields = `<p>Диагностика, обслуживание электромобилей и поиск неисправностей. Окончательные условия мастерская уточняет после описания проблемы.</p><div class="field"><label for="station-problem">Что нужно сделать?</label><textarea id="station-problem" name="problem" placeholder="Опишите задачу для мастерской" required maxlength="2000"></textarea></div>`;
    }
    content.innerHTML = `<h2 id="demo-dialog-title"></h2><p class="muted" data-dialog-description></p><form>${fields}<button class="button dialog-submit" type="submit">${button} <span aria-hidden="true">↗</span></button><p class="dialog-legal">Демонстрация: данные не отправляются, аккаунт и заказ не создаются.</p></form><div class="dialog-notice" role="status" hidden></div>`;
    $('#demo-dialog-title', content).textContent = titles[kind] || titles.request;
    $('[data-dialog-description]', content).textContent = description;
    $('form', content).addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const notice = $('.dialog-notice', content);
      if (kind === 'provider') notice.textContent = `${data.get('status')}: далее — реквизиты, необходимые документы и отправка модератору. Ваша анкета здесь не отправлена.`;
      else if (kind === 'login') notice.textContent = 'В рабочем сервисе следующим шагом будет подтверждение контакта. В этом концепте письмо не отправляется.';
      else if (kind === 'ai') notice.textContent = 'Пример вопроса помощника: «Когда появляется шум: при включении климата, на холодном автомобиле или во время движения?» Поиск по мануалам в этом концепте не подключён.';
      else notice.textContent = `Черновик готов${data.get('brand') ? `: ${data.get('brand')} ${data.get('model')}, ${data.get('city')}` : ''}. В рабочем сервисе после публикации его получат подходящие исполнители. Заявка не отправлена.`;
      notice.hidden = false;
    });
    dialog.showModal();
  }

  $$('[data-dialog]').forEach(button => button.addEventListener('click', () => openDialog(button.dataset.dialog, button)));

  const filters = { service: 'all', brand: 'all', city: 'Минск' };
  const cards = $$('.station-card[data-services]');
  function filterStations() {
    let visible = 0;
    cards.forEach(card => {
      const serviceMatch = filters.service === 'all' || card.dataset.services.split(',').includes(filters.service);
      const brandMatch = filters.brand === 'all' || card.dataset.brands.split(',').includes(filters.brand);
      const cityMatch = !filters.city || card.dataset.city === filters.city;
      const matches = serviceMatch && brandMatch && cityMatch;
      card.hidden = !matches;
      const pin = $(`[data-pin="${card.dataset.station}"]`);
      if (pin) pin.hidden = !matches;
      if (matches) visible++;
    });
    $$('[data-count]').forEach(el => { el.textContent = String(visible); });
    $$('[data-empty]').forEach(el => { el.hidden = visible > 0; });
    const firstVisible = cards.find(card => !card.hidden);
    if (firstVisible) selectStation(firstVisible.dataset.station);
    else {
      $$('[data-map-detail]').forEach(el => { el.textContent = 'В этом наборе демоданных совпадений нет'; });
      $$('.is-selected[data-pin],.is-selected.station-card').forEach(el => el.classList.remove('is-selected'));
      $$('[data-pin]').forEach(el => el.setAttribute('aria-pressed', 'false'));
    }
  }
  function selectStation(id) {
    cards.forEach(card => card.classList.toggle('is-selected', card.dataset.station === id));
    $$('[data-pin]').forEach(pin => {
      const active = pin.dataset.pin === id;
      pin.classList.toggle('is-selected', active);
      pin.setAttribute('aria-pressed', String(active));
    });
    const active = cards.find(card => card.dataset.station === id);
    if (active) $$('[data-map-detail]').forEach(el => { el.textContent = active.dataset.name; });
  }
  $$('[data-filter-group]').forEach(group => {
    $$('[data-filter]', group).forEach(chip => chip.addEventListener('click', () => {
      filters[group.dataset.filterGroup] = chip.dataset.filter;
      $$('[data-filter]', group).forEach(other => {
        const active = other === chip;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      filterStations();
    }));
  });
  $$('[data-pin]').forEach(pin => pin.addEventListener('click', () => selectStation(pin.dataset.pin)));
  $$('[data-search-form]').forEach(form => form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    filters.brand = data.get('brand') || 'all';
    filters.service = data.get('service') || 'all';
    filters.city = data.get('city') || 'Минск';
    $$('[data-filter-group]').forEach(group => $$('[data-filter]', group).forEach(chip => {
      const active = chip.dataset.filter === filters[group.dataset.filterGroup];
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', String(active));
    }));
    filterStations();
    $('#catalog')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }));
  $$('[data-endorse]').forEach(button => button.addEventListener('click', () => {
    const active = button.getAttribute('aria-pressed') === 'true';
    button.setAttribute('aria-pressed', String(!active));
    button.classList.toggle('is-endorsed', !active);
    const label = $('[data-endorse-label]', button);
    const count = $('[data-endorse-count]', button);
    const initial = Number(button.dataset.initial || 12);
    if (label) label.textContent = active ? 'Подтвердить услугу' : 'Вы подтвердили';
    if (count) count.textContent = String(initial + (active ? 0 : 1));
  }));
  const conversation = $('[data-ai-example]');
  $$('[data-ai-question]').forEach(button => button.addEventListener('click', () => {
    $$('[data-ai-question]').forEach(other => other.classList.toggle('is-active', other === button));
    if (conversation) conversation.textContent = button.dataset.aiQuestion;
  }));
  if (cards.length) filterStations();
})();
