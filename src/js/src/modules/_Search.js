export default class Search {
    constructor() {
        this.searchBar = document.querySelector('.search-bar');
        this.searchBarInput = document.querySelector('.search-bar-input');
        this.searchBarEngine = document.querySelector('.search-bar-engine')

        this.event();
    }

    // Listen for submit form and call method sendQuery
    event() {
        this.searchBar.addEventListener('submit', e => {
            e.preventDefault();

            const data = {text: this.searchBarInput.value, engine: this.searchBarEngine.value}
            this.sendQuery(data);
        })
    }

    // Open search engine
    sendQuery({text, engine}) {
        if(engine === 'yandex') {
            window.location.href = `https://yandex.ru/search/?text=${text}`
        }
    }
}