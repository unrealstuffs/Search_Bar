export default class Init {
    constructor() {
        this.body = document.querySelector('body');
        this.appBackground = document.querySelector('#app');
        
        this.render();
        this.getBackground();
    }

    render() {
        this.body.classList.add('load');
    }

    getBackground() {
        let background;

        if(localStorage.getItem('background-image')) {
            background = JSON.parse(localStorage.getItem('background-image'));
            this.setBackground(background)
        }
    }

    setBackground(value) {
        if(value[0] === 'r') {
            this.appBackground.style.background = value;
        } else {
            this.appBackground.style.background = `url(${value}) center center / cover no-repeat`;
        }
    }
}