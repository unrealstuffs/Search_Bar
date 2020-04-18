// Модуль для работы формы поиска
export default class Search {
    constructor() {
        this.searchBar = document.querySelector('.search-bar'); // Форма
        this.searchBarInput = document.querySelector('.search-bar-input'); // Инпут в форме
        this.searchBarEngine = document.querySelector('.search-bar-engine') // Скрытый инпут в форме

        this.event();
    }

    // Прослушиваем форму и вызываем метод отправки запроса
    event() {
        this.searchBar.addEventListener('submit', e => {
            e.preventDefault();

            const data = {text: this.searchBarInput.value, engine: this.searchBarEngine.value}
            this.sendQuery(data);
        })
    }

    // Проверяем значение скрытой формы и открываем выбранный поисковик
    sendQuery({text, engine}) {
        if(engine === 'yandex') {
            window.location.href = `https://yandex.ru/search/?text=${text}`
        } else if(engine === 'google') {
            window.location.href = `https://www.google.com/search?q=${text}`
        }
    }
}