/**
	 * ChatController - Mediates between model and view
	 * Responsibilities: Handle user actions, update model, refresh view
	 */
class ChatController {
    constructor(model, listView) {
        this.model = model;
        this.listView = listView;

        this._setupEventListeners();
        this._initialRender();
    }

    _setupEventListeners() {
        // Listen for messageSend event from form
        document.addEventListener('message-send', (e) => {
            this.sendMessage(e.detail.text);
        });
    }

    _initialRender() {
        const messages = this.model.getAll();
        this.listView.render(messages)
    }

    sendMessage(text) {
        try {
            const messages = this.model.add(text);
            this.listView.renderMessage(messages); // Update later
            console.log('Message added: ', text)
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
    /* Add more functions for edit and delete */
}