import { memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import Button from '../button';
import './style.css';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router-dom';

function Card({ item, onAdd = () => { } }) {
  const cn = bem('Card');

  const store = useStore();

  useEffect(() => {
    store.actions.catalog.load();

    async function fetchItem(_id) {
      const item = await store.actions.aticle.getItemByCode(_id);
      // Добавьте здесь код для обновления состояния компонента
    }

    fetchItem(select.item._id);
  }, []);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.aticle.item,
  }));



  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    onAdd: e => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <h4 className={cn('title')}>{item.title}</h4>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <Button style="primary" onClick={callbacks.onAdd} title="Добавить" />
        <Link to={`/`} >
          на главную
        </Link>
      </div>
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Card);