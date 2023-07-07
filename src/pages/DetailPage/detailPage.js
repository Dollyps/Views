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

export const DetailPage = () => {

    const review = [
        1,1,1,1
    ]

    const {site_id} = useParams()

    const [ SiteDetail, setSiteDetail ] = useState(null)
    const [ isLoading, setisLoading ] = useState(false)
    const [ btnisLoading, setbtnisLoading ] = useState(false)
    const [ switxhBtm, setswitxhBtm ] = useState(false)
    const { UserBasicDetails } = useContext(AppContext)
    // const imageT

    useEffect( () => {
        setisLoading(true)
        axios.get(`/auth/get_sites/${site_id}`)
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

    }, [site_id] )


    const HandleAddtoFav = () => {

        setbtnisLoading(true)

        axios.post('/auth/add_favourite',{site:site_id})
            .then( (response) => {
                setbtnisLoading(false)
                addNotification({
                    title: 'Success',
                    subtitle:'Site Added',
                    message:"You ve added this site as one of your favourite",
                    theme: 'darkblue',
                    native: true // when using native, your OS will handle theming.
                });
            } )
            .catch( err => {
                setbtnisLoading(false)
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
                setbtnisLoading(false)
            } )

    }
    

    let Content;

    if ( isLoading && !SiteDetail ) {
        Content = <Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" className="loading_dots" />
    }

    if ( !isLoading && SiteDetail ) {
        Content = <main className="detailPage" >

        <div className="detailPage-main" >
            <div className="detailPage-main-left" >
                <Carousel showThumbs={false} className="beautiful_in_life">
                    
                    { SiteDetail.site_images.map( (imgs, index) => {
                            return <img src={imgs.url} key={index} alt="nss6t" className="detailPage-main-left-img" />
                    } ) }

                </Carousel>
            </div>
            <div className="detailPage-main-left-right" >

                <div>
                    <div className="detailPage-main-left-right-top" >
                        {SiteDetail.site_name}
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
                    { SiteDetail.site_description }
                </div>

                <div className="detailPage-main-left-right-det" >

                    <div className="detailPage-main-left-right-det-ma" >
                        <div className="detailPage-main-left-right-det-ma-top" >Duration</div>
                        <div className="detailPage-main-left-right-det-ma-btm" >{SiteDetail.site_duration}H</div>
                    </div>

                    <div className="detailPage-main-left-right-det-ma" >
                        <div className="detailPage-main-left-right-det-ma-top" >Price</div>
                        <div className="detailPage-main-left-right-det-ma-btm" >₦{new Intl.NumberFormat().format(SiteDetail.site_price)}</div>
                    </div>

                    <div className="detailPage-main-left-right-det-ma" >
                        <div className="detailPage-main-left-right-det-ma-top" >Age</div>
                        <div className="detailPage-main-left-right-det-ma-btm" >14+</div>
                    </div>

                </div>

                <div className="detailPage-main-left-right-action" >
                    <Link to={ UserBasicDetails ? `/check_out/${SiteDetail._id}` : '#' } onClick={ UserBasicDetails ? () => {} : () => {alert('You need to be authenticated')} } className="detailPage-main-left-right-action-left" >
                        {/* { btnisLoading ?  : "Book" } */}
                        Book
                    </Link>
                    <button onClick={ HandleAddtoFav } className="detailPage-main-left-right-action-left-right"  >
                        { btnisLoading ? <Spinner text="" className="btn_dots" /> : <AiOutlineHeart className="detailPage-main-left-right-action-left-right-ic" /> }
                    </button>
                </div>

            </div>
        </div>

        <div className="detailPage-sub" >
            
            <div className="detailPage-sub-top" >Site Images</div>
            <div className="detailPage-sub-collect" >

                { SiteDetail.site_images.map( (ing,index) => {
                return <img className="detailPage-sub-collect-img" alt="mj" src={ing.url} key={index} /> 
                } ) }

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
                
                { !switxhBtm ? <img className="detailPage-sub-img" alt="dami" src={ SiteDetail.site_map.url } /> :
                
                
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