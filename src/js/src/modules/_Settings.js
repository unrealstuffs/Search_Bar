// Код в этом модуле крайне отвратительный
// Возможно я когда то его перепишу
// Но я постараюсь объяснить что тут происходит в комментариях

export default class Settings {
    constructor() {
        // Секция чекбоксов и инпутов в настройках
        this.setSearchEngine = document.querySelector('.search-engine');
        this.setSearchBarColor = document.querySelectorAll('.search-bar-color');
        this.setRoundedSearchBar = document.querySelector('.x-checkbox-input');
        
        // Секция элементов которые будут изменяться из настроек
        this.searchBarEngine = document.querySelector('.search-bar-engine');
        this.searchBarForm = document.querySelector('.search-bar');

        // Вызываем метод применения стандартных настроек
        this.setDefaultSettings();
        // Вызываем метод применения настроек
        this.applySettings('default');
        // Вызываем метод событий
        this.event();
    }

    // Отслеживаем события и вызываем метод сохранения настроек с разными параметрами
    event() {
        this.setSearchEngine.addEventListener('change', () => {
            this.saveSettings(this.setSearchEngine.value, "searchEngine"); // В качестве второго параметра передаем название настройки
        });
        this.setSearchBarColor.forEach(elem => {
            elem.addEventListener('change', () => {
                this.saveSettings(elem.value, "searchBarColor"); // В качестве второго параметра передаем название настройки
            });
        });
        this.setRoundedSearchBar.addEventListener('change', () => {
            this.saveSettings(this.setRoundedSearchBar.checked, "roundedSearchBar"); // В качестве второго параметра передаем название настройки
        });
    }

    // Если запуск первый, то ставим дефолтные настройки, иначе ничего не делаем
    setDefaultSettings() {
        if(localStorage.getItem('settings') === null) {
            let settings = {
                "searchEngine": "yandex",
                "searchBarColor": "light",
                "roundedSearchBar": false
            };
            localStorage.setItem('settings', JSON.stringify(settings));
        } else {
            return;
        }
        
    }

    // Метод сохранения настроек в локальное хранилище
    saveSettings(element, option) {
        // Получаем объект с настройками из хранилища
        let settings;

        if(localStorage.getItem('settings') === null) {
            settings = {};
        } else {
            settings = JSON.parse(localStorage.getItem('settings'));
        }
        // Странно, но если выносить этот кусок кода в отдельный метод, то код ломается
        
        // Делаем определенные действия в зависимости от выбранной настройки
        switch(option) {
            case 'searchEngine': // Проверяем настройку
                settings[option] = element // Устанавливаем ее знаечение
                localStorage.setItem('settings', JSON.stringify(settings)); // Помещаем в хранилище
                this.applySettings('searchEngine'); // Вызываем метод применения настроек
                break;
            case 'searchBarColor':
                settings[option] = element
                localStorage.setItem('settings', JSON.stringify(settings));
                this.applySettings('searchBarColor');
                break;
            case 'roundedSearchBar':
                settings[option] = element
                localStorage.setItem('settings', JSON.stringify(settings));
                this.applySettings('roundedSearchBar');
                break;
        }
    }

    // Метод применения настроек
    applySettings(option) {
        // Получаем объект с настройками из хранилища
        let settings;

        if(localStorage.getItem('settings') === null) {
            settings = {};
        } else {
            settings = JSON.parse(localStorage.getItem('settings'));
        }
        // Странно, но если выносить этот кусок кода в отдельный метод, то код ломается

        // Делаем определенные действия в зависимости от выбранной настройки
        switch(option) {
            case 'searchEngine': // При изменении поисковика меняем значения в форме и в окне настроек
                this.searchBarEngine.value = settings.searchEngine; // инпут в форме, задающий поисковик
                this.setSearchEngine.value = settings.searchEngine; // инпут в окне настроек
                break;
            case 'searchBarColor': // При изменении цвета делаем проверки на наличие классов и меняем их на выбранные
                if(settings.searchBarColor === 'light') {
                    this.searchBarForm.classList.remove('dark') // Не знаю зачем это, но без этой строчки не работает
                    this.searchBarForm.classList.add(settings.searchBarColor); // Добавляем выбранный класс
                    this.setSearchBarColor[0].checked = false; // Ставим значения радио кнопок
                    this.setSearchBarColor[1].checked = true;
                } else { // Здесь делаем аналогичные действия, но наоборот
                    this.searchBarForm.classList.remove('light');
                    this.searchBarForm.classList.add(settings.searchBarColor);
                    this.setSearchBarColor[0].checked = true;
                    this.setSearchBarColor[1].checked = false;
                }
                break;
            case 'roundedSearchBar': // При изменении чекбокса ставим класс или убираем его
                if(settings.roundedSearchBar) {
                    this.searchBarForm.classList.add('rounded-searchbar'); // Ставим класс
                    this.setRoundedSearchBar.checked = true; // Включаем чекбокс
                } else {
                    this.searchBarForm.classList.remove('rounded-searchbar'); // Ставим класс
                    this.setRoundedSearchBar.checked = false; // Выключаем чекбокс
                }
                break;
            case 'default': // Стандартный случай, запускается только при загрузке страницы, здесь собраны все действия что были выше. Ужасное решение
                this.searchBarEngine.value = settings.searchEngine;
                this.setSearchEngine.value = settings.searchEngine;

                if(settings.searchBarColor === 'light') {
                    this.searchBarForm.classList.remove('light')
                    this.searchBarForm.classList.add(settings.searchBarColor);
                    this.setSearchBarColor[0].checked = false;
                    this.setSearchBarColor[1].checked = true;
                } else {
                    this.searchBarForm.classList.remove('dark');
                    this.searchBarForm.classList.add(settings.searchBarColor);
                    this.setSearchBarColor[0].checked = true;
                    this.setSearchBarColor[1].checked = false;
                }

                if(settings.roundedSearchBar) {
                    this.searchBarForm.classList.add('rounded-searchbar');
                    this.setRoundedSearchBar.checked = true;
                } else {
                    this.searchBarForm.classList.remove('rounded-searchbar');
                    this.setRoundedSearchBar.checked = false;
                }
                break;
        }
    }
}