export default class Upload {
    constructor() {
        this.appBackground = document.querySelector('#app');
        this.addImgInput = document.querySelector('.add-img-area input[type=file]');

        this.event();
    }

    event() {
        this.addImgInput.addEventListener('change', () => {
            this.uploadPhoto(this.addImgInput);
        })
    }

    uploadPhoto(input) {
        if(input.files) {
            const reader = new FileReader();
            reader.onload = e => {
                this.setPhoto(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    setPhoto(url) {
        this.appBackground.style.background = `url(${url}) center center / cover no-repeat`;
        this.saveToLocalStorage(url);
    }

    saveToLocalStorage(data) {
        localStorage.setItem('background-image', JSON.stringify(data));
    }
}