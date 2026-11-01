# Перенос категорий со скриншота

Сопоставлены все 58 читаемых названий. Числа возле названий не использовались как статистика спроса или количества исполнителей: их происхождение и значение не подтверждены.

| Исходное название | Решение | Цель | Комментарий |
| --- | --- | --- | --- |
| Диагностика двигателя | mapped | Диагностика двигателя (`diagnostics.mechanical.engine`) |  |
| Диагностика подвески | mapped | Диагностика подвески (`diagnostics.mechanical.suspension`) |  |
| Диагностика топливной системы | mapped | Диагностика топливной системы (`diagnostics.mechanical.fuel`) |  |
| Диагностика электрооборудования | mapped | Диагностика автоэлектрики (`diagnostics.electrical.electrics`) |  |
| Замена АКПП | mapped | Замена автоматической коробки передач (`mechanical.gearbox.automatic_replace`) |  |
| Замена и ремонт автостёкол | split | Замена лобового стекла (`glass_light.glass.windshield`); Замена бокового или заднего стекла (`glass_light.glass.other_glass`); Ремонт скола и трещины автомобильного стекла (`glass_light.glass.chip_repair`) | Тип стекла и характер повреждения уточняются. |
| Замена масла | clarify | Замена масла в двигателе (`maintenance.oils.engine_oil`); Замена масла в автоматической коробке передач (`maintenance.oils.automatic_oil`); Замена масла в механической коробке передач (`maintenance.oils.manual_oil`); Замена жидкости вариатора (`maintenance.oils.cvt_oil`); Замена масла в роботизированной коробке передач (`maintenance.oils.dct_oil`); Замена масла в раздаточной коробке (`maintenance.oils.transfer_oil`); Замена масла в редукторе и дифференциале (`maintenance.oils.axle_oil`); Замена жидкости и фильтра муфты полного привода (`maintenance.oils.awd_fluid`); Замена жидкости гидроусилителя (`maintenance.oils.steering_fluid`) | Без названия агрегата не назначать единственную услугу. |
| Замена МКПП | mapped | Замена механической коробки передач (`mechanical.gearbox.manual_replace`) |  |
| Заправка кондиционеров | mapped | Обслуживание и заправка кондиционера (`climate.ac.recharge`) |  |
| Компьютерная диагностика | mapped | Компьютерная диагностика автомобиля (`diagnostics.general.computer`) |  |
| Кузовной ремонт | category | Категория: Кузовной ремонт | Категория body, детализация необязательна для заявки. |
| Отключение иммобилайзера | review_required | Отключение иммобилайзера (`equipment.restricted.immo_off`) | Не публикуется автоматически. Уточнять право доступа и цель обращения. |
| Очистка сажевого фильтра | mapped | Очистка сажевого фильтра (`mechanical.exhaust.dpf_clean`) |  |
| Покраска авто | category | Категория: Покраска автомобиля | Категория paint. Не смешивать с оклейкой. |
| Предпродажная диагностика | mapped | Проверка автомобиля перед покупкой (`diagnostics.purchase.prepurchase`) | Название для пользователя: проверка автомобиля перед покупкой; роль заказчика уточняется. |
| Привязка ЭБУ двигателя | mapped | Привязка и адаптация заменённого блока (`electrical.modules.ecu_pair`) |  |
| Проточка барабанов | mapped | Проточка тормозных барабанов (`mechanical.brakes.drum_turn`) |  |
| Проточка тормозных дисков | mapped | Проточка тормозных дисков (`mechanical.brakes.disc_turn`) |  |
| Развал-схождение | mapped | Регулировка углов установки колёс (`wheels.alignment.adjustment`) |  |
| Регулировка фар | mapped | Регулировка света фар (`glass_light.lights.aim`) |  |
| Ремонт АКПП | mapped | Ремонт автоматической коробки передач (`mechanical.gearbox.automatic_repair`) |  |
| Ремонт балансира | clarify | Ремонт балансирных валов двигателя (`mechanical.engine.balance_shafts`); Ремонт балансирного узла грузовой подвески (`commercial.chassis.balance`) | Не балансировка колёс. Нужны автомобиль и узел. |
| Ремонт вариаторов | mapped | Ремонт вариатора (`mechanical.gearbox.cvt_repair`) |  |
| Ремонт выхлопной системы | mapped | Ремонт выхлопной системы (`mechanical.exhaust.exhaust_repair`) |  |
| Ремонт ГБЦ | mapped | Ремонт головки блока цилиндров (`mechanical.engine.cylinder_head`) |  |
| Ремонт глушителей | mapped | Ремонт и замена глушителя (`mechanical.exhaust.muffler`) |  |
| Ремонт двигателя | group | Группа: Двигатель | Сначала группа mechanical.engine: капремонт не подразумевается по умолчанию. |
| Ремонт замков зажигания | mapped | Ремонт автомобильных замков (`electrical.keys.lock_repair`) |  |
| Ремонт карданных валов | mapped | Ремонт карданного вала (`mechanical.driveline.propshaft`) |  |
| Ремонт кондиционеров | group | Группа: Обслуживание и ремонт кондиционера; Ремонт механического компрессора кондиционера (`climate.ac.compressor_repair`); Ремонт высоковольтного компрессора кондиционера (`ev.thermal.e_compressor`) | Группа climate.ac, для HV-компрессора — специальная компетенция. |
| Ремонт МКПП | mapped | Ремонт механической коробки передач (`mechanical.gearbox.manual_repair`) |  |
| Ремонт подвески | group | Группа: Подвеска и ступицы | Группа mechanical.suspension; уточнение детали необязательно. |
| Ремонт радиаторов | clarify | Ремонт радиатора охлаждения двигателя (`mechanical.cooling.radiator_repair`); Замена конденсора кондиционера (`climate.ac.condenser`); Замена радиатора отопителя салона (`climate.heating.heater_core`) | Радиатор охлаждения, кондиционера и печки — разные объекты. |
| Ремонт редуктора | clarify | Ремонт редуктора и дифференциала (`mechanical.driveline.diff_repair`); Ремонт редуктора электропривода (`ev.drive.gear`) | Уточнить тип привода. Газовый редуктор относится к ГБО. |
| Ремонт РКПП | mapped | Ремонт роботизированной коробки передач (`mechanical.gearbox.dct_repair`) |  |
| Ремонт рулевого управления | group | Группа: Рулевое управление | Группа mechanical.steering. |
| Ремонт рулевых реек | mapped | Ремонт рулевой рейки (`mechanical.steering.rack_repair`) |  |
| Ремонт системы отопления | clarify | Диагностика отопления салона (`climate.diagnostics.heating`); Ремонт высоковольтного электрического отопителя (`ev.thermal.ptc`); Ремонт теплового насоса автомобиля (`ev.thermal.heatpump`) |  |
| Ремонт системы охлаждения | group | Группа: Охлаждение двигателя | Группа mechanical.cooling; для батареи — ev.thermal. |
| Ремонт стартеров и генераторов | split | Ремонт стартера (`electrical.supply.starter_repair`); Ремонт генератора (`electrical.supply.alternator_repair`) |  |
| Ремонт суппортов | mapped | Ремонт тормозных суппортов (`mechanical.brakes.calipers`) |  |
| Ремонт топливной системы | group | Группа: Топливная система и впуск | Группа mechanical.fuel. |
| Ремонт тормозной системы | group | Группа: Тормозная система | Группа mechanical.brakes. |
| Ремонт турбин | mapped | Ремонт турбокомпрессора (`mechanical.boost.turbo_repair`) |  |
| Ремонт фар | mapped | Ремонт автомобильной фары (`glass_light.lights.repair`) |  |
| Ремонт форсунок | clarify | Ремонт топливных форсунок (`mechanical.fuel.injector_repair`); Ремонт газовых форсунок и редуктора (`equipment.gas.injectors`) | Тип топлива и система впрыска уточняются. |
| Ремонт ЭБУ двигателя | mapped | Ремонт электронного блока управления (`electrical.modules.ecu_repair`) |  |
| Ремонт электрики | category | Категория: Автоэлектрика и безопасность | Категория electrical. |
| Удаление EGR | review_required | Отключение системы EGR (`equipment.restricted.egr_off`) |  |
| Удаление вихревых заслонок SWIRL FLAPS | review_required | Удаление вихревых заслонок (`equipment.restricted.swirl_off`) |  |
| Удаление катализатора | review_required | Удаление каталитического нейтрализатора (`equipment.restricted.cat_remove`) |  |
| Удаление сажевого фильтра | review_required | Удаление или программное отключение сажевого фильтра (`equipment.restricted.dpf_off`) |  |
| Удаление системы ADBLUE | review_required | Отключение системы SCR и AdBlue (`equipment.restricted.scr_off`) |  |
| Фрезеровка ГБЦ | mapped | Восстановление плоскости головки блока цилиндров (`mechanical.machining.head_surface`) | Метод обработки сохраняется параметром; методы не считаются взаимозаменяемыми. |
| Хонинговка блока цилиндров | mapped | Хонингование цилиндров (`mechanical.machining.honing`) |  |
| Чип-тюнинг двигателя | mapped | Настройка программного обеспечения двигателя (`equipment.performance.ecu_tune`) |  |
| Шлифовка ГБЦ | mapped | Восстановление плоскости головки блока цилиндров (`mechanical.machining.head_surface`) | Уточнять метод и применимость. |
| Расточка блока | mapped | Расточка блока цилиндров (`mechanical.machining.boring`) |  |
