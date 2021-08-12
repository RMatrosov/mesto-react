import Card from "./Card";
import {useEffect, useState} from "react";
import {api} from "../utils/Api";


function Main({ onCardClick, onAddPlace, onEditProfile, onEditAvatar}) {
    const [userName, setUserName] = useState('Жак-Ив Кусто')
    const [userDescription, setUserDescription] = useState('Исследователь океана')
    const [userAvatar, setUserAvatar] = useState('')

    const [cards, setCards] = useState([])

    useEffect(() => {
        api.getUserInfoFromServer().then(data => {
            setUserName(data.name)
            setUserDescription(data.about)
            setUserAvatar(data.avatar)
        })
    })

    useEffect(() => {
        api.getInitialCards().then(data => {
            setCards(data)
        })
    }, [])


    return (
        <main className="main">
            <section className="profile">
                <div className="profile__wrapper">
                    <div className="profile__image-wrapper">
                        <img src={userAvatar} alt="фото профиля"
                             className="profile__image"/>
                        <button onClick={onEditAvatar} className="profile__image-btn"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button onClick={onEditProfile} type="button" className="profile__button"/>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__button-add"/>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card, i)=> <Card key={i} card={card} onCardClick={onCardClick}/>)}
                </ul>
            </section>

        </main>
    )
}

export default Main