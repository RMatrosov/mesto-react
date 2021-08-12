export default function PopupWithForm(props) {
    return (
        <>
            <div className={`popup popup_${props.props.name} ${props.isOpen && 'popup_opened'}`}>
                <div className="popup__container">
                    <button onClick={props.onClose} type="button" className="popup__button-close"/>
                    <form action="#" className="form" name={props.props.formName} noValidate>
                        <h2 className="form__heading">{props.props.title}</h2>
                        {props.children}
                        <button type="submit" className="form__button">{props.props.buttonText}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
