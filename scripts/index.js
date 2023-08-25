const profileForm = document.querySelector(".form_type_profile"); // Воспользуйтесь методом querySelector()
const page = document.querySelector(".page");
// Находим поля формы в DOM
const nameInput = profileForm.querySelector(".form__item_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = profileForm.querySelector(".form__item_type_job"); // Воспользуйтесь инструментом .querySelector()
//попапы
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
//форма редактирования профиля
const buttonEditProfile = document.querySelector(".profile__edit");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");
const saveButton = document.querySelector(".button_save");
//форма добавления карточки
const cardsContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector(".template").content;
const addPlace = document.querySelector(".profile__add");
const cardFormSubmitButton = document.querySelector("#submit__newCard");
const placeNameInput = document.querySelector(".form__item_type_place-name");
const placeNameLink = document.querySelector(".form__item_type_link");
//зум картинки
const photo = popupElementZoom.querySelector(".popup__photo");
const photoName = popupElementZoom.querySelector(".photo-title");
// открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function openPopupElementAdd() {
  openPopup(popupElementAdd);
}
addPlace.addEventListener("click", openPopupElementAdd);
//наполнение карточки профиля
function openPopupElementEditProfile() {
  openPopup(popupElementEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
buttonEditProfile.addEventListener("click", openPopupElementEditProfile);
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
function handleProfileFormSubmit(evt) {
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
profileForm.addEventListener("submit", handleProfileFormSubmit);
// добавление карточек из массива
function renderInitialCards() {
  initialCards.forEach(function (cardData) {
    const newCard = createCard(cardData);
    cardsContainer.append(newCard);
  });
}
function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const headerElement = card.querySelector(".element__title");
  headerElement.textContent = cardData.name;
  const imageElement = card.querySelector(".element__image");
  imageElement.src = cardData.link;
  imageElement.alt = cardData.name;
  setListenersForCard(card);
  return card;
}
renderInitialCards();
function setListenersForCard(element) {
  const deleteButton = element.querySelector(".element__remove-icon");
  deleteButton.addEventListener("click", handleDelete);
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
  currentCard.remove();
  return currentCard;
}
function handleFormSubmitNewCard(event) {
  event.preventDefault();
  const newImage = { name: placeNameInput.value, link: placeNameLink.value };
  const newCard = createCard(newImage);
  cardsContainer.prepend(newCard);
  placeNameInput.value = "";
  placeNameLink.value = "";
  closePopupAddCard();
  return newImage;
}
cardFormSubmitButton.addEventListener("click", handleFormSubmitNewCard);
// зум картинки
function photoView(photoUrl, photoCapt) {
  photo.src = photoUrl;
  photo.alt = photoCapt;
  photoName.textContent = photoCapt;
  openPopup(popupElementZoom);
}
