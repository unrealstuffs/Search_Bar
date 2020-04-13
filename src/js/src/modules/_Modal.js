export default class Modal {
    constructor() {
        this.settingsModal = document.querySelector('.settings-modal');
        this.showSettingsBtn = document.querySelector('.show-settings-btn');
        this.iconClose = document.querySelector('.icon-close');

        this.event();
    }

    event() {
        this.showSettingsBtn.addEventListener('click', () => {
            this.showSettingsModal()
        });
        this.iconClose.addEventListener('click', () => {
            this.closeSettingsModal()
        })
    }

    showSettingsModal() {
        this.settingsModal.classList.add('show');
    }

    closeSettingsModal() {
        this.settingsModal.classList.remove('show');
    }
}