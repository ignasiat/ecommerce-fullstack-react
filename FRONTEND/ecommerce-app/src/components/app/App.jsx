import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import ProductList from '../productList/productList';
import Shop from '../shop/shop';

import store from '../../redux/store/configureStore';
import Footer from '../footer/footer';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Shop} />
          <Route path="/products" component={ProductList} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
