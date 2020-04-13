export default class ModalTabs {
    constructor() {
        this.tabList = document.querySelectorAll('.settings-modal-menu-item');
        this.contentList = document.querySelectorAll('.settings-modal-view > div');
        this.menu = document.querySelector('.settings-modal-menu');

        this.event();
        this.setIndex();
    }

    event() {
        this.tabList.forEach(item => {
            item.addEventListener('click', e => this.show(item))
        })
    }

    show(item) {
        this.removePrev();

        const index = item.getAttribute('data-index');
        const content = document.querySelector('.settings-modal-view > div[data-index="'+index+'"]');

        item.classList.add('a');
        content.classList.add('a');
    }

    setIndex() {
        for (let i = 0; i < this.tabList.length; i++) {
            this.tabList[i].setAttribute('data-index', i);
            this.contentList[i].setAttribute('data-index', i);
        }
    }

    removePrev() {
        for (let i = 0; i < this.tabList.length; i++){
            this.tabList[i].classList.remove('a');
            this.contentList[i].classList.remove('a');
        }
    }
}