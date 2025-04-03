import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Aticle from './aticle';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
// import Card from '../components/card';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path={`/articles/:id`} element={<Aticle />} />
      </Routes>
      {activeModal === 'basket' && <Basket />}
    </Router>
  );
}

export default App;