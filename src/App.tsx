import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './store/actions/index';
import { RootState } from './store/reducers';

const Checkout = lazy(() => import('./containers/Checkout/Checkout'));
const Orders = lazy(() => import('./containers/Orders/Orders'));
const Auth = lazy(() => import('./containers/Auth/Auth'));

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.authReducer.token !== null);
  const dispatch = useDispatch();
  const onTryAutomaticSignIn = useCallback(() => dispatch(actions.checkAuthState()), [dispatch]);

  useEffect(() => {
    onTryAutomaticSignIn();
  }, [onTryAutomaticSignIn]);

  let routes = <Switch>
    <Route path="/auth" component={Auth} />
    <Route path="/" exact component={BurgerBuilder} />
    <Redirect to="/" />
  </Switch>

  if (isAuthenticated) {
    routes = <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  }

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          {routes}
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
