import React, {useEffect, useState} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
      <PopupWithForm isOpen={props.isOpen}
                     params={{
                       name: 'type_edit',
                       title: 'Редактировать профиль',
                       buttonText: 'Сохранить',
                       formName: "edit-profile"
                     }}
                     onClose={props.onClose}
                     onSubmit={handleSubmit}>

        <input type="text" className="form__input"
               onChange={(e)=>setName(e.target.value)}
               name={name} id={name} placeholder={name}
               minLength="2"
               maxLength="40" required/>
        <span className="form__input-error name-input-error"/>
        <input type="text" className="form__input"
               onChange={(e)=>setDescription(e.target.value)}
               name={description} id={description} placeholder={description}
               minLength="2"
               maxLength="200" required/>
        <span className="form__input-error job-input-error"/>
      </PopupWithForm>
  )
}