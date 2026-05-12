// function ObjectPage() {
//     return (
//         <main className="container">
//             <section className="block-split">
//                 <div>
//                     <img src="/img/pot.png" alt="Горшок на мятой бумаге" className="img-fluid" />
//                 </div>
//                 <div>
//                     <h1>Горшок 1467 года</h1>
//                     <p>Перед нами круглобокий керамический сосуд с коротким, слегка расширяющимся горлышком. Его форма несовершенна: на боках видны легкие вмятины и неровности, оставленные пальцами мастера еще до того, как глина застыла в огне. У него нет изящества фабричной посуды, но есть монументальность предмета, созданного для вечности.</p>
//                 </div>
//             </section>

//             <section className="block-split4">
//                 <div>
//                     <h2>История создания</h2>
//                     <p>Глину долго очищали от крупных камней и корней, разминая её босыми ногами. Чтобы горшок не треснул при обжиге, в массу подмешали секретный ингредиент того времени — толченые ракушки и мелко порубленную сухую траву. Мастерица знала: если глина будет слишком «жирной», огонь погубит труд многих дней.</p>
//                 </div>
//                 <div>
//                     <img src="/img/kunica.gif" alt="Рисунок куницы" className="img-fluid" />
//                 </div>
//             </section>

//             <section className="gallery-section">
//                 <h2>Галерея</h2>
//                 <div className="gallery-grid">
//                     <img src="/img/pot1.png" alt="Фото 1" className="img-fluid" />
//                     <img src="/img/pot2.png" alt="Фото 2" className="img-fluid" />
//                     <img src="/img/pot3.png" alt="Фото 3" className="img-fluid" />
//                 </div>
//             </section>
//         </main>
//     );
// }

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Импортируем хук для получения ID из URL

function ObjectPage() {
    // 1. Получаем ID из пути (например, если URL /exhibit/1, то id будет "1")
    const { id } = useParams();
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Загружаем данные конкретного экспоната при открытии страницы
    useEffect(() => {
        fetch(`/api/exhibits/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Экспонат не найден');
                return res.json();
            })
            .then(json => {
                setData(json); // json содержит { exhibit: {...}, question: {...} }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="container"><h3>Загрузка...</h3></div>;
    if (error) return <div className="container"><h3>Ошибка: {error}</h3></div>;
    if (!data) return null;

    const { exhibit, question } = data;

    return (
        <main className="container" style={{ marginTop: '40px' }}>
            <section className="exhibit-detail">
                <h1>{exhibit.Title}</h1>
                
                <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
                    {/* Изображение экспоната */}
                    <div style={{ flex: '1' }}>
                        <img 
                            src={exhibit.MainImage || '/img/placeholder.png'} 
                            alt={exhibit.Title} 
                            className="img-fluid" 
                            style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        />
                    </div>

                    {/* Описание */}
                    <div style={{ flex: '1.5' }}>
                        <h3>Описание</h3>
                        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            {exhibit.FullDescription}
                        </p>
                        
                        {/* Краткое описание как доп. инфо */}
                        <p style={{ fontStyle: 'italic', color: '#666' }}>
                            {exhibit.ShortDescription}
                        </p>

                        {/* QR-код (генерируется бэкендом) */}
                        {exhibit.QRCode && (
                            <div style={{ marginTop: '20px' }}>
                                <h5>QR-код экспоната:</h5>
                                <img src={exhibit.QRCode} alt="QR Code" width="120" />
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 3. Блок интерактива: показываем квиз, только если бэкенд прислал вопрос */}
            {question && (
                <section style={{ marginTop: '50px', backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '12px' }}>
                    <h2>Интерактив: Проверь себя</h2>
                    <p style={{ fontSize: '20px' }}>{question.Text}</p>
                    <Quiz exhibitId={exhibit.ID} />
                </section>
            )}
        </main>
    );
}

export default ObjectPage;