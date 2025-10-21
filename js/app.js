// app.js
import { ChatModel } from './model.js';
import { ChatController } from './controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const view = document.querySelector('chat-view');
    const model = new ChatModel();
    const controller = new ChatController(model, view);

    window.chatApp = { model, view, controller };
});
