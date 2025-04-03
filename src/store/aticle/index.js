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

    async getItemByCode(id) {
        const response = await fetch(`/articles/${id}`);
        const json = await response.json();
        this.setState(
            {
                ...this.getState(),
                item: json.result.item,
            },
            'Загружен товар из АПИ',
        );
    }
}

export default Aticle;
