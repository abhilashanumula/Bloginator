import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,
         createRoutesFromElements,
         Route,
         RouterProvider
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute.jsx'
import Homescreen from './components/Homescreen.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import RegisterScreen from './components/RegisterScreen.jsx'
import ProfileScreen from './components/ProfileScreen.jsx';
import CreateScreen from './components/CreateScreen.jsx'
import BlogPage from './components/BlogScreen.jsx'
import UpdateScreen from './components/UpdateScreen.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
        <Route index={true} path='/' element={ <Homescreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={ <RegisterScreen />} />
        <Route path='/blog' element={ <BlogPage />} />
        
        <Route path='' element={<PrivateRoute />}>
          <Route path='/profile' element={ <ProfileScreen />} />
          <Route path='/create' element={ <CreateScreen />} />
          <Route path='/update' element={ <UpdateScreen />} />
        </Route>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
);
