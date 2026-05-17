import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ObjectPage() {
    const { id } = useParams();
    
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`/api/exhibits/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Экспонат не найден');
                return res.json();
            })
            .then(json => {
                setData(json); 
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
        <main className="container" style={{ marginBottom: '80px', marginTop: '40px' }}>
            <section className="exhibit-detail">
                <h1>{exhibit.title}</h1>
                
                <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
                    <div style={{ flex: '1' }}>
                        <img 
                            src={exhibit.main_image || '/img/placeholder.png'} 
                            alt={exhibit.title} 
                            className="img-fluid" 
                            style={{ borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                        />
                    </div>

                    <div style={{ flex: '1.5' }}>
                        <h3>Описание</h3>
                        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
                            {exhibit.full_description}
                        </p>
                        
                        <p style={{ fontStyle: 'italic', color: '#666' }}>
                            {exhibit.short_description}
                        </p>

                        {exhibit.qr_code && (
                            <div style={{ marginTop: '20px' }}>
                                <h5>QR-код экспоната:</h5>
                                <img src={exhibit.qr_code} alt="QR Code" width="120" />
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ObjectPage;