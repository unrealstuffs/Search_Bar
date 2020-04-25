// Связующее звено всех модулей, ничего интересного

import Init from './modules/_Init'
import Search from './modules/_Search'
import Modal from './modules/_Modal'
import ModalTabs from './modules/_ModalTabs'
import ModalWP from './modules/_ModalWP'
import Settings from './modules/_Settings'
import Photos from './modules/_Photos'
import Colors from './modules/_Colors'
import Upload from './modules/_Upload'

class App {
    constructor() {
        this.init = new Init();
        this.search = new Search();
        this.modal = new Modal();
        this.modalTabs = new ModalTabs();
        this.modalWP = new ModalWP();
        this.settings = new Settings();
        this.photos = new Photos();
        this.colors = new Colors();
        this.upload = new Upload();
    }
}

new App();