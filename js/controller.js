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

        this.listView.addEventListener('chat-clear', () => this.clearChat());

        this.listView.addEventListener('chat-import', () => this.importChat());

        this.listView.addEventListener('chat-export', () => this.exportChat());
    }

    _initialRender() {
        const messages = this.model.getAll();
        this.listView.renderMessages(messages);
        this.updateMessageCount();
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
        this.updateMessageCount();
    }
    
    editMessage(id) {
        /*
        const messages = this.model.getAll();
        const message = messages.find(msg => msg.id === id);
        if (!message) return;

        const newText = prompt('Edit your message: ', message.text);
        if (newText && newText.trim() !== message.text) {
            const updatedMessages = this.model.edit(id, newText);
            this.listView.renderMessages(updatedMessages);
        }
        this.updateMessageCount();
        */
        const messages = this.model.getAll();
        const message = messages.find(msg => msg.id === id);
        if (!message) return;

        // Ask the user for a new version of their message
        const newText = prompt('Edit your message:', message.text);

        // Stop if text is unchanged or empty
        if (!newText || newText.trim() === message.text) return;

        // --- Update the user's message ---
        this.model.edit(id, newText);

        // --- Find the bot message that follows ---
        const userIndex = messages.findIndex(msg => msg.id === id);
        const nextMessage = messages[userIndex + 1];

        // --- If there’s a bot reply, update it too ---
        if (nextMessage && nextMessage.sender === 'bot') {
            const newBotText = getBotResponse(newText);
            this.model.edit(nextMessage.id, newBotText);
        }

        // --- Refresh the view ---
        const updatedMessages = this.model.getAll();
        this.listView.renderMessages(updatedMessages);

        // --- Update the counter ---
        this.updateMessageCount();
        }

        deleteMessage(id) {
            const confirmed = confirm("Are you sure you want to delete this message?");
            if (!confirmed) return; // If user says no, don't go through with deletion

            // Remove message from the model messages array
            const updatedMessages = this.model.delete(id);

            // Re-renders that chat view (deleted message is gone)
            this.listView.renderMessages(updatedMessages);
            this.updateMessageCount();
    }

    clearChat() {
        const confirmed = confirm("Are you sure you want to clear the chat?");
        if (!confirmed) return;

        const updatedMessages = this.model.clear();

        this.listView.renderMessages(updatedMessages);
        this.updateMessageCount();
    }

    importChat() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';

        input.addEventListener('change', async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const text = await file.text();
            try {
                const messages = JSON.parse(text);
                if (Array.isArray(messages)) {
                    this.model._save(messages);
                    this.listView.renderMessages(messages);
                    this.updateMessageCount();
                    alert('Chat history imported successfully!');
                } else {
                    throw new Error('Invalid JSON format');
                }
            } catch (error) {
                alert('Error importing chat: ' + error.message);
            }
        });

        input.click();
    }

    exportChat() {
        const messages = this.model.getAll();
        const blob = new Blob([JSON.stringify(messages, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'chat-history.json';
        a.click();

        URL.revokeObjectURL(url);
        this.updateMessageCount();
    }

    updateMessageCount() {
        const messages = this.model.getAll();
        const countElement = this.listView.shadowRoot.getElementById('message-count');
        if (countElement) {
            countElement.textContent = `Messages: ${messages.length}`;
        }
    }
}