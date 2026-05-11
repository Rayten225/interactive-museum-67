import { Link } from 'react-router-dom';

function Home() {
    return (
        <main className="container">
            <section className="block-split">
                <div>
                    <img src="/img/gus.png" alt="Фото гуся" className="img-fluid" />
                </div>
                <div>
                    <h2>О музее</h2>
                    <p>Шадринский краеведческий музей - один из старейших музеев Урала, открытие которого состоялось 9 января 1918 года.</p>
                    <br />
                    <Link to="/museum" className="btn">подробнее</Link>
                </div>
                <div>
                    <img src="/img/muzei.png" alt="Фото музея" className="img-fluid" />
                </div>
            </section>

            <section className="collections-wrapper">
                <div className="collections-box">
                    <h2>Коллекции</h2>
                    <ul>
                        <li>- Естественнонаучная коллекция</li>
                        <li>- Коллекция фалеристики</li>
                        <li>- Коллекция утюгов</li>
                        <li>- Коллекция редких книг</li>
                        <li>- Коллекция листовок 1917-1920 гг.</li>
                        <li>- Коллекция конфетных оберток</li>
                        <li>- Коллекция художественных работ Ф.А. Бронникова</li>
                        <li>- Советская фалеристика</li>
                    </ul>
                </div>
            </section>
            
            <img src="/img/nabor.png" alt="Коллаж коллекций" className="img-fluid" style={{ margin: '60px 0' }} />
        
            <section className="block-split">
                <div>
                    <img src="/img/statue.png" alt="Декор" className="img-fluid" />
                </div>
                <div>
                    <h2>Интерактивный музей</h2>
                    <br />
                    <Link to="/interactive" className="btn">перейти</Link>
                </div>
            </section>

            <section className="team-section">
                <h2>Команда разработчиков</h2>
                <div className="team-grid">
                    <div className="team-member team-item">
                        <img src="/img/vlad.png" alt="Владислав Сошников" />
                        <strong>Владислав Сошников</strong>
                        <p>Backend разработчик</p>
                    </div>
                    <div className="team-member team-item">
                        <img src="/img/lera.png" alt="Валерия Петрова" />
                        <strong>Валерия Петрова</strong>
                        <p>Frontend разработчик и дизайнер</p>
                    </div>
                    <div className="team-member team-item">
                        <img src="/img/sonya.png" alt="Софья Макарова" />
                        <strong>Софья Макарова</strong>
                        <p>Frontend разработчик и дизайнер</p>
                    </div>
                    <div className="team-member team-item">
                        <img src="/img/lila.png" alt="Лилия Орлова" />
                        <strong>Лилия Орлова</strong>
                        <p>Fullstack разработчик</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;