// Модуль в котором выполняются какие то функции при загрузке страницы
export default class Init {
    constructor() {
        this.body = document.querySelector('body');
        this.appBackground = document.querySelector('#app');
        
        this.render();
        this.getBackground();
    }

    render() {
        this.body.classList.add('load'); // Добавляем класс чтобы появился красивый эффект при загрузке
    }

    // Получаем фоновое изображение или цвет и запускаем метод установки
    getBackground() {
        let background;

        if(localStorage.getItem('background-image')) {
            background = JSON.parse(localStorage.getItem('background-image'));
            this.setBackground(background)
        }
    }

    // Устанавливаем изображение или цвет
    setBackground(value) {
        if(value[0] === 'r') { // С помощью нейронных сетей определяем, цвет или изображение пришло в качестве параметра
            this.appBackground.style.background = value;
        } else {
            this.appBackground.style.background = `url(${value}) center center / cover no-repeat`;
        }
    }
}