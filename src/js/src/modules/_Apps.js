// Модуль для работы приложений

export default class Apps {
    constructor() {
        this.appsContainer = document.querySelector('.apps-settings-view');
        this.appsList = null;
        this.bookmarksContainer = document.querySelector('.pinned-bookmarks-box')

        this.apps = this.getApps(); // Асинхронно получаем список приложений
        this.checkedApps = this.getCheckedApps(); // Получаем отмеченные приложения
        
        this.renderCheckbox(); // Отрисовываем чекбоксы приложений
        this.renderApps(); // Отрисовываем приложения
    }

    // Отрисовка чекбоксов в настройках
    renderCheckbox() {
        this.apps
            .then(data => {
                data.forEach((app) => {
                    this.appsContainer.innerHTML += `
                        <label class="apps-item">
                            <input type="checkbox" ${this.isChecked(app.name) ? 'checked' : ''}>
                            <div class="app-icon" style="background-image: url(../img/${app.icon});"></div>
                            <div class="app-title">${app.name}</div>
                            <div class="check-state app-check">
                                <div class="icon icon-check"></div>
                            </div>
                            <div class="check-state app-uncheck">
                                <div class="icon icon-plus"></div>
                            </div>
                        </label>
                    `
                    
                })
                this.appsList = document.querySelectorAll('.apps-item input');
                this.checkAppsHandler();
            })
            
    }

    // Отрисовка отмеченных приложений
    renderApps() {
        this.bookmarksContainer.innerHTML = ''
        const appsList = this.getCheckedApps()
        this.apps 
            .then(data => {
                data.forEach(app => {
                    if(appsList.indexOf(app.name) !== -1) { // Проверяем, есть ли название итерируемого приложения в массиве отмеченных
                        this.bookmarksContainer.innerHTML += `
                            <a class="pinned-bookmarks-item" href="${app.url}">
                                <div class="pinned-bookmarks-img" style="background-image: url(../img/${app.icon});"></div>
                                <div class="pinned-bookmarks-title">${app.name}</div>
                            </a>
                        `
                    }
                })
            })
    }

    // Проверка отмеченности приложений
    isChecked(name) {
        const apps = this.getCheckedApps()
        return apps.indexOf(name) !== -1
    }

    // Отслеживаем нажатие на чекбокс
    checkAppsHandler() {
        this.appsList.forEach(item => {
            item.addEventListener('click', () => {
                this.setCheckedApp(item.parentElement)
            })
        })
    }

    // Ставим отметку на приложении
    setCheckedApp(app) {
        const apps = this.getCheckedApps()
        if(app.childNodes[1].checked) { // Если чекбокс активируется
            apps.push(app.childNodes[5].innerHTML)
            localStorage.setItem('apps', JSON.stringify(apps))
            this.renderApps()
        } else { // Если чексбок деактивируется
            apps.forEach((item, index) => {
                if(app.childNodes[5].innerHTML === item) {
                    index == 0 ? apps.splice(index, index + 1) : apps.splice(index, index)
                    localStorage.setItem('apps', JSON.stringify(apps))
                    this.renderApps()
                }
            })
        }
        
    }

    // Получение отмеченных приложений из хранилища
    getCheckedApps() {
        let apps;
        if(localStorage.getItem('apps')) {
            apps = JSON.parse(localStorage.getItem('apps'))
        } else {
            apps = []
        }
        return apps;
    }

    // Получение приложений из базы
    async getApps() {
        const response = await fetch('https://search-bar-f3678.firebaseio.com/apps.json')
        const resData = await response.json();

        return resData;
    }
}