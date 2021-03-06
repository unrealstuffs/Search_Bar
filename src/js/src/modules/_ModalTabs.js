// Модуль для работы с вкладками в модальном окне
export default class ModalTabs {
    constructor() {
        this.tabList = document.querySelectorAll('.settings-modal-menu-item');
        this.contentList = document.querySelectorAll('.settings-modal-view > div');
        this.menu = document.querySelector('.settings-modal-menu');

        this.event();
        this.setIndex(); // Проставляем индексы при загрузке
    }

    // Отслеживаем нажатия на ссылки в меню
    event() {
        this.tabList.forEach(item => {
            item.addEventListener('click', () => this.show(item))
        })
    }

    // Показываем содержимое выбранной вкладки
    show(item) {
        this.removePrev(); // Удаляем активные классы со всех вкладок

        const index = item.getAttribute('data-index'); // Получаем дата атрибут выбранной вкладки
        const content = document.querySelector('.settings-modal-view > div[data-index="'+index+'"]');

        item.classList.add('a'); // Добавляем классы
        content.classList.add('a');
    }

    // Устанавливаем вкладкам и ссылкам дата атрибуты
    setIndex() {
        for (let i = 0; i < this.tabList.length; i++) {
            this.tabList[i].setAttribute('data-index', i);
            this.contentList[i].setAttribute('data-index', i);
        }
    }

    // Удаление активных классов со всех вкладок
    removePrev() {
        for (let i = 0; i < this.tabList.length; i++){
            this.tabList[i].classList.remove('a');
            this.contentList[i].classList.remove('a');
        }
    }
}