import type { ReactElement } from "react";

import { useState } from "react";

import './header.css';
import bellIcon from './images/bell.png';
import logo from './images/logo.png';
import chatIcon from './images/messenger.png';
import userIcon from './images/user.png';

export const Header = (): ReactElement => {

    /**Функционал выпадающего меню пользователя: */
    const [isOpen, setOpen] = useState(false);
    const handleOpen = (): void => setOpen(!isOpen);

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
