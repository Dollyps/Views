import { HeaderDiv } from "../../components/Header/header";
import './detailPage.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image1 from '../../images/pexels-the-world-hopper-1851481.jpg';
import {AiFillStar,AiOutlineHeart} from 'react-icons/ai';
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {Spinner} from 'loading-animations-react';
import addNotification from 'react-push-notification';
import AppContext from "../../context/AppContext";
import { FooterDiv } from "../../components/footer/footer";

export const HotelPage = () => {

    const review = [
        1,1,1,1
    ]

    const {hotel_id} = useParams()

    const [ SiteDetail, setSiteDetail ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ switxhBtm, setswitxhBtm ] = useState(false)
    const { UserBasicDetails } = useContext(AppContext)

    useEffect( () => {
        setisLoading(true)
        axios.get(`/auth/get_hotels/${hotel_id}`)
            .then( (response) => {
                setSiteDetail(response.data)
                console.log(response.data)
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

    }, [hotel_id] )


    let Content;

    if ( isLoading && !SiteDetail ) {
        Content = <Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" className="loading_dots" />
    }

    if ( !isLoading && SiteDetail ) {
        Content = <main className="detailPage" >

        <div className="detailPage-main" >
            <div className="detailPage-main-left" >
                <Carousel showThumbs={false} className="beautiful_in_life">
                    
                    { SiteDetail.hotel_images.map( (imgs, index) => {
                            return <img src={imgs.url} key={index} alt="nss6t" className="detailPage-main-left-img" />
                    } ) }

                </Carousel>
            </div>
            <div className="detailPage-main-left-right" >

                <div>
                    <div className="detailPage-main-left-right-top" >
                        {SiteDetail.hotel_name}
                    </div>

                    <div className="detailPage-main-left-right-rate" >
                        <AiFillStar className="detailPage-main-left-right-rate-ic" />
                        <AiFillStar className="detailPage-main-left-right-rate-ic" />
                        <AiFillStar className="detailPage-main-left-right-rate-ic" />
                        <AiFillStar className="detailPage-main-left-right-rate-ic" />
                        <AiFillStar className="detailPage-main-left-right-rate-ic" />
                        {/* 4.5 */}
                    </div>
                </div>

                <div className="detailPage-main-left-right-desc" >
                    { SiteDetail.hotel_description }
                </div>

                <div className="detailPage-main-left-right-det" >

                    <div className="detailPage-main-left-right-det-ma" >
                        <div className="detailPage-main-left-right-det-ma-top" >Duration</div>
                        <div className="detailPage-main-left-right-det-ma-btm" >{SiteDetail.hotel_duration}</div>
                    </div>

                    <div className="detailPage-main-left-right-det-ma" >
                        <div className="detailPage-main-left-right-det-ma-top" >Price</div>
                        <div className="detailPage-main-left-right-det-ma-btm" >₦{new Intl.NumberFormat().format(SiteDetail.hotel_price)}</div>
                    </div>

                    <div className="detailPage-main-left-right-det-ma" >
                        <div className="detailPage-main-left-right-det-ma-top" >Age</div>
                        <div className="detailPage-main-left-right-det-ma-btm" >Per Night</div>
                    </div>

                </div>

                <div className="detailPage-main-left-right-action" >
                    <Link to={ UserBasicDetails ? `/check_out_hotel/${SiteDetail._id}` : '#' } onClick={ UserBasicDetails ? () => {} : () => {alert('You need to be authenticated')} } className="detailPage-main-left-right-action-left" >
                        {/* { btnisLoading ?  : "Book" } */}
                        Book Hotel
                    </Link>
                </div>

            </div>
        </div>

        <div className="detailPage-main" style={{
            marginTop:"20px",
            display:"block"
        }} >

            <div className="detailPage-sub-top" >
                <div className="detailPage-sub-top-links" onClick={ () => {
                    setswitxhBtm(true)
                } } >Reviews</div>
                <div className="detailPage-sub-top-links" onClick={ () => {
                    setswitxhBtm(false)
                } } >Cruise Route</div>
            </div>

            <div className="detailPage-sub-main" >
                
                { !switxhBtm ? <img className="detailPage-sub-img" alt="dami" src={ SiteDetail.hotel_map.url } /> :
                
                
                    review.map( (rev,index) => {
                        return <div className="detailPage-sub-review" key={index} >

                        <img src={Image1} alt="nhu" className="detailPage-sub-review-left" />

                        <div className="detailPage-sub-review-right" >

                            <div className="detailPage-sub-review-right-name" >Afolabi Damilare</div>
                            <div className="detailPage-sub-review-right-rate" >
                                <AiFillStar className="detailPage-sub-review-right-rate-ic" />
                                <AiFillStar className="detailPage-sub-review-right-rate-ic" />
                                <AiFillStar className="detailPage-sub-review-right-rate-ic" />
                                <AiFillStar className="detailPage-sub-review-right-rate-ic" />
                                <AiFillStar className="detailPage-sub-review-right-rate-ic" />
                            </div>

                            <div className="detailPage-sub-review-right-rev" >
                                eaque ipsa quae ab illo inventore 
                                veritatis et quasi architecto beatae vitae dicta sunt 
                                explicabo. Nemo enim ipsam voluptatem quia voluptas 
                                sit aspernatur aut odit aut fugit, sed quia 
                                consequuntur magni dolores eos qui ratione 
                                voluptatem sequi nesciunt. Neque porro quisquam 
                                est, qui dolorem ipsum quia dolor
                            </div>

                        </div>

                    </div>
                        } )

                }

            </div>

        </div>

    </main>
    }

    return (

        <>
            <HeaderDiv/>

            {Content}

            <FooterDiv/>

        </>

    );

}