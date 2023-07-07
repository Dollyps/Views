import { Link } from 'react-router-dom';
import './header.css';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import {BiSearchAlt2} from 'react-icons/bi';
import {FaUserAlt} from 'react-icons/fa';
import {RiSearchFill} from 'react-icons/ri';
import {IoCloseSharp} from 'react-icons/io5';
import { useContext, useState } from 'react';
import addNotification from 'react-push-notification';
import axios from 'axios';
import {Spinner} from 'loading-animations-react';
import AppContext from '../../context/AppContext';
import { AiOutlineUser } from 'react-icons/ai';
import {BsBagDash,BsDoorOpen,BsBell} from 'react-icons/bs';
import {MdOutlineHomeRepairService} from 'react-icons/md'
import { TbHelpHexagon } from 'react-icons/tb';
import { FiArrowLeft } from 'react-icons/fi';
import NotificationBell from '../../images/bell.png'
import BookingImg from '../../images/booking.png'



export const HeaderDiv = ({completeOrder}) => {

    const [ openBackDrop, setopenBackDrop ] = useState(false)
    const [ btnIsloading, setbtnIsloading ] = useState(false)
    const [ openBackContent, setopenBackContent ] = useState(null)
    const [ Registerdetails, setRegisterdetails ] = useState({
        full_name:"",
        email:"",
        password:"",
        confirm:"",
    })

    const [ Logindetails, setLogindetails ] = useState({
        email:"",
        password:"",
    })

    const { LoginHandler, UserBasicDetails, LogoutHandler } = useContext(AppContext)

    
    // if ( completeOrder && openBackContent !== 'orders'  ) {
    //     setopenBackDrop(true)
    //     setopenBackContent("orders")
    // }
    

    const HandleRegister = () => {

        if ( Registerdetails.full_name === '' ||
             Registerdetails.email === '' ||
             Registerdetails.confirm === '' ||
             Registerdetails.password === '' ) {
                addNotification({
                    title: 'Warning',
                    subtitle:'Fill the form',
                    message: 'All Fields should be filled',
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
                return
        }



        if (  Registerdetails.confirm !== Registerdetails.password ) {
                addNotification({
                    title: 'Warning',
                    subtitle:'Incorrect Password',
                    message: 'Password and Confirm password should be the same',
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
                return
        }

        setbtnIsloading(true)

        axios.post('/auth/register',{
            full_name:Registerdetails.full_name,
            email:Registerdetails.email,
            password:Registerdetails.password
        }).then( (response) => {
            setbtnIsloading(false)
            setRegisterdetails( {
                full_name:"",
                email:"",
                password:"",
                confirm:"",
            } )
            addNotification({
                title: 'Success',
                subtitle:'Registration Successful',
                message: "You have been successfully registered",
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
            });
            setopenBackContent(null)
            setopenBackDrop(false)
            console.log(response.data)
        } ).catch( err => {
            console.log(err.response.data)
            if ( err.response ) {
                addNotification({
                    title: 'Warning',
                    subtitle:'Something went wrong',
                    message: err.response.data.error_message,
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
            }
            setbtnIsloading(false)
        } )

    }

    const HandleLogin = () => {

        if ( Logindetails.email === '' ||
             Logindetails.password === '' ) {
                addNotification({
                    title: 'Warning',
                    subtitle:'Fill the form',
                    message: 'All Fields should be filled',
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
                return
        }
        setbtnIsloading(true)

        axios.post('/auth/login',{
            email:Logindetails.email,
            password:Logindetails.password
        }).then( (response) => {
            setbtnIsloading(false)
            setLogindetails( {
                email:"",
                password:"",
            } )
            addNotification({
                title: 'Success',
                subtitle:'Login Successful',
                message: "You have been successfully Logged in",
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
            });
            console.log(response.data)
            LoginHandler(response.data)
            setopenBackContent(null)
            setopenBackDrop(false)
        } ).catch( err => {
            console.log(err.response.data)
            if ( err.response ) {
                addNotification({
                    title: 'Warning',
                    subtitle:'Something went wrong',
                    message: err.response.data.error_message,
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
            }
            setbtnIsloading(false)
        } )

    }

    const closeModal = () => {
        setopenBackDrop(false)
        setopenBackContent(null)
    }


    const HeaTrg = ({title}) => {

        return <div className='ProfileDiv-main-top' >

                <FiArrowLeft onClick={ () => {
                    setopenBackContent("profile")
                } } className='ProfileDiv-main-top-ic' /> {title}

            </div>

    }

    return (

        <div className="header-div" >
            
            <Link to="/" className='header-div-logo' >
                Views
            </Link>

            <div className='header-div-right' >

                <Link className='header-div-right-link' to={'/'} >
                    <AiFillHome className='header-div-right-link-ic' />
                    <div>Home</div>
                </Link>

                <Link className='header-div-right-link' >
                    <RiSearchFill className='header-div-right-link-ic' />
                    <div>Search</div>
                </Link>

                <Link className='header-div-right-link' to={"/favourite"} >
                    <AiFillHeart className='header-div-right-link-ic' />
                    <div>Favorite</div>
                </Link>

                <Link className='header-div-right-link' to={"/search_page"} onClick={ () => {
                    setopenBackDrop(true)
                    setopenBackContent( UserBasicDetails ? 'profile' : 'login' )
                } } >
                    <FaUserAlt className='header-div-right-link-ic' />
                    <div>Account</div>
                </Link>

            </div>

            <div className='header-btm' >

                <Link className='header-div-right-link' to={'/'} >
                    <AiFillHome className='header-div-right-link-ic' />
                    <div style={{
                        display:"block"
                    }} >Home</div>
                </Link>

                <Link className='header-div-right-link' >
                    <RiSearchFill className='header-div-right-link-ic' />
                    <div style={{
                        display:"block"
                    }} >Search</div>
                </Link>

                <Link className='header-div-right-link' to={"/favourite"} >
                    <AiFillHeart className='header-div-right-link-ic' />
                    <div style={{
                        display:"block"
                    }} >Favorite</div>
                </Link>

                <Link className='header-div-right-link' to={"#"} onClick={ () => {
                    setopenBackDrop(true)
                    setopenBackContent( UserBasicDetails ? 'profile' : 'login' )
                } } >
                    <FaUserAlt className='header-div-right-link-ic' />
                    <div style={{
                        display:"block"
                    }} >Account</div>
                </Link>

            </div>

            { openBackDrop ? <div className='headerBackdrop' ></div> : <></>  }

            { openBackDrop && openBackContent === 'login' ?
            
                <div className='LoginDiv' >

                    <div className='LoginDiv-top' >Login
                        <IoCloseSharp className="LoginDiv-top-ic" onClick={closeModal} />
                    </div>

                    <div className='main-div-form' >
                        <label className='main-div-form-label' >Email address</label>
                        <input 
                            className='main-div-form-input' 
                            placeholder='e.g fatoki@gmail.com' 
                            type={"text"}
                            value={Logindetails.email}
                            onChange={ (e) => {
                                setLogindetails({
                                    ...Logindetails,
                                    email:e.target.value
                                })
                            } }  />
                    </div>

                    <div className='main-div-form' >
                        <label className='main-div-form-label' >Password</label>
                        <input 
                            className='main-div-form-input' 
                            placeholder='******' 
                            type={"password"}
                            value={Logindetails.password}
                            onChange={ (e) => {
                                setLogindetails({
                                    ...Logindetails,
                                    password:e.target.value
                                })
                            } } />
                    </div>

                    <button className='main-div-form-submit' onClick={HandleLogin} disabled={ btnIsloading } >
                        { btnIsloading ? <Spinner text="" className="btn_dots" /> : "Login" }
                    </button>

                    <Link className='noAccount' to={"#"} onClick={ () => {
                        setopenBackDrop(true)
                        setopenBackContent('register')
                    } } >
                        Don't have an account yet..? Signup here
                    </Link>

                </div>
            
            : <></> }

            { openBackDrop && openBackContent === 'register' ?
            
                <div className='LoginDiv' >

                <div className='LoginDiv-top' >Register
                    <IoCloseSharp className="LoginDiv-top-ic" onClick={closeModal} />
                </div>

                <div className='main-div-form' >
                    <label className='main-div-form-label' >Full Name</label>
                    <input 
                        className='main-div-form-input' 
                        placeholder='e.g Afolabi Damilare' 
                        type={"text"} 
                        value={Registerdetails.full_name}
                        onChange={ (e) => {
                            setRegisterdetails({
                                ...Registerdetails,
                                full_name:e.target.value
                            })
                        } }  />
                </div>

                <div className='main-div-form' >
                    <label className='main-div-form-label' >Email address</label>
                    <input 
                        className='main-div-form-input' 
                        placeholder='e.g fatoki@gmail.com' 
                        type={"email"}
                        value={Registerdetails.email}
                        onChange={ (e) => {
                            setRegisterdetails({
                                ...Registerdetails,
                                email:e.target.value
                            })
                        } }  />
                </div>

                <div className='main-div-form' >
                    <label className='main-div-form-label' >Password</label>
                    <input 
                        className='main-div-form-input' 
                        placeholder='******' 
                        type={"password"}
                        value={Registerdetails.password}
                        onChange={ (e) => {
                            setRegisterdetails({
                                ...Registerdetails,
                                password:e.target.value
                            })
                        } }  />
                </div>

                <div className='main-div-form' >
                    <label className='main-div-form-label' >Confirm Password</label>
                    <input 
                        className='main-div-form-input' 
                        placeholder='******' 
                        type={"password"}
                        value={Registerdetails.confirm}
                        onChange={ (e) => {
                            setRegisterdetails({
                                ...Registerdetails,
                                confirm:e.target.value
                            })
                        } }  />
                </div>

                <button className='main-div-form-submit' onClick={HandleRegister} disabled={ btnIsloading } >
                    { btnIsloading ? <Spinner text="" className="btn_dots" /> : "Register" }
                </button>

                <Link className='noAccount' to={"#"} onClick={ () => {
                        setopenBackDrop(true)
                        setopenBackContent('login')
                    } } >
                    Already have an account..? SignIn here
                </Link>

                </div>
            
            : <></> }

            { openBackDrop && openBackContent === 'profile' ?
            
                <div className='ProfileDiv' >

                    <div className='ProfileDiv-top' >

                        <div className='ProfileDiv-top-left' >
                            <AiOutlineUser className='ProfileDiv-top-left-ic' />
                            <div className='ProfileDiv-top-left-me' >
                                <div className='ProfileDiv-top-left-me-top' >{ UserBasicDetails ? UserBasicDetails.full_name : "" }</div>
                                <div className='ProfileDiv-top-left-me-btm' >{UserBasicDetails ? UserBasicDetails.email : ''}</div>
                            </div>
                        </div>

                        <IoCloseSharp style={{
                            width:"30px",
                            height:"30px"
                        }} className="LoginDiv-top-ic" onClick={closeModal} />

                    </div>
                    
                    <div style={{
                        marginTop:"40px"
                    }} >
                        <Link className='ProfileDiv-link' to="/my_orders" >
                            <BsBagDash className='ProfileDiv-link-ic' />
                            My Orders
                        </Link>

                        <Link className='ProfileDiv-link' to="/my_hotel_orders">
                            <MdOutlineHomeRepairService className='ProfileDiv-link-ic' />
                            My Hotel Orders
                        </Link>

                        <Link className='ProfileDiv-link' to="#" onClick={ () => {
                            setopenBackContent("notifications")
                        } } >
                            <BsBell className='ProfileDiv-link-ic' />
                            Notifications
                        </Link>

                        <Link className='ProfileDiv-link' to="#" onClick={ () => {
                            setopenBackContent("help_center")
                        } } >
                            <TbHelpHexagon className='ProfileDiv-link-ic' />
                            Help Center
                        </Link>

                        <Link className='ProfileDiv-link' to="#" onClick={ () => {
                            LogoutHandler()
                            setopenBackContent(null)
                            setopenBackDrop(false)
                        } } >
                            <BsDoorOpen className='ProfileDiv-link-ic' />
                            Log Out
                        </Link>
                    </div>

                </div>
            
            :<></> }

            { openBackDrop && openBackContent === 'notifications' ?
                
                <div className='ProfileDiv' >

                    <HeaTrg title={"Notifications"} />
                    
                    <img className='notificationImg' alt='nhy' src={NotificationBell} />
                    
                    <div style={{
                        textAlign:"center",
                        fontWeight:"bold"
                    }} >No Notification</div>

                </div>
            
            :<></> }   

            { openBackDrop && openBackContent === 'help_center' ?
                
                <div className='ProfileDiv' >

                    <HeaTrg title={"Help Center"} />
                    
                    <div className='help_center_main' >

                        <div className='help_center_main-top' >Phone Number</div>
                        <div className='help_center_main-btm' >09028060262</div>

                        <div className='help_center_main-top' >Email Address</div>
                        <div className='help_center_main-btm' >views@gmail.com</div>

                        <div className='help_center_main-top' >Instagram</div>
                        <div className='help_center_main-btm' >@Views_ng</div>

                        <div className='help_center_main-top' >Whatsapp</div>
                        <div className='help_center_main-btm' >09028060262</div>

                    </div>

                </div>
            
            :<></> }  


            { openBackDrop && openBackContent === 'main_orders' ?
                
                <div className='ProfileDiv' >

                    <HeaTrg title={"My Orders"} />
                    
                    <img className='notificationImg' alt='nhy' src={BookingImg} />
                    
                    <div style={{
                        textAlign:"center",
                        fontWeight:"bold"
                    }} >No Bookings</div>

                </div>
            
            :<></> }  

        </div>

    );

}