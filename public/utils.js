/**
 * Создает числовой хэш для строки
 * @param {string} str Строка
 * @param {number} max Максимальное значение хэша
 */
export function hashStringToInteger(str, max) {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    const chr = str.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = ((hash << 5) - hash) + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0;
  }
  return Math.abs(hash % max);
}

/**
 * Возвращает аватар для пользователя
 * @param {string} username Имя пользователя
 */
export async function getAvatar(username) {
  if (!getAvatar.cached) {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=50&size=thumb');
    const data = await response.json();
    getAvatar.cached = data.map((x) => x.url);
  }
  const index = hashStringToInteger(username, getAvatar.cached.length);
  return getAvatar.cached[index];
}
