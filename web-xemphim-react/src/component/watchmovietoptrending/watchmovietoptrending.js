import { useLocation } from 'react-router-dom';
import './watchmovietoptrending.css';
import ReactPlayer from 'react-player';
import {useEffect, useState} from 'react';

const api_key =`?api_key=${process.env.API_KEY}&language=en-US`
const detailmoive = "https://api.themoviedb.org/3/movie/";

function WatchMovie(){
    const {state}  = useLocation();
    const [Detailtv,setDetailtv] = useState([])
    const [trailer,settrailer] = useState('')
    useEffect(()=>{
        fetch(detailmoive+state.id+api_key).then((res)=>res.json())
        .then((data) =>{
            setDetailtv(data)
        });    
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

    useEffect(()=>{
    fetch(detailmoive+state.id+'/videos'+api_key).then((res)=>res.json())
    .then((data) =>{
        if (Array.isArray(data.results) && data.results.length)
        {
            settrailer(data.results.at(-1).key)
        }
        else
        {
            settrailer("iik25wqIuFo");
        }
    });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function takeyeardetail(string)
    {
        if(string)
        {
            const date = string.split('-')
            return date[2] + '-' + date[1] + '-' + date[0]
        }
        return 'Undefined'
    }

    function getlang (arr)
    {
        for( var i = 0; i<arr.length;i++)
        {
            if(arr[i].english_name === 'ENGLISH' || arr[i].english_name === 'English' || arr[i].english_name === 'english')
            {
                return 'ENGLISH'
            }
        }
        return (arr[0].english_name ? arr[0].english_name :'Undefined')
    }

    function scrollToTopmovietrending(){
        document.body.scrollTop = 100;
        document.documentElement.scrollTop = 100;
    };

    scrollToTopmovietrending()
    return(
        <div className="watch-movie">
            <div className="watch-movie-cover">
                <div className="watch-movie-play">
                <iframe className="custom-video-watch-movie" src={'https://www.2embed.ru/embed/tmdb/movie?id='+state.id} frameBorder="0" allowFullScreen title="Movie" aria-hidden="true"/>
                </div>
                <div className='modal-heading-name-toptreding'>
                    <span>
                        {state.name}
                    </span>
                </div>
                <div className='modal-infor-toptreding'>
                    <div className='modal-overview'>
                        <div className='modal-score-count'>
                            <div className='modal-see'>
                                <i class="far fa-eye heading-time-year-icon-see"></i>
                                <span>{state.view}</span>
                            </div>
                            <div className='modal-score'>
                                <i class="fas fa-star"></i>
                                <span>{state.point}</span>
                            </div>
                        </div>
                        <div className='modal-year'>
                            <div className='modal-date'>
                                <span>{takeyeardetail(state.date)}</span>
                            </div>
                            <div className='modal-coutry'>
                                <span>{state.language}</span>
                            </div>
                            <div className='modal-season'>
                                <span>{Detailtv.runtime} Min</span>
                            </div>
                            <div className='modal-language'>
                                <span>{Detailtv.spoken_languages && Detailtv.spoken_languages.length>0? getlang(Detailtv.spoken_languages) : 'Undefined'}</span>
                            </div>
                        </div>
                        <div className='modal-type'>
                        {(Detailtv.genres || Detailtv.genres !=null)? 
                                                Detailtv.genres.map(
                                                    (key,index) => {
                                                        return(
                                                            <span>{key.name} </span>
                                                        )
                                                    }
                                                )
                                            :'' 
                        }
                        </div>
                        <div className='modal-overview'>
                            <p>{state.overview}</p>
                        </div>
                        <div className='modal-trailer-toptreding'>
                            <div className='heading-trailer'>
                                Trailer
                            </div>
                            <div className='show-trailer'>
                                <ReactPlayer url={'https://www.youtube.com/embed/'+trailer}  controls={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchMovie;