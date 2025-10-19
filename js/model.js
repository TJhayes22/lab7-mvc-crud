/**
	 * ChatModel - Handles data persistence using localStorage
	 * Responsibilities: CRUD operations, data validation, storage
	 */
class ChatModel {
    constructor(storageKey = 'messages') {
        this.storageKey = storageKey;
    }

    /**
     * Get all messages from storage
     * @returns {Array<{id: string, text: string, sender: string, timestamp: number, edited: boolean}>}
     */
    getAll() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    /**
     * Add a new message
     * @param {string} text - Message text
     * @returns {Array} Updated messages array
     */
    add(text) {
        if (!text || text.trim().length === 0) {
            throw new Error('Note text cannot be empty');
        }
        const messages = this.getAll();
        // Update later
        const newMessage = {
            id: crypto.randomUUID,
            text: text.trim(),
            sender: null,
            timestamp: Date.now()
        }

        messages.push(newMessage);
        this._save(messages);
        return messages;
    }
    /**
     * Delete a message by ID
	 * @param {string} id - Message ID
	 * @returns {Array} Updated notes array
	 */
    delete(id) {
        const messages = this.getAll();
        // Filters messages to not include the deleted message, updates and saves messages array
        const filtered = messages.filter(message => message.id !== id);
        this._save(filtered);
        return filtered;
    }

    /**
	 * Clear all messages
	 * @returns {Array} Empty array
	 */
    clear() {
        this._save([]);
        return [];
    }

    /**
     * Private method to save data to localStorage
	 * @private
	 */
    _save(messages) {
        localStorage.setItem(this.storageKey, JSON.stringify(messages));
    }
}

// Export for controller to use
window.ChatModel = ChatModel;