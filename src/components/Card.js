function Card({card, onCardClick}) {
    return (
        <li className="element" onClick={() => onCardClick(card)}>
            <button type="button" className="element__button-delete"/>
            <img src={card.link} alt={card.name}
                 className="element__image"/>
            <div className="element__group">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-group">
                    <button type="button" className="element__like"/>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card