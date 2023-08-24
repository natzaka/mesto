let formElement = document.querySelector(".form"); // Воспользуйтесь методом querySelector()
const page = document.querySelector(".page");
// Находим поля формы в DOM
let nameInput = formElement.querySelector(".form__item_type_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector(".form__item_type_job"); // Воспользуйтесь инструментом .querySelector()
//попапы
let popup = document.querySelector(".popup");
const popupElementEdit = document.querySelector(".popup_edit");
const popupElementAdd = document.querySelector(".popup_add");
const popupElementZoom = document.querySelector(".popup_zoom");
//кнопки закрытия
const popupElementAddCloseButton = popupElementAdd.querySelector(
  ".popup__close-button"
);
const popupElementZoomCloseButton = popupElementZoom.querySelector(
  ".popup__close-button"
);
const popupElementEditCloseButton = popupElementEdit.querySelector(
  ".popup__close-button"
);
const closePopupButton = document.querySelector(".popup__close-button");
//форма редактирования профиля
const edit = document.querySelector(".profile__edit");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");
const saveButton = document.querySelector(".button_save");
//форма добавления карточки
const templateElement = document.querySelector(".elements");
const cardTemplate = document.querySelector(".template").content;
const addPlace = document.querySelector(".profile__add");
const formButton = document.querySelector("#submit__newCard");
const placeNameInput = document.querySelector(".form__item_type_place-name");
const placeNameLink = document.querySelector(".form__item_type_link");
//зум картинки
const photo = popupElementZoom.querySelector(".popup__photo");
const photoName = popupElementZoom.querySelector(".photo-title");
// открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
addPlace.addEventListener("click", function () {
  openPopup(popupElementAdd);
});
//наполнение карточки профиля
edit.addEventListener("click", function () {
  openPopup(popupElementEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  console.log(popup);
});
// закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
function closePopupAddCard() {
  closePopup(popupElementAdd);
}
popupElementAddCloseButton.addEventListener("click", closePopupAddCard);
function closePopupEditProfile() {
  closePopup(popupElementEdit);
}
popupElementEditCloseButton.addEventListener("click", closePopupEditProfile);
function closePopupElementZoom() {
  closePopup(popupElementZoom);
}
popupElementZoomCloseButton.addEventListener("click", closePopupElementZoom);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault();
  closePopupEditProfile();
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

// массив картинок
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
// добавление карточек из массива
function addNewCard(cardData) {
  const newCard = renderCard(cardData);
  templateElement.prepend(newCard);
}
function render() {
  initialCards.forEach(function (cardData) {
    const newCard = renderCard(cardData);
    templateElement.append(newCard);
  });
}
function renderCard(inintialCards) {
  const newHtmlElement = cardTemplate.cloneNode(true);
  const headerElement = newHtmlElement.querySelector(".element__title");
  headerElement.textContent = inintialCards.name;
  const imageElement = newHtmlElement.querySelector(".element__image");
  imageElement.src = inintialCards.link;
  imageElement.alt = inintialCards.name;
  setListenersForCard(newHtmlElement);
  return newHtmlElement;
}
render();
function setListenersForCard(element) {
  const deleteButton = element.querySelector(".element__remove-icon");
  deleteButton.addEventListener("click", handleDelete);
  console.log(deleteButton);
  const imageElement = element.querySelector(".element__image");
  const headerElement = element.querySelector(".element__title");
  imageElement.addEventListener("click", function () {
    photoView(imageElement.src, headerElement.textContent);
  });
  const likeButton = element.querySelector(".element__like");
  likeButton.addEventListener("click", likeCard);
}
function likeCard(event) {
  const currentCardLikeButton = event.target.closest(".element__like");
  currentCardLikeButton.classList.toggle("element__like_disabled");
  currentCardLikeButton.classList.toggle("element__like_active");
  return currentCardLikeButton;
}
function handleDelete(event) {
  const currentCard = event.target.closest(".element");
  console.log(currentCard);
  currentCard.remove();
  return currentCard;
}
function handleFormSubmitNewCard(event) {
  event.preventDefault();
  const newImage = { name: placeNameInput.value, link: placeNameLink.value };
  const newCard = renderCard(newImage);
  templateElement.prepend(newCard);
  console.log(newImage);
  closePopupAddCard();
  return newImage;
}
formButton.addEventListener("click", handleFormSubmitNewCard);
// зум картинки
function photoView(photoUrl, photoCapt) {
  photo.src = photoUrl;
  photo.alt = photoCapt;
  photoName.textContent = photoCapt;
  openPopup(popupElementZoom);
}
