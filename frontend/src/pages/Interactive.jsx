import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Interactive() {
    const [exhibits, setExhibits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/exhibits') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json();
            })
            .then(data => {
                setExhibits(data || []);
                setLoading(false);
            })
            .catch(error => {
                console.error("Ошибка загрузки экспонатов:", error);
                setLoading(false);
            });
    }, []);

    return (
        <main className="container">
            <h1 style={{ textAlign: 'center', marginTop: '40px' }}>Интерактивный музей</h1>

            <section className="block-split2">
                <div>
                    <img src="/img/gus.png" alt="Статуя" className="img-fluid" />
                </div>
                <div>
                    <p style={{ fontSize: '20px', fontWeight: 600, marginBottom: '20px' }}>Наш музей - это мультимедийное пространство, где знания оживают в удобном для вас формате. Мы объединили глубину классических статей с динамикой видео и наглядностью фото.</p>
                    <p style={{ fontSize: '18px', marginBottom: '10px' }}>Как это работает:</p>
                    <ul style={{ marginLeft: '20px', fontSize: '18px' }}>
                        <li><strong>Читайте:</strong> Увлекательные исследования и редкие факты.</li>
                        <li><strong>Смотрите:</strong> Эксклюзивные видеоматериалы и архивные хроники.</li>
                        <li><strong>Исследуйте:</strong> Рассматривайте детали на детальных снимках в собственном темпе.</li>
                    </ul>
                </div>
            </section>

            <section className="virtual-exhibitions">
                <h2>Наши экспонаты</h2>
                <section className="block-split3">
                    <div>
                        <img src="/img/alarm.png" alt="Фото будильника" className="img-fluid" />
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        {loading ? (
                            <p>Загрузка экспонатов...</p>
                        ) : exhibits.length > 0 ? (
                            <ul>
                                {exhibits.map((exhibit) => (
                                    <li key={exhibit.ID || exhibit.id}>
                                        <Link to={`/exhibit/${exhibit.ID || exhibit.id}`}>
                                            {exhibit.Title || exhibit.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Экспонатов пока нет.</p>
                        )}
                    </div>

                    <div>
                        <img src="/img/dress.png" alt="Фото платья" className="img-fluid" />
                    </div>
                </section>
            </section>
        </main>
    );
}

export default Interactive;