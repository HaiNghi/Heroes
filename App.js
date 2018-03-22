

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import SplashScreen from 'react-native-splash-screen';
import ReduxThunk from 'redux-thunk';
import firebase from 'firebase';
import reducers from './src/reducers';
import AppNavigation from './src/routes/route';

export default class App extends Component<{}> {
  componentDidMount() {
    SplashScreen.hide();
    const config = {
      apiKey: 'AIzaSyCMZ9wQNLZVwPHobdiWLzeIvHecCgWoAa4',
      authDomain: 'heroes-4875a.firebaseapp.com',
      databaseURL: 'https://heroes-4875a.firebaseio.com',
      projectId: 'heroes-4875a',
      storageBucket: 'heroes-4875a.appspot.com',
      messagingSenderId: '434547978170'
      // apiKey: "AIzaSyCmVBNyzhhvvr3pOnGM7eLJvz6i_HcTQsY",
      // authDomain: "heroes-demo-6e61e.firebaseapp.com",
      // databaseURL: "https://heroes-demo-6e61e.firebaseio.com",
      // projectId: "heroes-demo-6e61e",
      // storageBucket: "heroes-demo-6e61e.appspot.com",
      // messagingSenderId: "124925794813"
    };
    firebase.initializeApp(config);
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

