import React, { useState, useEffect } from 'react'
import {
  getProductsByCount,
  getProductswithCustom,
  productsCount,
  searchFilter,
} from '../api/product'
import { getCategories } from '../api/category'
import { useSelector, useDispatch } from 'react-redux'
import { ProductCard, Star, ProductCarousel } from '../components'
import { Menu, Slider, Checkbox, Pagination } from 'antd'
import { getSubCategories } from '../api/subCategory'
import { Badge, Button, Row, Tooltip } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './shop.css'
import { useLocation } from 'react-router-dom'

const { SubMenu, ItemGroup } = Menu

const Shop = () => {
  const [products, setProducts] = useState([])
  const [price, setPrice] = useState([0, 0])
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [categories, setCategories] = useState([])
  const [checkedCategories, setCheckedCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [checkedSubCategories, setCheckedSubCategories] = useState([])
  const [star, setStar] = useState('')
  // const [filterApplied, setFilterApplied] = useState(false)
  const [page, setPage] = useState(1)
  const [totalProductCount, setTotalProductCount] = useState(0)
  const [newlyAdded, setNewlyAdded] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const { search, filterApplied } = useSelector((state) => ({ ...state }))
  const { text } = search

  useEffect(() => {
    dispatch({ type: 'FILTER_APPLIED', payload: false })
  }, [location])
  useEffect(() => {
    loadAllProducts()
    //fetch categories
    getCategories().then((res) => {
      setCategories(res.data)
    })
    // fetch subcategories
    getSubCategories().then((res) => {
      setSubCategories(res.data)
    })
  }, [])

  useEffect(() => {
    productsCount().then((res) => {
      setTotalProductCount(res.data)
    })
  }, [])

  useEffect(() => {
    loadNewlyAdded()
  }, [])

  const loadNewlyAdded = () => {
    setLoading(true)
    getProductswithCustom('createdAt', 'desc', 1, 3)
      .then((res) => {
        setLoading(false)

        setNewlyAdded(res.data)
      })
      .catch((err) => {
        setLoading(false)

        setLoading(false)
        console.log(err)
      })
  }

  const handlePageChange = (value) => {
    setPage(value)
  }

  const perPage = 21
  // 1. Load products on page load
  const loadAllProducts = () => {
    setLoading(true)
    getProductswithCustom('createdAt', 'desc', page, perPage)
      .then((res) => {
        setLoading(false)
        setProducts(res.data)
        dispatch({ type: 'FILTER_APPLIED', payload: false })
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }
  useEffect(() => {
    loadAllProducts()
  }, [page])

  const fetchProductsByFilter = (arg) => {
    setLoading(true)
    searchFilter(arg).then((res) => {
      dispatch({ type: 'FILTER_APPLIED', payload: true })
      setProducts(res.data)
      setLoading(false)
    })
  }

  // 2. Load product from search filter
  useEffect(() => {
    // add slight delay, to prevent request on every key
    const delay = setTimeout(() => {
      fetchProductsByFilter({ query: text })
      if (!text) {
        loadAllProducts()
      }
    }, 300)
    return () => clearTimeout(delay)
  }, [text])

  // 3. Fetch products by price range
  useEffect(() => {
    fetchProductsByFilter({ price: price })
  }, [ok])

  const handleSlider = (val) => {
    // Clear other filters
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setCheckedCategories([])
    setStar('')
    setCheckedSubCategories([])

    setPrice(val)
    setTimeout(() => {
      setOk(!ok)
    }, 300)
  }

  // 4. Load products based on category
  // show category list to user
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className='pb-2 pl-4 pr-4'
          value={c._id}
          name='category'
          checked={checkedCategories.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ))

  // handle check for checkboxes
  const handleCheck = (e) => {
    // clear other filter values
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setStar('')
    setCheckedSubCategories([])

    let inTheState = [...checkedCategories]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked)

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }

    setCheckedCategories(inTheState)
    fetchProductsByFilter({ category: inTheState })
  }

  // 5. Show products by star rating
  const showStars = () => (
    <div className='pr-4 pl-4 pb-2'>
      <Star starClick={handleStarClick} numberOfStars={5} />
      <Star starClick={handleStarClick} numberOfStars={4} />
      <Star starClick={handleStarClick} numberOfStars={3} />
      <Star starClick={handleStarClick} numberOfStars={2} />
      <Star starClick={handleStarClick} numberOfStars={1} />
    </div>
  )

  const handleStarClick = (num) => {
    // clear other filter values
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setCheckedCategories([])
    setCheckedSubCategories([])

    setStar(num)
    fetchProductsByFilter({ stars: num })
  }

  // //  Show products by sub category
  // const showSubCategories = () =>
  //   subCategories.map((s) => (
  //     <div
  //       key={s._id}
  //       className='p-1 m-1 badge badge-secondary'
  //       onClick={() => handleSubCatSubmit(s)}
  //       style={{ cursor: 'pointer' }}
  //     >
  //       {s.name}
  //     </div>
  //   ))
  const showSubCategories = () =>
    subCategories.map((s) => (
      <h6
        className='p-1 m-1 badge badge-primary'
        style={{
          cursor: 'pointer',
          color: 'black',
          fontSize: 18,
        }}
        onClick={() => handleSubCatSubmit(s._id)}
        key={s._id}
      >
        <Badge>{s.name}</Badge>
      </h6>
    ))

  const handleSubCatSubmit = (s) => {
    // clear other filter values
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } })
    setPrice([0, 0])
    setCheckedCategories([])
    setStar('')
    setCheckedSubCategories(s)
    fetchProductsByFilter({ subcategory: s })
  }

  const handleClearFilter = () => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice([0, 0])
    setCheckedCategories([])
    setStar('')
    setCheckedSubCategories('')
    setProducts([])
    loadAllProducts()

    navigate('/')
  }

  return (
    <div
      className='container-fluid'
      style={{ position: 'relative', zIndex: 1 }}
    >
      <div className='row'>
        <div className='col-md-3 pt-2'>
          <h4 className='text-secondary'>Search/Filter</h4>
          <hr />

          {filterApplied && (
            <Button
              className='clearbtn btn-sm'
              onClick={handleClearFilter}
              style={{
                marginTop: '-10px',
                position: 'fixed',
                bottom: 150,
                right: 20,
                zIndex: 2,
              }}
            >
              Clear
            </Button>
          )}

          <Menu
            mode='inline'
            defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']}
          >
            {/* Categories */}
            <SubMenu
              key='2'
              title={
                <span className='h6'>
                  <i className='far fa-caret-square-down'></i> Categories
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showCategories()}</div>
            </SubMenu>
            {/* Ratings
            <SubMenu
              key='3'
              title={
                <span className='h6'>
                  <i className='far fa-star'></i> Ratings
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showStars()}</div>
            </SubMenu> */}
            {/* Subcategories */}
            <SubMenu
              key='4'
              title={
                <span className='h6'>
                  <i className='far fa-caret-square-down'></i> Sub Categories
                </span>
              }
            >
              <div className='pl-4 pr-4' style={{ marginTop: '-10px' }}>
                {showSubCategories()}
              </div>
            </SubMenu>
          </Menu>
        </div>

        <div className='col-md-9 pt-2'>
          <ProductCarousel newlyAddedproducts={newlyAdded} />

          {loading ? (
            <>
              <h4 className='text-white'>Loading...</h4>
            </>
          ) : (
            <>
              {filterApplied ? (
                <span>
                  <h4 className='text-white'>Filtered-Products</h4>
                  <p className='text-muted'>
                    Press Clear Filter to View All Products
                  </p>
                </span>
              ) : (
                <h4 className='text-white'>Products</h4>
              )}
            </>
          )}

          {products.length < 1 && (
            <h2 className='text-center text-white'>No Products Found</h2>
          )}

          {filterApplied ? (
            <>
              <div className='row pb-5'>
                {products.map((p) => (
                  <div key={p._id} className='col-md-4 mt-3'>
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='row pb-5'>
              <Row>
                {products.map((p) => (
                  <div key={p._id} className='col-md-4 mt-3'>
                    <ProductCard product={p} />
                  </div>
                ))}
              </Row>
              <nav className='col-md-6   text-center pt-2 p-3'>
                <Pagination
                  current={page}
                  total={Math.ceil(totalProductCount / perPage) * 10}
                  onChange={(value) => handlePageChange(value)}
                  showSizeChanger={false}
                />
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Shop
