export default class Photos {
    constructor() {
        this.photosContainer = document.querySelector('.previews.photos');
        this.firstMenuItem = document.querySelector('.wp-menu-item');
        this.searchPhotosInput = document.querySelector('.wp-search input');
        this.previewCategory = null;
        this.previewPhoto = null;
        this.photos = this.getPhotos();
        this.categories = this.getCategories();
        this.appBackground = document.querySelector('#app');

        this.renderCategories();

        this.event();
    }

    event() {
        this.firstMenuItem.addEventListener('click', () => {
            this.renderCategories();
        })
        this.searchPhotosInput.addEventListener('change', () => {
            this.searchPhotos(this.searchPhotosInput.value)
                .then(data => this.renderPhotos(data, null))
        })
    }

    previewCategoriesHandler() {
        this.previewCategory = document.querySelectorAll('.preview-box .preview.category');
        this.previewCategory.forEach(elem => {
            elem.addEventListener('click', () => {
                this.renderPhotos(null, elem.childNodes[1].dataset.name)
            })
        })
    }

    searchInputHandler() {
        this.previewPhoto = document.querySelectorAll('.preview-box .preview.photo');
        this.previewPhoto.forEach(elem => {
            elem.addEventListener('click', () => {
                this.setImage(elem.dataset.url);
            })
        })
    }

    renderCategories() {
        this.photosContainer.innerHTML = '';
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
                })
                this.previewCategoriesHandler();
            })
            .catch(err => console.log(err))
    }

    renderPhotos(data, category) {
        this.photosContainer.innerHTML = '';
        if(category) {
            this.photos
                .then(data => {
                    data.forEach(photo => {
                        if(photo.category === category) {
                            this.photosContainer.innerHTML += `
                                <div class="preview-box">
                                    <div class="preview photo" data-url="${photo.src}" style="background-image: url(${photo.preview});"></div>
                                </div>
                            `
                        }
                    })
                    this.searchInputHandler();
                })
                .catch(err => console.log(err));
        } else if(data) {
            data.results.forEach(photo => {
                this.photosContainer.innerHTML += `
                    <div class="preview-box">
                        <div class="preview photo" data-url="${photo.urls.regular}" style="background-image: url(${photo.urls.thumb});"></div>
                    </div>
                `
            });
            this.searchInputHandler();
        }
        
    }

    setImage(url) {
        this.appBackground.style.background = `url(${url}) center center / cover no-repeat`;
        this.saveToLocalStorage(url);
    }

    saveToLocalStorage(data) {
        localStorage.setItem('background-image', JSON.stringify(data));
    }

    async searchPhotos(query) {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=25&orientation=landscape&client_id=CgcJzLyLwsl2CXp_BNEwr1ZBBuiS_TvVFYn3tqZQMA8`)
        const resData = await response.json()

        return resData;
    }

    async getCategories() {
        const response = await fetch('https://search-bar-f3678.firebaseio.com/categories.json');
        const resData = await response.json();

        return resData;
    }

    async getPhotos() {
        const response = await fetch('https://search-bar-f3678.firebaseio.com/photos.json');
        const resData = await response.json();

        return resData;
    }
}