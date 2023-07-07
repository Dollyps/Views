import { HeaderDiv } from '../../components/Header/header';
import './checkoutpage.css';
import Imageit from '../../images/pexels-jaime-reimer-2662116.jpg'
import {GoLocation} from 'react-icons/go';
import {AiOutlineClockCircle} from 'react-icons/ai';
import {BsBookmark} from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, redirect, useNavigate } from "react-router-dom";
import addNotification from 'react-push-notification';
import {Spinner} from 'loading-animations-react';
import AppContext from '../../context/AppContext';
import { FooterDiv } from '../../components/footer/footer';


export const CheckoutPage = () => {

    const time_span = [ "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm" ]

    const [ CheckOutDetails, setCheckOutDetails ] = useState({
        site_id:"",
        full_name:"",
        email_address:"",
        phone_number:"",
        date:"",
        time:"",
        number_of_passengers:"",
        card_number:"",
        exp_date:"",
        cvv:""
    })


    const {site_id} = useParams()

    const navigate = useNavigate();

    const [ SiteDetail, setSiteDetail ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ BtnisLoading, setBtnisLoading ] = useState(false)

    const {UserBasicDetails} = useContext(AppContext)

    useEffect( () => {
        setisLoading(true)
        axios.get(`/auth/get_sites/${site_id}`)
            .then( (response) => {
                setSiteDetail(response.data)
                console.log(response.data)
                setisLoading(false)
                setCheckOutDetails({
                    ...CheckOutDetails,
                    full_name: UserBasicDetails.full_name,
                    email_address:UserBasicDetails.email
                })
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

    }, [site_id,UserBasicDetails] )



    const HandleCheckoutSubmit = () => {

        setBtnisLoading(true)

        if ( CheckOutDetails.number_of_passengers === '' || CheckOutDetails.number_of_passengers === '0' ) {
            addNotification({
                title: 'Warning',
                subtitle:'Something Went Wrong',
                message: 'All fileds must be filled',
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
            });
            return
        }

        const dataToSend = {
            site_id: SiteDetail._id,
            full_name: CheckOutDetails.full_name,
            email_address:CheckOutDetails.email_address,
            phone_number:CheckOutDetails.phone_number,
            date:CheckOutDetails.date,
            time:CheckOutDetails.time,
            number_of_passengers: CheckOutDetails.number_of_passengers,
            card_number: CheckOutDetails.card_number,
            exp_date: CheckOutDetails.exp_date,
            cvv:CheckOutDetails.cvv
        }

        axios.post('/auth/create_booking',dataToSend)
            .then( (response) => {

                setBtnisLoading(false)
                addNotification({
                    title: 'Success',
                    subtitle:'Booking Confirmed',
                    message: 'You have successfully booked this site',
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
                console.log(response.data)
                navigate("/my_orders")
            } )
            .catch( (err) => {
                setBtnisLoading(false)
                if ( err.response ) {
                    addNotification({
                        title: 'Warning',
                        subtitle:'Something went wrong',
                        message: err.response.data.error_message,
                        theme: 'darkblue',
                        native: true // when using native, your OS will handle theming.
                    });
                }else{
                    addNotification({
                        title: 'Warning',
                        subtitle:'Fatal Error',
                        message: 'Something went wrong',
                        theme: 'darkblue',
                        native: true // when using native, your OS will handle theming.
                    });
                }
                console.log(err.response.data)
            } )

    }

    let Content;


    if ( isLoading && !SiteDetail ) {
        Content = <Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" className="loading_dots" />
    }

    if ( !isLoading && SiteDetail ) {
        Content = <>
        
        
        <div className='favourite_herodection' >
                <div className='favourite_herodection-txt' >Checkout</div>
                {/* <div className='favourite_herodection-txt' ></div> */}
            </div>

            <div className='checkout-main' >


            <div className='checkout-main-middle' >

                <div className='main-div-form' >
                    <label className='main-div-form-label' >Full Name</label>
                    <input className='main-div-form-input' placeholder='e.g Afolabi Damilare' type={"text"} value={CheckOutDetails.full_name} onChange={ (e) => {
                        setCheckOutDetails({
                            ...CheckOutDetails,
                            full_name:e.target.value
                        })
                    } } />
                </div>

                <div className='main-div-form' >
                    <label className='main-div-form-label' >Email</label>
                    <input className='main-div-form-input' placeholder='e.g afolabidamilare08@gmail.com' type={"text"} value={CheckOutDetails.email_address} onChange={ (e) => {
                        setCheckOutDetails({
                            ...CheckOutDetails,
                            email_address:e.target.value
                        })
                    } } />
                </div>

                <div className='main-div-form' >
                    <label className='main-div-form-label' >Phone Number</label>
                    <input className='main-div-form-input' placeholder='e.g 09028060262' type={"text"} value={CheckOutDetails.phone_number} onChange={ (e) => {
                        setCheckOutDetails({
                            ...CheckOutDetails,
                            phone_number:e.target.value
                        })
                    } } />
                </div>

        </div>

                <div className='checkout-main-middle' >

                    {/* <div className='checkout-main-middle-title' >Checkout</div> */}

                    <div className='main-div-form' >
                        <label className='main-div-form-label' >Select Date</label>
                        <input className='main-div-form-input' type={"date"} value={CheckOutDetails.date} onChange={ (e) => {
                            setCheckOutDetails({
                                ...CheckOutDetails,
                                date:e.target.value
                            })
                        } } />
                    </div>

                    <div className='main-div-form' >
                        <label className='main-div-form-label' >Select Time</label>
                        <div className='main-div-split' style={{
                            flexWrap:"wrap"
                        }} >

                            { time_span.map( (time) => {
                                return <button className='main-div-split-btn' key={time} style={{
                                    backgroundColor: time === CheckOutDetails.time ? "rgb(61, 61, 103)" : "transparent",
                                    color: time === CheckOutDetails.time ? "white" : "#000"
                                }} onClick={ () => {
                                    setCheckOutDetails({
                                        ...CheckOutDetails,
                                        time:time
                                    })
                                } } >{time}</button> 
                            } ) }

                        </div>
                    </div>

                    <div className='main-div-form' >
                        <label className='main-div-form-label' >Passengers</label>
                        <div className='main-div-split' >
                        <input className='main-div-form-input' placeholder='Number of passengers' min={0} type={"number"} value={CheckOutDetails.number_of_passengers} onChange={ (e) => {
                            setCheckOutDetails({
                                ...CheckOutDetails,
                                number_of_passengers:e.target.value
                            })
                        } } />
                            
                        </div>
                    </div>

                </div>


                <div className='checkout-main-middle' >

                    <div className='checkout-det' >

                        <img src={ SiteDetail.site_images[0].url } className='checkout-det-img' alt="fingtt" />

                        <div className='checkout-det-right' >
                            <div className='checkout-det-right-top' >{SiteDetail.site_name}</div>

                            <div className='checkout-det-right-split' >
                                <GoLocation className='checkout-det-right-split-ic' />
                                {SiteDetail.site_address}
                            </div>

                            { CheckOutDetails.time !== '' ? 
                                <div className='checkout-det-right-split' >
                                    <AiOutlineClockCircle className='checkout-det-right-split-ic' />
                                    {CheckOutDetails.time}
                                </div>
                            : "" }

                            { CheckOutDetails.number_of_passengers !== '' ? 
                                <div className='checkout-det-right-split' >
                                    <BsBookmark className='checkout-det-right-split-ic' />
                                    {CheckOutDetails.number_of_passengers} Passengers
                                </div>
                            : "" }

                        </div>

                    </div>

                    <div className='main-div-form' >
                        <label className='main-div-form-label' >Card Number</label>
                        <input className='main-div-form-input' placeholder='e.g 3457 8674 8765 6765' type={"text"} value={CheckOutDetails.card_number} onChange={ (e) => {
                            setCheckOutDetails({
                                ...CheckOutDetails,
                                card_number:e.target.value
                            })
                        } } />
                    </div>


                    <div style={{
                        display:"flex",
                        justifyContent:"space-between"
                    }} >
                        <div style={{
                            width:"40%"
                        }} >
                            <div className='main-div-form' >
                                <label className='main-div-form-label' >Exp. date</label>
                                <input className='main-div-form-input' placeholder='' type={"text"} value={CheckOutDetails.exp_date} onChange={ (e) => {
                            setCheckOutDetails({
                                ...CheckOutDetails,
                                exp_date:e.target.value
                            })
                        } } />
                            </div>
                        </div>

                        <div style={{
                            width:"40%"
                        }} >
                            <div className='main-div-form' >
                                <label className='main-div-form-label' >CVV</label>
                                <input className='main-div-form-input' placeholder='' type={"text"} value={CheckOutDetails.cvv} onChange={ (e) => {
                            setCheckOutDetails({
                                ...CheckOutDetails,
                                cvv:e.target.value
                            })
                        } } />
                            </div>
                        </div>
                    </div>

                    <div className='main-div-form' >
                        <label className='main-div-form-label' >Promo Code</label>
                        <input className='main-div-form-input' placeholder='' type={"text"} />
                    </div>

                    <div className='checkoutSlit' >

                        <div className='checkoutSlit-left' >Ticket</div>
                        <div className='checkoutSlit-right' > <span className='checkoutSlit-right-span' >({`${CheckOutDetails.number_of_passengers} Passengers`})</span>₦{new Intl.NumberFormat().format(CheckOutDetails.number_of_passengers * SiteDetail.site_price)}</div>

                    </div>

                    <div className='checkoutSlit' >

                        <div className='checkoutSlit-left' >Promo code</div>
                        <div className='checkoutSlit-right' >-</div>

                    </div>

                    <div className='checkoutSlit' style={{
                        borderTop:"1px solid lightgray",
                        paddingTop:"10px"
                    }} >

                        <div className='checkoutSlit-left' >Total</div>
                        <div className='checkoutSlit-right' >₦{new Intl.NumberFormat().format(CheckOutDetails.number_of_passengers * SiteDetail.site_price)}</div>

                    </div>

                    <button className='main-div-form-submit' onClick={ () => {
                        console.log(CheckOutDetails)
                        HandleCheckoutSubmit()
                    } } >
                        { BtnisLoading ? <Spinner text="" className="btn_dots" /> : "Book Order"}
                    </button>

                </div>

            </div>
        
        
        </>
    }


    return(

        <>
            <HeaderDiv/>
            
            {Content}

            <FooterDiv/>

        </>

    )

}