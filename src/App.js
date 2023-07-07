import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePageDiv } from './pages/Homepage/Homepage';
import { DetailPage } from './pages/DetailPage/detailPage';
import { CheckoutPage } from './pages/checkoutPage/checkoutpage';
import Axios from "axios"
import { Notifications } from 'react-push-notification';
import { useEffect, useState } from 'react';
import AppContext from "./context/AppContext"
import { FavouritePage } from './pages/favourites/favourites';
import { OrderPage } from './pages/orderPage/orderpage';
import { HotelPage } from './pages/HotelPage/hotelPage';
import { CheckoutHotelPage } from './pages/checkoutHotelPage/checkouthotelpage';
import { OrderHotelPage } from './pages/orderHotelPage/orderHotelpage';
import { SearchPageDiv } from './pages/Homepage/Searchpage';

const App = () => {

    // Axios.defaults.baseURL = "http://localhost:5001/"; 
    Axios.defaults.baseURL = "https://travellerwebbackend-production.up.railway.app/"; 

    const [ UserDetails, setUserDetails ] = useState(null)

    useEffect( () => {

      const items = JSON.parse(localStorage.getItem('user_token'));

      if (items) {
          Axios.defaults.headers.common['token'] = 'Bearer ' + items
          console.log(items)

          Axios.get('/auth/get_user_details')
              .then( (response) => {
                  console.log(response.data)
                  setUserDetails(response.data)
              } )
              .catch( (err) => {
                  console.log(err)
              } )

      }else{
          
      }

    }, [] )

    const LoginHandler = (data) => {
      setUserDetails(data)
      console.log(data)
      localStorage.setItem('user_token',JSON.stringify(data.Token))
      Axios.defaults.headers.common['token'] = 'Bearer ' + data.Token
    }

    const LogoutHandler = () => {
      setUserDetails(null)
      localStorage.setItem('user_token',JSON.stringify(null))
    }

  return(
    <AppContext.Provider value={{
      UserBasicDetails:UserDetails,
      LoginHandler: LoginHandler,
      LogoutHandler:LogoutHandler
    }} >
      <Notifications/>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={ <HomePageDiv/> } />
          <Route path="/detail_page/:site_id" exact element={ <DetailPage/> } />
          <Route path="/hotel_page/:hotel_id" exact element={ <HotelPage/> } />
          <Route path="/search_page/:search_query" exact element={ <SearchPageDiv/> } />
          <Route path="/search_page/" exact element={ <SearchPageDiv/> } />
          <Route path="/check_out/:site_id" exact element={ <CheckoutPage/> } />
          <Route path="/check_out_hotel/:hotel_id" exact element={ <CheckoutHotelPage/> } />
          <Route path="/my_orders" exact element={ <OrderPage/> } />
          <Route path="/my_hotel_orders" exact element={ <OrderHotelPage/> } />
          <Route path="/favourite" exact element={ <FavouritePage/> } />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )

}

export default App;
