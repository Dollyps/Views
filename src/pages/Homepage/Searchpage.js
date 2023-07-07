import './homepage.css';
import { HeaderDiv } from "../../components/Header/header"
import {RiSearchFill} from 'react-icons/ri';
import ImageIt from '../../images/search.png';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import {Spinner} from 'loading-animations-react';
import { FooterDiv } from '../../components/footer/footer';

export const SearchPageDiv = () => {


    const {search_query} = useParams()

    const [ isLoading, setisLoading ] = useState(false)
    const [ LoadedSites,setLoadedSites ] = useState(null)
    // const []
    const [ SearchQuery, setSearchQuery ] = useState('')

    

    useEffect(() => {

        setisLoading(true)

        Axios.get(`/auth/normal_get?search=${search_query}`)
            .then( (response) => {

                setLoadedSites(response.data)
                setisLoading(false)
                setSearchQuery(search_query)

            } )
            .catch( (err) => {
                setisLoading(false)
                alert(err.response.data)
            } )
    
        }, [search_query])


    let Content;

    if ( isLoading && !LoadedSites ) {
        Content = <Spinner color1="blue" color2="#fff" textColor="rgba(0,0,0, 0.5)" className="loading_dots" />
    }
    

    if ( !isLoading && LoadedSites ) {
        Content = <>
        
            <div className='homepageSearch' >
                <div className='homepageSearch-main' >
                    <input type={"search"} className="homepageSearch-main-input" placeholder='Search a city...' value={SearchQuery} onChange={ (e) => {
                        setSearchQuery(e.target.value)
                    } } />
                    <Link to={ SearchQuery === '' ? "#" : `/search_page/${SearchQuery}` } >
                        <RiSearchFill className='homepageSearch-main-ic' />
                    </Link>
                </div>
            </div>

            <div className='housingDiv' style={{
                    backgroundColor:"white"
                }} >

                <div className='housingDiv-main' >

                    { LoadedSites.length > 0 ? LoadedSites.map( (rep,index) => {

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

                    } ) : <div style={{
                        display:"block"
                    }} >
                    
                        <img src={ImageIt} alt="n" className='no_result-img' />
                        <div className='no_result-text' >No result found</div>

                    </div> }

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