function Footer() {
    return (
        <footer id="contacts">
            <div className="container footer-inner">
                <div className="footer-info">
                    <h3>Контакты</h3>
                    <p>АДРЕС МУЗЕЯ: 641876, г. Шадринск, Курганская область, ул. Свердлова, 41.</p>
                    <br />
                    <p>Режим работы музея: 10:00—18:00<br />
                    Режим работы кассы: 10:00—17:30<br />
                    Выходные дни: понедельник и воскресенье<br />
                    Последняя пятница месяца — санитарный день</p>
                    <br />
                    <p>Заявки на экскурсии и лекции принимаются по телефону: +7 (35253) 9-01-47<br />
                    Администрация музея: +7 (35253) 9-01-37<br />
                    E-mail: museum@shadrinsk.net</p>
                </div>
                <div className="social-icons">
                    <a href="https://vk.com/museumshadrinsk"><img src="/img/svg/vk.svg" alt="VK" /></a>
                    <a href="https://ok.ru/museumshadrinsk"><img src="/img/svg/odnoklassniki.svg" alt="OK" /></a>
                    <a href="https://www.youtube.com/channel/UCk6mPrY251O4B2zpjRccc4A"><img src="/img/svg/youtube.svg" alt="YouTube" /></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;