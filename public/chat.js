import { getAvatar } from './utils.js';

/**
 * Веб-компонент сообщения чата
 */
class ChatMessageElement extends HTMLElement {
  constructor() {
    super();
    const template = document.getElementById('chat-message-template');
    const templateContent = template.content;
    this.attachShadow({ mode: 'open' })
      .appendChild(templateContent.cloneNode(true));
  }

  /**
   * Создаёт элемент сообщения в чате
   * @param {string} username Имя пользователя
   * @param {string} message Сообщение
   */
  static async createElement(username, message) {
    const chatMessage = document.createElement('chat-message');
    const avatarImage = await getAvatar(username);
    chatMessage.innerHTML = `
      <img slot="avatar" class="avatar" src="${avatarImage}" alt="Аватар" />
      <span slot="username">${username}</span>
      <span slot="message">${message}</span>
    `;
    return chatMessage;
  }
}
// Регистрируем веб-компонент чата
customElements.define('chat-message', ChatMessageElement);

const chat = document.getElementById('chat');

// Навешиваем обработчик отправки формы с сообщением
document.forms['send-form'].addEventListener('submit', async (event) => {
  event.preventDefault();
  chat.appendChild(await ChatMessageElement.createElement());
});

(async () => {
  chat.appendChild(await ChatMessageElement.createElement('Кошкин кот', 'Мяу мяу мяу!'));
  chat.appendChild(await ChatMessageElement.createElement('Тушканчик', 'Ок, понял тебя'));
})();
