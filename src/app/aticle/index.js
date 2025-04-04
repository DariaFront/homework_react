import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Card from '../../components/card';
import { useParams } from 'react-router-dom';

function Aticle() {
    const { _id } = useParams();
    const store = useStore();

    console.log('id:', _id)
    useEffect(() => {
        async function fetchItem(_id) {
            const item = await store.actions.aticle.getItemByCode(_id);
        }
        fetchItem(_id);
    }, []);

    const select = useSelector(state => ({
        amount: state.basket.amount,
        sum: state.basket.sum,
        item: state.aticle.item,
    }));
    console.log('item:', select.item)

    const callbacks = {
        // Добавление в корзину
        addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
        // Открытие модалки корзины
        openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
        // Переход к товару
        goToAticle: useCallback(_id => store.actions.aticle.getItemByCode(_id), [store]),
    };

    return (
        <PageLayout>
            <Head title="название товара" />
            <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            <Card key={_id} item={select.item} onAdd={callbacks.addToBasket} />
        </PageLayout>
    );
}

export default memo(Aticle);