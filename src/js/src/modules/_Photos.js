export default class Photos {
    constructor() {
        this.photosContainer = document.querySelector('.previews.photos');
        this.firstMenuItem = document.querySelector('.wp-menu-item');
        this.searchPhotosInput = document.querySelector('.wp-search input');
        this.previewCategory = null;
        this.previewPhoto = null;

        this.photos = this.getPhotos(); // Асинхронно получаем фотки
        this.categories = this.getCategories(); // Асинхронно получаем список категорий
        this.appBackground = document.querySelector('#app');

        this.renderCategories(); // Отрисовывем список категорий
        this.event();
    }

    event() {
        this.firstMenuItem.addEventListener('click', () => {
            this.renderCategories(); // При клике на первый элемент меню, заново отрисовывем категории
        })
        this.searchPhotosInput.addEventListener('change', () => {
            this.searchPhotos(this.searchPhotosInput.value) // Принимаем асинхронный запрос при изменении формы поиска
                .then(data => this.renderPhotos(data, null)) // Отрисовываем фотки которые пришли с сервера
        })
    }

    // Вынес два хендлера в отдельные методы просто потому что могу

    // Отслеживаем клик на категорию
    previewCategoriesHandler() {
        this.previewCategory = document.querySelectorAll('.preview-box .preview.category');
        this.previewCategory.forEach(elem => {
            elem.addEventListener('click', () => { // При клике на категорию, отрисовываем фотки которые ей принадлежат
                this.renderPhotos(null, elem.childNodes[1].dataset.name) // название хранится в дата атрибуте
            })
        })
    }

    // Отслеживаем клик на фото
    searchInputHandler() {
        this.previewPhoto = document.querySelectorAll('.preview-box .preview.photo');
        this.previewPhoto.forEach(elem => {
            elem.addEventListener('click', () => {
                this.setImage(elem.dataset.url); // url хранится в дата атрибутах, гениально, согласен
            })
        })
    }

    // Метод отрисовки списка категорий
    renderCategories() {
        this.photosContainer.innerHTML = ''; // Удаляем все содержимое контейнера
        this.categories
            .then(categories => {
                categories.forEach(category => {
                    this.photosContainer.innerHTML += `
                        <div class="preview-box">
                            <div class="preview category" style="background-image: url(${category.preview});">
                                <div class="category-name" data-name="${category.name}">${category.title}</div>
                            </div>
                        </div>
                    `
                }) // Выводим список через цикл и начинаем отслеживать нажатие на категории
                this.previewCategoriesHandler();
            })
            .catch(err => console.log(err))
    }

    // Самый спорный метод, сделать его универсальным не получилось, пришлось юзать всякие костыли
    renderPhotos(data, category) {
        this.photosContainer.innerHTML = ''; // Удаляем содержимое контейнера
        if(category) { // Если в параметре пришло название категории, то отрисовываем фотки которые к ней принадлежат
            this.photos
                .then(data => {
                    data.forEach(photo => {
                        if(photo.category === category) { // Проверка на принадлежность к категории
                            this.photosContainer.innerHTML += `
                                <div class="preview-box">
                                    <div class="preview photo" data-url="${photo.src}" style="background-image: url(${photo.preview});"></div>
                                </div>
                            `
                        }
                    })
                    this.searchInputHandler(); // Начинаем отслеживать нажатие на фотографии
                })
                .catch(err => console.log(err));
        } else if(data) { // Если в параметре пришел поисковый запрос, то отрисовываем фотки 
            data.results.forEach(photo => {
                this.photosContainer.innerHTML += `
                    <div class="preview-box">
                        <div class="preview photo" data-url="${photo.urls.regular}" style="background-image: url(${photo.urls.thumb});"></div>
                    </div>
                `
            });
            this.searchInputHandler(); // Начинаем отслеживать нажатие на фотографии
        }
        
    }

    // Метод установки фотографии
    setImage(url) {
        this.appBackground.style.background = `url(${url}) center center / cover no-repeat`;
        this.saveToLocalStorage(url);
    }

    // Сохранение в local storage
    saveToLocalStorage(data) {
        localStorage.setItem('background-image', JSON.stringify(data));
    }

    // Поисковый запрос
    async searchPhotos(query) {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=25&orientation=landscape&client_id=CgcJzLyLwsl2CXp_BNEwr1ZBBuiS_TvVFYn3tqZQMA8`)
        const resData = await response.json()

        return resData;
    }

    // Получение категорий
    async getCategories() {
        const response = await fetch('https://search-bar-f3678.firebaseio.com/categories.json');
        const resData = await response.json();

        return resData;
    }

    // Получение фотографий
    async getPhotos() {
        const response = await fetch('https://search-bar-f3678.firebaseio.com/photos.json');
        const resData = await response.json();

        return resData;
    }
}