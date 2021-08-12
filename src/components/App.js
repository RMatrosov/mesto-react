import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useState} from "react";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {

    const [selectedCard, setSelectedCard] = useState(null)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);


    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true)
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true)
    }

    function closeAllPopups() {
        setAddPlacePopupOpen(false)
        setEditProfilePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setSelectedCard(null)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    return (
        <div className="App">
            <div className="page">
                <div className="page__wrapper">
                    <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
                    <PopupWithForm isOpen={isEditProfilePopupOpen}
                                   props={{
                                       name: 'type_edit',
                                       title: 'Редактировать профиль',
                                       buttonText: 'Сохранить',
                                       formName: "edit-profile"
                                   }}
                                   onClose={closeAllPopups}>
                        <>
                            <input type="text" className="form__input" name="name" id="name" value="Жак-Ив Кусто"
                                   minLength="2"
                                   maxLength="40" required/>
                            <span className="form__input-error name-input-error"/>
                            <input type="text" className="form__input" name="job" id="job" value="Исследователь океана"
                                   minLength="2"
                                   maxLength="200" required/>
                            <span className="form__input-error job-input-error"/>
                        </>

                    </PopupWithForm>
                    <PopupWithForm isOpen={isAddPlacePopupOpen}
                                   props={{
                                       name: 'new-card',
                                       title: 'Новое место',
                                       buttonText: 'Создать',
                                       formName: "new-card"
                                   }}
                                   onClose={closeAllPopups}>

                        <>
                            <input type="text" className="form__input" name="name" id="title" placeholder="Название"
                                   minLength="2"
                                   maxLength="200" required/>
                            <span className="form__input-error title-input-error"/>
                            <input type="url" className="form__input" name="link" id="link"
                                   placeholder="Ссылка на картинку" required/>
                            <span className="form__input-error link-input-error"/>
                        </>

                    </PopupWithForm>
                    <PopupWithForm isOpen={isEditAvatarPopupOpen}
                                   onClose={closeAllPopups}
                                   props={{
                                       name: 'type_avatar',
                                       title: 'Обновить аватар',
                                       buttonText: 'Сохранить',
                                       formName: "change-avatar"
                                   }}>
                        <>
                            <input type="url" className="form__input" name="link" id="avatar"
                                   placeholder="Ссылка на картинку" required/>
                            <span className="form__input-error avatar-input-error"/>
                        </>
                    </PopupWithForm>
                    <Header/>
                    <Main onEditProfile={handleEditProfileClick}
                          onAddPlace={handleAddPlaceClick}
                          onEditAvatar={handleEditAvatarClick}
                          onCardClick={handleCardClick}/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default App;