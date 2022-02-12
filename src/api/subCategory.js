import axios from 'axios'

export const createSubCategory = async (subcategory, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/createSubCategory`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    }
  )
}
export const getSubCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/listAllSubCategory`)
}

export const getSubCategory = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/readSubCategory/${slug}`,
    {}
  )
}
export const removeSubCategory = async (slug, authtoken) => {
  return await axios.delete(
    `${process.env.REACT_APP_API}/removeSubCategory/${slug}`,
    {
      headers: {
        authtoken,
      },
    }
  )
}
export const updateSubCategory = async (slug, subcategory, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/updateSubCategory/${slug}`,
    subcategory,
    {
      headers: {
        authtoken,
      },
    }
  )
}
