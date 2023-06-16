// Находим форму в DOM
let formElement = document.querySelector(".form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".form__item_type_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".form__item_type_job"); // Воспользуйтесь инструментом .querySelector()
let popup = document.querySelector(".popup");
const edit = document.querySelector(".profile__edit");
const closePopupButton = document.querySelector(".popup__close-button");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
const saveButton = document.querySelector(".button_save");
const page = document.querySelector(".page");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
edit.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}
closePopupButton.addEventListener("click", closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  closePopup(closePopupButton);
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
