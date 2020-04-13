import Init from './modules/_Init'
import Search from './modules/_Search'
import Modal from './modules/_Modal'
import ModalTabs from './modules/_ModalTabs'

class App {
    constructor() {
        this.init = new Init();
        this.search = new Search();
        this.modal = new Modal();
        this.modalTabs = new ModalTabs();
    }
}

new App();