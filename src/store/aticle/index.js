import StoreModule from '../module';

class Aticle extends StoreModule {
    constructor(store, name) {
        super(store, name);
    }

    initState() {
        return {
            item: {},
        };
    }
    /**
     * поиск товара в базе данных по коду товара
     * @param _id Код товара
     */
    async getItemByCode(_id) {
        const response = await fetch(`/api/v1/articles/${_id}`);
        const json = await response.json();
        this.setState(
            {
                ...this.getState(),
                item: json.result,
            },
            'Загружен товар из АПИ',
        );
    }

}

export default Aticle;  
