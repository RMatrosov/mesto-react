import PopupWithForm from "./PopupWithForm";


export default function ConfirmationPopup(props) {


  return (
      <PopupWithForm isOpen={props.isOpen}
                     params={{
                       title: 'Вы уверены ?',
                       buttonText: 'Да',
                       name: 'type_confirmation',
                       formName: "confirmation"
                     }}
                     onClose={props.onClose}
                     onSubmit={props.handleSubmit}>
      </PopupWithForm>
  )
}