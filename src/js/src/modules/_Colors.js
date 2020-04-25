// Модуль для работы с цветами

export default class Colors {
    constructor() {
        this.inputColor = document.querySelector('.colors-view .input-box input[type=color]');
        this.inputText = document.querySelector('.colors-view .input-box input[type=text]');
        this.addColorBtn = document.querySelector('.add-color-btn');
        this.previewsColors = document.querySelector('.previews.colors');
        this.appBackground = document.querySelector('#app');

        this.getFromLocalStorage(); // Получаем цвета из хранилища
        this.renderColors(); // Отрисовываем цвета
        this.setColorHandler(); // Отслеживаем нажатия на них
        this.event();
    }

    event() {
        this.inputColor.addEventListener('change', () => {
            this.inputText.value = this.inputColor.value
        })
        this.inputText.addEventListener('change', () => {
            if(this.isValidForm(this.inputText.value)) { // Проверяем валидность инпута
                this.inputText.parentElement.classList.remove('error');
                this.addColor(this.inputText.value);
            } else {
                this.inputText.parentElement.classList.add('error');
            }
        })
        this.inputText.addEventListener('focus', () => {
            this.inputText.value = '#' // Ставим знак решетки при клике на инпут
        })
    }

    // Проверка вылидности инпута
    isValidForm(data) {
        if(data.match(/^#[0-9A-Fa-f]{6}/)) {
            return true;
        } else {
            return false;
        }
    }

    // Вынес этот хендлер в отдельный модуль потому что могу
    setColorHandler() {
        document.querySelectorAll('.preview-box').forEach(elem => {
            elem.addEventListener('click', () => {
                this.setColor(elem.childNodes[1].style.backgroundColor); // При клике вызываем метод применения цвета
            })
        })
    }

    // Отрисовка цветов
    renderColors() {
        let colors = this.getFromLocalStorage() // Получаем цвета из хранилища
        colors.forEach(color => { // Выводим цвета
            this.previewsColors.innerHTML += `
                <div class="preview-box">
                    <div class="preview color" style="background: ${color};"></div>
                </div>
            `
        })
    }

    // Добавление цвета
    addColor(color) {
        this.previewsColors.innerHTML += `
            <div class="preview-box">
                <div class="preview color" style="background: ${color};"></div>
            </div>
        `
        this.saveToLocalStorage(color) // Добавляем в хранилище
        this.setColorHandler() // Снова вызываем метод отслеживания нажатий, потому что без этого ничо не работает
    }

    // Устанавливаем цвет и помещаем в хранилище
    setColor(color) {
        this.appBackground.style.background = color;
        localStorage.setItem('background-image', JSON.stringify(color));
    }

    // Сохранение в local storage
    saveToLocalStorage(data) {
        let colors = this.getFromLocalStorage();
        colors.push(data);
        localStorage.setItem('colors', JSON.stringify(colors));
    }

    // Получение массива цветов из хранилища
    getFromLocalStorage() {
        let colors;

        if(localStorage.getItem('colors')) {
            colors = JSON.parse(localStorage.getItem('colors'));
        } else {
            colors = []
        }
        return colors
    }
}