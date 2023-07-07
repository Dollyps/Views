import './homepage.css';
import { HeaderDiv } from "../../components/Header/header"
import {RiSearchFill} from 'react-icons/ri';
// import ImageIt from '../../images/pexels-jaime-reimer-2662116.jpg'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import {Spinner} from 'loading-animations-react';
import { FooterDiv } from '../../components/footer/footer';

export const HomePageDiv = () => {


    const [ isLoading, setisLoading ] = useState(false)
    const [ LoadedSites,setLoadedSites ] = useState(null)
    const [ LoadedSites2,setLoadedSites2 ] = useState(null)
    const [ LoadedHotels,setLoadedHotels ] = useState(null)
    // const [ LoadedHotels2,setLoadedHotels2 ] = useState(null)
    const [ SearchQuery, setSearchQuery ] = useState('')

    

    useEffect(() => {

        setisLoading(true)

        Axios.get('/auth/get_sites')
            .then( (response) => {

                var weli = []
                setLoadedSites(response.data)
                setisLoading(false)
                for (let k = 0; k < 4; k++) {
                    const element = response.data[k];
                    weli.push(element)
                }

                setLoadedSites2(weli)

            } )
            .catch( (err) => {
                setisLoading(false)
                alert(err.response.data)
            } )

    
        Axios.get('/auth/get_hotels')
            .then( (response) => {
                setLoadedHotels(response.data)
            } )
            .catch( (err) => {
                alert(err.response.data)
            } )
    
        }, [])


        const HandlePag = () => {
            var weli = []
            for (let j = 0; j < LoadedSites.length; j++) {
                const element = LoadedSites[j];
                weli.push(element)
            }

            setLoadedSites2(weli)
        }

        const HandlePag2 = () => {
            var weli = []
            for (let j = 0; j < 4; j++) {
                const element = LoadedSites[j];
                weli.push(element)
            }

            setLoadedSites2(weli)
        }

    let Content;

    if ( isLoading && !LoadedSites ) {
        Content = <Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" className="loading_dots" />
    }
    

    if ( !isLoading && LoadedSites ) {
        Content = <>
        
            <div className='homepageSearch' >
                <div className='homepageSearch-main' >
                    <input type={"search"} className="homepageSearch-main-input" placeholder='Search tourist site...' value={SearchQuery} onChange={ (e) => {
                        setSearchQuery(e.target.value)
                    } } />
                    <Link to={ SearchQuery === '' ? "#" : `/search_page/${SearchQuery}` } >
                        <RiSearchFill className='homepageSearch-main-ic' />
                    </Link>
                </div>
            </div>

            <div className='housingDiv' >

                <div className='housingDiv-title' style={{
                    display:"flex",
                    justifyContent:"space-between"
                }} >
                    Explore Cities
                    <div style={{
                        cursor:"pointer",
                        color:"gray"
                    }} onClick={ LoadedSites2.length < 5 ? () => HandlePag() : () => HandlePag2() } >{LoadedSites2.length < 5 ? "Show More" : "Show Less"}</div>
                </div>

                <div className='housingDiv-subtitle' >
                Find cities that you want, to make your tour
                interesting and memorable
                </div>
                <div className='housingDiv-main' >

                    { LoadedSites2.map( (rep,index) => {

                        // var string = "this is a string";
                        var length = 200;
                        var trimmedString = rep.site_description.substring(0, length);

                            return <div key={rep._id} className='housingDiv-main-div' >
                                    <img className='housingDiv-main-div-img' alt="imagvf" src={rep.site_images[0].url} />
                                    <div className='housingDiv-main-div-right' >
                                        <div className='housingDiv-main-div-right-title' >{rep.site_name}</div>
                                        <div className='housingDiv-main-div-right-sub' >{trimmedString}...</div>
                                        <Link className='housingDiv-main-div-right-link' to={`/detail_page/${rep._id}`} > Read More </Link>
                                    </div>
                                </div> 
            

                    } ) }

                </div>

            </div>

            <div className='housingDiv' style={{
                backgroundColor:"white"
            }} >

                <div className='housingDiv-title' >
                    Explore Hotels
                </div>

                <div className='housingDiv-subtitle' >
                Find cities that you want, to make your tour
                interesting and memorable
                </div>
                <div className='housingDiv-main'  >

                    { LoadedHotels ?  LoadedHotels.map( (rep,index) => {

                        return <div key={index} className='housingDiv-main-div'  >
                                    <img className='housingDiv-main-div-img' alt="imagvf" src={rep.hotel_images[0].url} />
                                    <div className='housingDiv-main-div-right' >
                                        <div className='housingDiv-main-div-right-title' >{rep.hotel_name}</div>
                                        <div className='housingDiv-main-div-right-sub' > {rep.hotel_description} </div>
                                        <Link className='housingDiv-main-div-right-link' to={`/hotel_page/${rep._id}`} > Read More </Link>
                                    </div>
                                </div> 

                    } ) : <></> }

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