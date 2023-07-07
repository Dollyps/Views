import { HeaderDiv } from '../../components/Header/header';
import './orderpage.css';
import Imageit from '../../images/pexels-jaime-reimer-2662116.jpg'
import {GoLocation} from 'react-icons/go';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {BsBookmark} from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import addNotification from 'react-push-notification';
import {Spinner} from 'loading-animations-react';
import AppContext from '../../context/AppContext';
import { FooterDiv } from '../../components/footer/footer';
import ImageRev from '../../images/travel-luggage.png';


export const OrderHotelPage = () => {

    const [ MyBookings, setMyBookings ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)

    const {UserBasicDetails} = useContext(AppContext)

    useEffect( () => {
        setisLoading(true)

        if ( UserBasicDetails ) {
            axios.get(`/auth/get_reservations/`)
            .then( (response) => {
                setMyBookings(response.data)
                // console.log(response.data)
                setisLoading(false)
            } )
            .catch( (err) => {
                setisLoading(false)
                addNotification({
                    title: 'Warning',
                    subtitle:'Fatal Error',
                    message: 'Something went wrong',
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
                console.log(err.response.data)
            } )
        }else{
            setisLoading(false)
            setMyBookings([])
        }

    }, [UserBasicDetails] )



    let Content;


    if ( isLoading && !MyBookings ) {
        Content = <Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" className="loading_dots" />
    }

    if ( !isLoading && MyBookings ) {
        Content = <>
        
        
        <div className='favourite_herodection' style={{
            marginBottom:"40px"
        }} >
            <div className='favourite_herodection-txt' >My Hotel Reservations</div>
        </div>

        <div className='checkout-main' style={{
            // border:"1px solid red"
            justifyContent:"space-around"
        }} >

            { MyBookings.length > 0 ? MyBookings.map( (book,index) => {
                return  <div className='checkout-main-middle' style={{
                    border:"1px solid lightgray",
                    borderRadius:"8px",
                    marginTop:"40px"
                }} >
                            <div className='checkout-main-middle-title' >Hotel Reservation</div>

                            <div className='main-div-form' >
                                <label className='main-div-form-label' >Order Id</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g Afolabi Damilare' type={"text"} value={book._id} />
                            </div>

                            <div className='main-div-form' >
                                <label className='main-div-form-label' >Order Status</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g afolabidamilare08@gmail.com' type={"text"} value={"Booked"} />
                            </div>

                            {/* <div className='main-div-form' >
                                <label className='main-div-form-label' >Phone Number</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g 09028060262' type={"text"} value={book.phone_number} />
                            </div> */}

                            <div className='checkout-det' >

                                <img src={ book.hotel.hotel_images[0].url } className='checkout-det-img' alt="fingtt" />

                                <div className='checkout-det-right' >
                                    <div className='checkout-det-right-top' >{book.hotel.hotel_name}</div>

                                    <div className='checkout-det-right-split' >
                                        <GoLocation className='checkout-det-right-split-ic' />
                                        {book.hotel.hotel_address}
                                    </div>
{/* 
                                    <div className='checkout-det-right-split' >
                                        <AiOutlineClockCircle className='checkout-det-right-split-ic' />
                                        {book.time}
                                    </div> */}

                                    <div className='checkout-det-right-split' >
                                        <BsBookmark className='checkout-det-right-split-ic' />
                                        {book.number_of_days} Night
                                    </div>

                                </div>

                            </div>

                            <div className='main-div-form' >
                                <label className='main-div-form-label' >Full Name</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g Afolabi Damilare' type={"text"} value={book.full_name} />
                            </div>

                            <div className='main-div-form' >
                                <label className='main-div-form-label' >Email</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g afolabidamilare08@gmail.com' type={"text"} value={book.email_address} />
                            </div>

                            <div className='main-div-form' >
                                <label className='main-div-form-label' >Phone Number</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g 09028060262' type={"text"} value={book.phone_number} />
                            </div>

                            <div className='main-div-form' >
                                <label className='main-div-form-label' >Date</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g 09028060262' type={"text"} value={book.date} />
                            </div>

                            {/* <div className='main-div-form' >
                                <label className='main-div-form-label' >Time</label>
                                <input disabled={true} className='main-div-form-input' placeholder='e.g 09028060262' type={"text"} value={book.time} />
                            </div> */}

                            <div className='checkoutSlit' >

                                <div className='checkoutSlit-left' >Ticket</div>
                                <div className='checkoutSlit-right' > <span className='checkoutSlit-right-span' >({`${book.number_of_days} Nights`})</span>₦{new Intl.NumberFormat().format(book.total)}</div>

                                </div>


                                <div className='checkoutSlit' style={{
                                borderTop:"1px solid lightgray",
                                paddingTop:"10px"
                                }} >

                                <div className='checkoutSlit-left' >Total</div>
                                <div className='checkoutSlit-right' >₦{new Intl.NumberFormat().format(book.total)}</div>

                            </div>

                        </div>
            } ) : <div>
                    
            <img alt='bgyt' className='favourite-no-img' src={ImageRev} />

            <div className='favourite-text' >No Reservation</div>

            </div>  }

        </div>
        
        
        </>
    }


    return(

        <div style={{
            // backgroundColor: MyBookings 
        }} >
            <HeaderDiv/>
            
            {Content}

            <FooterDiv/>

        </div>

    )

}