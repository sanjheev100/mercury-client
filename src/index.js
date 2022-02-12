import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { createBrowserHistory } from 'history'
import App from './App'
import './bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd/dist/antd.css'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
// const browserHistory = createBrowserHistory()

//creating redux store

const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
