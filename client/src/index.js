import materializeCSS from 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';




//Create store Arg 1= Producer, Arg 2: Initial state
const store = createStore (reducers, {}, applyMiddleware(reduxThunk));

//authReducer - Whether user is logged in
//surveysReducer - list of all surveys user has created



//arguments: root component, reference to existing DOM node (div ID root) in public/index.html
// encascuplate eerything in Provider Tag so all components can access states from store
// Provider sends updates about state changes from store to all child components (App)
ReactDOM.render(
    <Provider store ={store}> <App/> </Provider>,
    document.querySelector('#root'));

