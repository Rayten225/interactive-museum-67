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

            <section style={{ margin: '80px 0' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Наши экспонаты</h2>
                
                {loading ? (
                    <p style={{ textAlign: 'center', fontSize: '18px' }}>Загрузка экспонатов...</p>
                ) : exhibits.length > 0 ? (
                    <div className="exhibits-grid"> {/* <-- Используем наш новый CSS класс */}
                        {exhibits.map((exhibit) => (
                            <Link 
                                to={`/exhibit/${exhibit.ID || exhibit.id}`} 
                                key={exhibit.ID || exhibit.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <div 
                                    style={{
                                        backgroundColor: '#221c17',
                                        borderRadius: '10px',
                                        padding: '20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        transition: 'transform 0.3s ease, background-color 0.3s ease',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                                        height: '100%'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.backgroundColor = '#3a3028';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.backgroundColor = '#221c17';
                                    }}
                                >
                                    <img 
                                        src={exhibit.main_image || exhibit.image || '/img/logo.png'} 
                                        alt={exhibit.Title || exhibit.title} 
                                        style={{ 
                                            width: '100%', 
                                            height: '220px', 
                                            objectFit: 'contain', 
                                            marginBottom: '20px',
                                            borderRadius: '8px',
                                            backgroundColor: '#b1b1b1',
                                            padding: '10px'
                                        }} 
                                    />
                                    <h3 style={{ 
                                        color: '#ffffff', 
                                        fontSize: '20px', 
                                        textAlign: 'center',
                                        margin: 0
                                    }}>
                                        {exhibit.Title || exhibit.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p style={{ textAlign: 'center', fontSize: '18px' }}>Экспонатов пока нет.</p>
                )}
            </section>
        </main>
    );
}

export default Interactive;