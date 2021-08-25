import PopupWithForm from "./PopupWithForm";
import React from "react";

export default function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    form.reset()
  }

  return (
      <PopupWithForm isOpen={props.isOpen}
                     onClose={props.onClose}
                     onSubmit={handleSubmit}
                     params={{
                       name: 'type_avatar',
                       title: 'Обновить аватар',
                       buttonText: 'Сохранить',
                       formName: "change-avatar"
                     }}>

        <input ref={avatarRef} type="url" className="form__input" name="link" id="avatar"
               placeholder="Ссылка на картинку" required/>
        <span className="form__input-error avatar-input-error"/>

      </PopupWithForm>
  )
}