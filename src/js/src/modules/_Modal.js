// Модальное окошко

export default class Modal {
    constructor() {
        this.settingsModal = document.querySelector('.settings-modal');
        this.showSettingsBtn = document.querySelector('.show-settings-btn');
        this.iconClose = document.querySelector('.icon-close');

        this.event();
    }

    // Отслеживаем ивенты нажатия на кнопки открытия и закрытия
    event() {
        this.showSettingsBtn.addEventListener('click', () => {
            this.showSettingsModal()
        });
        this.iconClose.addEventListener('click', () => {
            this.closeSettingsModal()
        })
    }

    // Показываем окон
    showSettingsModal() {
        this.settingsModal.classList.add('show');
    }

    // Убираем окно
    closeSettingsModal() {
        this.settingsModal.classList.remove('show');
    }
}