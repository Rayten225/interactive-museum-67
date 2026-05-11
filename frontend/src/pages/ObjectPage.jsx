function ObjectPage() {
    return (
        <main className="container">
            <section className="block-split">
                <div>
                    <img src="/img/pot.png" alt="Горшок на мятой бумаге" className="img-fluid" />
                </div>
                <div>
                    <h1>Горшок 1467 года</h1>
                    <p>Перед нами круглобокий керамический сосуд с коротким, слегка расширяющимся горлышком. Его форма несовершенна: на боках видны легкие вмятины и неровности, оставленные пальцами мастера еще до того, как глина застыла в огне. У него нет изящества фабричной посуды, но есть монументальность предмета, созданного для вечности.</p>
                </div>
            </section>

            <section className="block-split4">
                <div>
                    <h2>История создания</h2>
                    <p>Глину долго очищали от крупных камней и корней, разминая её босыми ногами. Чтобы горшок не треснул при обжиге, в массу подмешали секретный ингредиент того времени — толченые ракушки и мелко порубленную сухую траву. Мастерица знала: если глина будет слишком «жирной», огонь погубит труд многих дней.</p>
                </div>
                <div>
                    <img src="/img/kunica.gif" alt="Рисунок куницы" className="img-fluid" />
                </div>
            </section>

            <section className="gallery-section">
                <h2>Галерея</h2>
                <div className="gallery-grid">
                    <img src="/img/pot1.png" alt="Фото 1" className="img-fluid" />
                    <img src="/img/pot2.png" alt="Фото 2" className="img-fluid" />
                    <img src="/img/pot3.png" alt="Фото 3" className="img-fluid" />
                </div>
            </section>
        </main>
    );
}

export default ObjectPage;