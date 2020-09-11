/**
 * Выдает ошибку при неверной регистрации/входе
 * @param {HTMLFormElement} authForm Форма регистрации/входа
 */
function failSignup(authForm) {
  authForm.username.setCustomValidity(authForm.dataset.failMessage);
  authForm.username.reportValidity();
}

const authForm = document.forms['signup-form'] || document.forms['signin-form'];

authForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const { method, action } = event.target;
  let response;
  try {
    response = await fetch(action, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: event.target.username.value,
        password: event.target.password.value,
      }),
    });
  } catch (err) {
    return failSignup(event.target);
  }
  if (response.status !== 200) {
    return failSignup(event.target);
  }
  return window.location.assign('/chat');
});

if (document.forms.authForm) {
  [
    document.forms.authForm.username,
    document.forms.authForm.password,
  ].forEach((input) => input.addEventListener('input', (event) => {
    event.target.setCustomValidity('');
    event.target.checkValidity();
  }));
}
