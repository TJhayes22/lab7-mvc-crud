import { getBotResponse } from './eliza.js';

/**
	 * ChatController - Mediates between model and view
	 * Responsibilities: Handle user actions, update model, refresh view
	 */
export class ChatController {
    constructor(model, listView) {
        this.model = model;
        this.listView = listView;

        this._setupEventListeners();
        this._initialRender();
    }

    _setupEventListeners() {
        // Listen for messageSend event from form
        this.listView.addEventListener('message-send', (e) => {
            this.sendMessage(e.detail);
        });
    }

    _initialRender() {
        const messages = this.model.getAll();
        this.listView.renderMessages(messages);
    }

    sendMessage(text) {
        try {
            // Add user message
            const newMessage = this.model.add(text, 'user');
            this.listView.renderMessage(newMessage);

            // Generate bot response
            const botText = getBotResponse(text);

            // Add the bot message
            const botMessage = this.model.add(botText, 'bot');
            this.listView.renderMessage(botMessage);

            console.log('Messages added: ', text, botText);
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
    /* Add more functions for edit and delete */
}