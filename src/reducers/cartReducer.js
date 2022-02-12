let initialState = []

//load cart items from localstorage

if (typeof window !== 'undefined') {
  if (localStorage.getItem('mercuryCart')) {
    initialState = JSON.parse(localStorage.getItem('mercuryCart'))
  } else {
    initialState = []
  }
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload

    default:
      return state
  }
}
