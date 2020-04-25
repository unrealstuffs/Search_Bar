// Модуль для работы с функцией загрузки

export default class Upload {
    constructor() {
        this.appBackground = document.querySelector('#app');
        this.addImgInput = document.querySelector('.add-img-area input[type=file]');

        this.event();
    }

    // Отслеживаем загрузку файла и запускаем функцию загрузки
    event() {
        this.addImgInput.addEventListener('change', () => {
            this.uploadPhoto(this.addImgInput);
        })
    }

    // Загружаем фотку и обрабатываем ее
    uploadPhoto(input) {
        if(input.files) {
            const reader = new FileReader(); // Если честно я хз как это работает, но оно работает
            reader.onload = e => {
                this.setPhoto(e.target.result); // Вызываем функцию установки фотки
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    setPhoto(url) {
        this.appBackground.style.background = `url(${url}) center center / cover no-repeat`; // Устанавливаем изображение
        this.saveToLocalStorage(url); // Вызываем метод сохранения
    }

    saveToLocalStorage(data) {
        localStorage.setItem('background-image', JSON.stringify(data)); // Сохраняем в локальное хранилище
    }
}