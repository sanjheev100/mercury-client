import axios from 'axios'

export const userCart = async (cart, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getUserCart = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/getCart`, {
    headers: {
      authtoken,
    },
  })
}

export const emptyCart = async (authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/removeCart`,

    {
      headers: {
        authtoken,
      },
    }
  )
}

export const saveUserAddress = async (authtoken, address) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const createOrder = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getUserOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/getOrder`, {
    headers: {
      authtoken,
    },
  })
}
export const getWishlist = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/user/getWishlist`, {
    headers: {
      authtoken,
    },
  })
}

export const removeFromWishlist = async (productId, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const addToWishList = async (productId, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  )
}

// export const addToWishList = ()

export const getAllUsers = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/getAllUsers`, {
    headers: {
      authtoken,
    },
  })
}

export const changeBlock = async (id, isBlocked, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/changeBlock`,
    { id, isBlocked },
    {
      headers: {
        authtoken,
      },
    }
  )
}
