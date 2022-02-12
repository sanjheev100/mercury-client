import axios from 'axios'

export const getOrders = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/getOrderAdmin`, {
    headers: {
      authtoken,
    },
  })
}

export const changeStatus = async (orderId, orderStatus, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/orderStatus`,
    {
      orderId,
      orderStatus,
    },
    {
      headers: {
        authtoken,
      },
    }
  )
}
