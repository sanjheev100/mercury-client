import axios from 'axios'

export const createProduct = async (product, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/createProduct`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getProductsByCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/getProducts`)
}

export const deleteProduct = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  })
}

export const getProductDetails = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/getSingleProduct/${slug}`
  )
}

export const updateProduct = async (slug, product, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/updateProduct/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getNewArrivals = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/getNewArrivals`)
}

export const getProductswithCustom = async (sort, order, page, perPage) => {
  return await axios.post(`${process.env.REACT_APP_API}/products`, {
    sort,
    order,
    page,
    perPage,
  })
}

export const productsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/totalproducts/total`)
}

export const productStar = async (id, star, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/star/${id}`,
    { star },
    {
      headers: {
        authtoken,
      },
    }
  )
}

export const getRelatedProduct = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/product/related/${id}`)
}

export const searchFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg)
}

export const updateProductCount = async (id, count, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/updateProductCount`,
    { id: id, count: count },
    {
      headers: {
        authtoken,
      },
    }
  )
}
