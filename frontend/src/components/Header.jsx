import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="container header-inner">
                <div className="logo">
                    <Link to="/"><img src="/img/logo.png" alt="Логотип музея" /></Link>
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/museum">О музее</Link></li>
                        <li><a href="/#collections">Коллекции</a></li>
                        <li><Link to="/interactive">Интерактивный музей</Link></li>
                        <li><a href="#contacts">Контакты</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;