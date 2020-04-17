import Init from './modules/_Init'
import Search from './modules/_Search'
import Modal from './modules/_Modal'
import ModalTabs from './modules/_ModalTabs'
import Settings from './modules/_Settings'

class App {
    constructor() {
        this.init = new Init();
        this.search = new Search();
        this.modal = new Modal();
        this.modalTabs = new ModalTabs();
        this.settings = new Settings();
    }
}

new App();