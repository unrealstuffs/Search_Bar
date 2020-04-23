export default class Colors {
    constructor() {
        this.inputColor = document.querySelector('.colors-view .input-box input[type=color]');
        this.inputText = document.querySelector('.colors-view .input-box input[type=text]');
        this.addColorBtn = document.querySelector('.add-color-btn');
        this.previewsColors = document.querySelector('.previews.colors');
        this.appBackground = document.querySelector('#app');

        this.getFromLocalStorage()
        this.renderColors();
        this.setColorHandler();
        this.event();
    }

    event() {
        this.inputColor.addEventListener('change', () => {
            this.inputText.value = this.inputColor.value
        })
        this.inputText.addEventListener('change', () => {
            this.addColor(this.inputText.value);
        })
        this.inputText.addEventListener('focus', () => {
            this.inputText.value = '#'
        })
        this.addColorBtn.addEventListener('click', () => {
            this.addColor(this.inputText.value);
        })
    }

    setColorHandler() {
        document.querySelectorAll('.preview-box').forEach(elem => {
            elem.addEventListener('click', () => {
                this.setColor(elem.childNodes[1].style.backgroundColor);
            })
        })
    }

    renderColors() {
        let colors = this.getFromLocalStorage()
        colors.forEach(color => {
            this.previewsColors.innerHTML += `
                <div class="preview-box">
                    <div class="preview color" style="background: ${color};"></div>
                </div>
            `
        })
    }

    addColor(color) {
        this.previewsColors.innerHTML += `
            <div class="preview-box">
                <div class="preview color" style="background: ${color};"></div>
            </div>
        `
        this.saveToLocalStorage(color)
        this.setColorHandler()
    }

    setColor(color) {
        this.appBackground.style.background = color;
        localStorage.setItem('background-image', JSON.stringify(color));
    }

    saveToLocalStorage(data) {
        let colors = this.getFromLocalStorage();
        colors.push(data);
        localStorage.setItem('colors', JSON.stringify(colors));
    }

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