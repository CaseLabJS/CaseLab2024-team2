import './header.css';
import logo from './images/logo.png';
import userIcon from './images/user.png';
import chatIcon from './images/messenger.png';
import bellIcon from './images/bell.png';

export const Header = () => {


    return (
        <header className="user-header">
            <a className="user-header__link" href="#">
                <img className="user-header__logo" src={logo} alt="user-header-logo" />
            </a>
            <div>
                <nav></nav>
            </div>
            <div className='user-header__icons'>
                <a className="user-header__link" href="#">
                    <img className="user-header__user-icon" src={chatIcon} alt="user-icon" />
                </a>
                <a className="user-header__link" href="#">
                    <img className="user-header__user-icon" src={bellIcon} alt="user-icon" />
                </a>
                <a className="user-header__link" href="#">
                    <img className="user-header__user-icon" src={userIcon} alt="user-icon" />
                </a>
            </div>
        </header>
    )
}