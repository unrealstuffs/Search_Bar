export default class Init {
    constructor() {
        this.body = document.querySelector('body');
        
        this.render();
    }

    render() {
        this.body.classList.add('load');
    }
}