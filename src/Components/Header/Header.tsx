import React, { useState } from "react";
import './header.css';
import logo from './images/logo.png';
import userIcon from './images/user.png';
import chatIcon from './images/messenger.png';
import bellIcon from './images/bell.png';

export const Header = () => {

    /**Функционал выпадающего меню пользователя: */
    const [isOpen, setOpen] = useState(false);
    const handleOpen = () => setOpen(!isOpen);

    /**Массив пунктов выпадающего меню пользователя: */
    const items = ['Администратор']

    return (
        <header className="user-header">
            <a className="user-header__link" href="#">
                <img className="user-header__logo" src={logo} alt="user-header-logo" />
            </a>

            <nav className='user-header__icons'>
                <a className="user-header__link" href="#">
                    <img className="user-header__user-icon" src={chatIcon} alt="user-icon" />
                </a>
                <a className="user-header__link" href="#">
                    <img className="user-header__user-icon" src={bellIcon} alt="user-icon" />
                </a>
                <a className="user-header__link" href="#">
                    <img onClick={handleOpen} className="user-header__user-icon" src={userIcon} alt="user-icon" />
                    {
                        isOpen && (<ul className="user-menu">
                            {items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>)
                    }
                </a>
            </nav>
        </header>
    )
}