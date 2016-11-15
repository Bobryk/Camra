import React, {Component} from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import { Navigator } from 'react-native'
import * as reducers from '../reducers'
import Home from './Home'
import Saturation from './Saturation'
import Hue from './Hue'
import Blur from './Blur'
import Final from './Final'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

export default class App extends Component {
  render = () => {
    const routes = [
      {title: 'Home', index: 0},
      {title: 'Saturation', index: 1},
      {title: 'Hue', index: 2},
      {title: 'Blur', index: 3},
      {title: 'Final', index: 4}
    ]
    const componentsMap = {
      Home: Home,
      Saturation: Saturation,
      Hue: Hue,
      Blur: Blur,
      Final: Final
    }
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={routes[0]}
          renderScene={(route, navigator) => {
            NewComponent = componentsMap[route.title]
            return (
              <NewComponent
                title={route.title}
                onForward={ index => {
                  if(index!==0){
                    navigator.push(routes[index])
                  } else {
                    navigator.resetTo(routes[index])
                  }
                }}
              />
            )
          }}
        />
      </Provider>
    )
  }
}
