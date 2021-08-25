import PopupWithForm from "./PopupWithForm";
import React, {useState} from "react";

export default function AddPlacePopup(props) {

  const [cardTitle, setCardTitle] = useState('');
  const [cardLink, setCardLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    props.onAddPlace({
      title: cardTitle,
      link: cardLink,
    });
    form.reset()
  }

  return (
      <PopupWithForm isOpen={props.isOpen}
                     params={{
                       name: 'new-card',
                       title: 'Новое место',
                       buttonText: 'Создать',
                       formName: "new-card"
                     }}
                     onClose={props.onClose}
                     onSubmit={handleSubmit}>


        <input type="text"
               onChange={(e)=>setCardTitle(e.target.value)}
               className="form__input" name="name" id="title" placeholder="Название"
               minLength="2"
               maxLength="200" required/>
        <span className="form__input-error title-input-error"/>
        <input type="url" className="form__input"
               onChange={(e)=>setCardLink(e.target.value)}
               name="link" id="link"
               placeholder="Ссылка на картинку" required/>
        <span className="form__input-error link-input-error"/>


      </PopupWithForm>
  )
}