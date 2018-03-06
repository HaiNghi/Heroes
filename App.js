

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import SplashScreen from 'react-native-splash-screen';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import AppNavigation from './src/routes/route';

export default class App extends Component<{}> {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <AppNavigation />
      </Provider>
    );
  }

}

