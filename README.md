# 🗨️ Chat App (MVC Architecture)

A simple, interactive chat application built using the **Model-View-Controller (MVC)** pattern.  
This app allows users to send, edit, and delete messages, clear the chat, and import/export chat history as a JSON file.  
All messages are saved in **localStorage** for persistence between sessions.

---

## 🌐 Live Demo
[**View the published web app on Netlify**](https://chatapplicationmvc.netlify.app/)  

---

## 💬 How to Use the App

1. **Type a message** in the input box and press Enter or click Send.
2. The **bot** automatically replies to your message.
3. **Hover over your messages** to reveal Edit and Delete buttons:
   - Edit lets you update your text (bot reply updates too)
   - Delete removes your message (and optionally its bot reply)
4. Use the **footer controls**:
   - 🗑️ **Clear All** – Deletes all messages from chat and memory.
   - 📤 **Export** – Saves your chat as a downloadable JSON file.
   - 📥 **Import** – Loads a previously exported chat file.

Your messages persist even if you reload the page, thanks to localStorage.

---

## 🧩 MVC Architecture Explained

### **Model (`model.js`)**
Handles data logic:
- Stores messages in memory and `localStorage`
- Supports adding, editing, deleting, clearing, importing, and exporting messages

### **View (`view.js`)**
Manages the interface:
- Displays messages and timestamps
- Handles hover actions (edit/delete)
- Dispatches custom events like `message-send`, `message-edit`, `chat-clear`

### **Controller (`controller.js`)**
Connects model and view:
- Responds to user interactions
- Updates both the data (model) and UI (view)
- Handles message count updates, file imports/exports, and bot responses

### **App Entry (`app.js`)**
- Initializes the MVC components
- Boots up the chat app once the DOM loads

---

## ⚙️ Technical Details & Trade-offs

- **Persistence:** Uses `localStorage` instead of a backend — simple but not multi-user.
- **UI:** Built using **Web Components** for encapsulation (Shadow DOM).
- **Bot:** Uses a mock `getBotResponse()` function for deterministic responses thanks to `eliza.js`.
- **Responsiveness:** Designed for desktop and mobile layouts with adaptive CSS.
- **Limitations:**
  - No real server communication or API requests
  - Chat state tied to the browser — clearing cache removes messages

---

## 🧠 Future Improvements
- Add support for real-time chat with a backend (e.g., WebSocket API)
- Enhance mobile UX with adaptive resizing and animations
- Allow multiple chat sessions or named threads
- Message search feature
- Voice interface

---

## License
This project is licensed under the MIT License - see [LICENSE.md](LICENSE.md) for
details.

---

## 👨‍💻 Author
**Tyler Hayes**  

Note: Built for a web development project focused on mastering **MVC**, **Web Components**, and **client-side persistence**.
