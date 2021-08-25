import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Spinner} from "./Spinner";


function App() {

  const [selectedCard, setSelectedCard] = useState(null)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true)
    api.getInitialCards().then(data => {
      setCards(data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    api.getUserInfoFromServer().then(data => {
      setCurrentUser(data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.log(err);
    })
  }

  function handleCardDelete(card) {
    api.deleteCardFromServer(card._id).then((data) => {
      if (data.message === "Пост удалён") {
        setCards((state) => state.filter(item => item !== card));
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser({name, about}) {
    api.setUserInfoFromServer({name, about}).then(data => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    })
  }

  function handleUpdateAvatar(link) {
    api.changeAvatar(link).then(data => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    })
  }

  function handleAddPlaceSubmit(title, link) {
    api.addCardToServer(title, link).then(data => {
      setCards([data, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="App">
          <div className="page">
            <div className="page__wrapper">
              <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
              <EditProfilePopup isOpen={isEditProfilePopupOpen}
                                onUpdateUser={handleUpdateUser}
                                onClose={closeAllPopups}/>
              <EditAvatarPopup isOpen={isEditAvatarPopupOpen}
                               onUpdateAvatar={handleUpdateAvatar}
                               onClose={closeAllPopups}/>

              <AddPlacePopup onClose={closeAllPopups}
                             isOpen={isAddPlacePopupOpen}
                             onAddPlace={handleAddPlaceSubmit}/>/>

              <Header/>
              {isLoading ? <Spinner/> : <Main onEditProfile={handleEditProfileClick}
                                              onAddPlace={handleAddPlaceClick}
                                              onEditAvatar={handleEditAvatarClick}
                                              onCardClick={handleCardClick}
                                              cards={cards}
                                              onCardLike={handleCardLike}
                                              onCardDelete={handleCardDelete}/>}
              <Footer/>
            </div>
          </div>
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
