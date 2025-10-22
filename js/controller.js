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

        // Listen for edit button clicked, then call editMessage()
        this.listView.addEventListener('message-edit', (e) => this.editMessage(e.detail.id));

        // Listen for delete button clicked, then call deleteMessage()
        this.listView.addEventListener('message-delete', (e) => this.deleteMessage(e.detail.id));
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
    
    editMessage(id) {
        const messages = this.model.getAll();
        const message = messages.find(msg => msg.id === id);
        if (!message) return;

        const newText = prompt('Edit your message: ', message.text);
        if (newText && newText.trim() !== message.text) {
            const updatedMessages = this.model.edit(id, newText);
            this.listView.renderMessages(updatedMessages);
        }
    }

    deleteMessage(id) {
        const confirmed = confirm("Are you sure you want to delete this message?");
        if (!confirmed) return; // If user says no, don't go through with deletion
        
        // Remove message from the model messages array
        const updatedMessages = this.model.delete(id);

        // Re-renders that chat view (deleted message is gone)
        this.listView.renderMessages(updatedMessages);
    }
}