import axios from 'axios'

export const createContact = async (payload) => {
  return await axios.post(`${process.env.REACT_APP_API}/postContact`, payload)
}

export const deleteContactForm = async (id, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/removeContact/${id}`,
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getContactForms = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/getContacts`, {
    headers: {
      authtoken,
    },
  })
}
