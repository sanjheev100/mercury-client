import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { authen } from './firebase'
import { useDispatch } from 'react-redux'
import { currentUser } from './api/auth'
import { Spinner } from 'react-bootstrap'
// import {
//   Register,
//   Login,
//   Home,
//   RegisterComplete,
//   ForgotPassword,
//   History,
//   PasswordChange,
//   WishList,
//   AdminDashBoard,
//   CategoryCreate,
//   CategoryUpdate,
//   SubCategoryCreate,
//   SubCategoryUpdate,
//   ProductCreate,
//   Products,
//   ProductUpdate,
//   Shop,
//   ProductDetail,
//   CategoryHome,
//   Cart,
//   Checkout,
// } from './pages'
// import { Footer, Header, SideDrawer } from './components'
// import { authen } from './firebase'
// import { useDispatch } from 'react-redux'
// import { currentUser } from './api/auth'
// import UserRoute from './components/Routes/UserRoute'
// import AdminRoute from './components/Routes/AdminRoute'
// import SubHome from './pages/subCategory/SubHome'

//using lazy
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const Home = lazy(() => import('./pages/Home'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const History = lazy(() => import('./pages/user/History'))
const PasswordChange = lazy(() => import('./pages/user/PasswordChange'))
const WishList = lazy(() => import('./pages/user/WishList'))
const AdminDashBoard = lazy(() => import('./pages/admin/AdminDashboard'))
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
)
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
)
const SubCategoryCreate = lazy(() =>
  import('./pages/admin/subCategory/SubCategoryCreate')
)
const SubCategoryUpdate = lazy(() =>
  import('./pages/admin/subCategory/SubCategoryUpdate')
)
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'))
const Products = lazy(() => import('./pages/admin/product/Products'))
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'))
const Shop = lazy(() => import('./pages/Shop'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const CategoryHome = lazy(() => import('./pages/category/CateoryHome'))
const Cart = lazy(() => import('./pages/Cart'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Header = lazy(() => import('./components/Nav/Header'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const Footer = lazy(() => import('./components/Nav/Footer'))
const UserRoute = lazy(() => import('./components/Routes/UserRoute'))
const AdminRoute = lazy(() => import('./components/Routes/AdminRoute'))
const SubHome = lazy(() => import('./pages/subCategory/SubHome'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const AdminContactus = lazy(() => import('./pages/admin/AdminContactus'))
const BlockList = lazy(() => import('./pages/admin/blockList/BlockList'))
const NotFound = lazy(() => import('./pages/NotFound'))
const App = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const unSubscribe = authen.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        // console.log(user)
        currentUser(idTokenResult.token)
          .then((res) => {
            setLoading(true)

            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
                isBlocked: res.data.isBlocked,
              },
            })
            setLoading(false)
          })
          .catch((error) => {
            toast.error(error, {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setLoading(false)
          })
      }
    })
    setLoading(false)

    return () => unSubscribe()
  }, [dispatch])

  return (
    <Suspense
      fallback={
        <div className='col text-center p-5'>
          <Spinner />
        </div>
      }
    >
      <Header />
      <SideDrawer />
      <ToastContainer />
      {loading ? (
        <h1 className='text-white'>Loading...</h1>
      ) : (
        <main className='py-3'>
          <Routes>
            <Route exact path='/' element={<Shop />} />
            {/* <Route exact path='/shop' element={<Shop />} /> */}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route
              exact
              path='/register/complete'
              element={<RegisterComplete />}
            />
            <Route path='*' element={<NotFound />} />
            <Route exact path='/forgot/password' element={<ForgotPassword />} />
            <Route exact path='/product/:slug' element={<ProductDetail />} />
            <Route exact path='/category/:slug' element={<CategoryHome />} />
            <Route exact path='/subCategory/:slug' element={<SubHome />} />
            <Route exact path='/cart' element={<Cart />} />
            <Route exact path='/contactus' element={<ContactUs />} />
            {/* User Routes */}
            <Route element={<UserRoute />}>
              <Route exact path='/user/history' element={<History />} />
              <Route exact path='/user/password' element={<PasswordChange />} />
              <Route exact path='/user/wishlist' element={<WishList />} />
              <Route exact path='/checkout' element={<Checkout />} />
            </Route>
            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route
                exact
                path='/admin/dashboard'
                element={<AdminDashBoard />}
              />

              <Route
                exact
                path='/admin/category'
                element={<CategoryCreate />}
              />

              <Route
                exact
                path='/admin/category/:slug'
                element={<CategoryUpdate />}
              />

              <Route
                exact
                path='/admin/subcategory/'
                element={<SubCategoryCreate />}
              />
            </Route>
            <Route
              exact
              path='/admin/subcategory/:slug'
              element={<SubCategoryUpdate />}
            />
            <Route exact path='/admin/product' element={<ProductCreate />} />
            <Route exact path='/admin/products' element={<Products />} />
            <Route
              exact
              path='/admin/product/:slug'
              element={<ProductUpdate />}
            />
            <Route exact path='/admin/contact' element={<AdminContactus />} />
            <Route exact path='/admin/blocklist' element={<BlockList />} />
          </Routes>
        </main>
      )}
      <Footer />
    </Suspense>
  )
}

export default App
