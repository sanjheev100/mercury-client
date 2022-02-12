import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { searchReducer } from './searchReducers'
import { cartReducer } from './cartReducer'
import { drawerReducer } from './drawerReducer'
import { filterReducer } from './filterReducer'

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  filterApplied: filterReducer,
})

export default rootReducer
