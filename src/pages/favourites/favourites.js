import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { HeaderDiv } from '../../components/Header/header';
import './favourites.css';
import addNotification from 'react-push-notification';
import { Link } from 'react-router-dom';
import {Spinner} from 'loading-animations-react';
import FavouriteImg from '../../images/favourite.png';
import AppContext from '../../context/AppContext';
import { FooterDiv } from '../../components/footer/footer';



export const FavouritePage = () => {

    const [ MyFavourites, setMyFavourites ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ btnIsloading, setbtnIsloading ] = useState(false)

    const  { UserBasicDetails } = useContext(AppContext)

    useEffect( () => {

        if ( UserBasicDetails ) {
            setisLoading(true)
            Axios.get('/auth/get_favourite')
                .then( (response) => {
                    // alert("when")
                    setisLoading(false)
                    console.log(response.data)
                    setMyFavourites(response.data)
                } )
                .catch( err => {
                    setisLoading(false)
                    setMyFavourites([])
                    if ( err.response ) {
                            addNotification({
                                title: 'Warning',
                                subtitle:'Something went wrong',
                                message: err.response.data.error_message,
                                theme: 'darkblue',
                                native: true // when using native, your OS will handle theming.
                        })
                    }else{
                        addNotification({
                            title: 'Warning',
                            subtitle:'Something Went Wrong',
                            message: 'Something went wrong while getting your favourites',
                            theme: 'darkblue',
                            native: true // when using native, your OS will handle theming.
                        });
                    }
                } )
        }else{
            setMyFavourites([])
        }

    }, [UserBasicDetails] )

    const HandleRemoveFavourite = (site_id) => {

        setbtnIsloading(true)
        
        Axios.post('/auth/delete_favourite',{site:site_id})
            .then( (response) => {
                Axios.get('/auth/get_favourite')
                .then( (response) => {
                    setbtnIsloading(false)
                    console.log(response.data)
                    setMyFavourites(response.data)
                } )
                .catch( err => {
                    setbtnIsloading(false)
                    setMyFavourites([])
                    if ( err.response ) {
                            addNotification({
                                title: 'Warning',
                                subtitle:'Something went wrong',
                                message: err.response.data.error_message,
                                theme: 'darkblue',
                                native: true // when using native, your OS will handle theming.
                        })
                    }else{
                        addNotification({
                            title: 'Warning',
                            subtitle:'Something Went Wrong',
                            message: 'Something went wrong while removing your favourites',
                            theme: 'darkblue',
                            native: true // when using native, your OS will handle theming.
                        });
                    }
                } )
            } )
            .catch( err => {
                setbtnIsloading(false)
                // setMyFavourites([])
                if ( err.response ) {
                        addNotification({
                            title: 'Warning',
                            subtitle:'Something went wrong',
                            message: err.response.data.error_message,
                            theme: 'darkblue',
                            native: true // when using native, your OS will handle theming.
                    })
                }else{
                    addNotification({
                        title: 'Warning',
                        subtitle:'Something Went Wrong',
                        message: 'Something went wrong while remove from favourites',
                        theme: 'darkblue',
                        native: true // when using native, your OS will handle theming.
                    });
                }
            } )

    }


    let Content;

    if ( isLoading && !MyFavourites ) {
        Content = <Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" className="loading_dots" />
    }
    

    if ( !isLoading && MyFavourites ) {
        Content = <>
        
            <div className='housingDiv' >

                <div className='housingDiv-title' >
                    My Favourite Sites
                </div>

                <div className='housingDiv-subtitle' >
                    Find cities that you want, to make your tour
                    interesting and memorable
                </div>

                <div className='housingDiv-main' style={{
                        display: MyFavourites ?
                            MyFavourites.length > 0 ? "flex" : "block"
                        : "block"
                    }} >

                    { MyFavourites.length > 0 ? MyFavourites.map( (rep,index) => {

                        // var string = "this is a string";
                        var length = 200;
                        var trimmedString = rep.site.site_description.substring(0, length);



                        return <div key={rep.site._id} className='housingDiv-main-div' >
                                    <img className='housingDiv-main-div-img' alt="imagvf" src={rep.site.site_images[0].url} />
                                    <div className='housingDiv-main-div-right' >
                                        <Link className='housingDiv-main-div-right-title' style={{textDecoration:"none",color:"black"}} to={`/detail_page/${rep.site._id}`} >{rep.site.site_name}</Link>
                                        <div className='housingDiv-main-div-right-sub' >{trimmedString}...</div>
                                        <Link className='housingDiv-main-div-right-link' to={`#`} onClick={ () => {
                                            HandleRemoveFavourite(rep.site._id)
                                        } } style={{
                                            backgroundColor:"tomato"
                                        }} > { btnIsloading ? <Spinner text="" className="btn_dots" /> : "Remove from favourite" } </Link>
                                    </div>
                                </div> 
                    } ) : <>
                    
                    <img alt='bgyt' className='favourite-no-img' src={FavouriteImg} />

                    <div className='favourite-text' >No favourite</div>

                    </> }

                </div>

            </div>

        </>
    }

    return (

        <>
            <HeaderDiv/>
            <div className='favourite_herodection' >
                <div className='favourite_herodection-txt' >My Favourite Sites</div>
                {/* <div className='favourite_herodection-txt' ></div> */}
            </div>

            {Content}

            <FooterDiv/>

        </>

    );

}