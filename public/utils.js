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
 * Аватар выбирается из списка и фиксируется для конкретного пользователя
 * за счёт хеширования имени пользователя в индекс картинки
 * @param {string} username Имя пользователя
 */
export async function getAvatar(username) {
  if (!getAvatar.cached) {
    const query = new URLSearchParams({
      page: 1,
      limit: 50,
      order: 'ASC',
      size: 'thumb',
      api_key: 'c3db4697-3686-45c6-9e4e-c352eb861089',
    });
    const response = await fetch(`https://api.thecatapi.com/v1/images/search?${query}`);
    const data = await response.json();
    getAvatar.cached = data.map((x) => x.url);
  }
  const index = hashStringToInteger(username, getAvatar.cached.length);
  return getAvatar.cached[index];
}
