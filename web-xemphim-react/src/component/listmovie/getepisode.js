import React from 'react';
import './listmovie.css';
import {useEffect, useState} from 'react';
import Slarrow from '../sliderarrow/slarrow'
import ReactPlayer from 'react-player'

const IMG_API = "https://image.tmdb.org/t/p/original/";

const api_key =`?api_key=${process.env.API_KEY}&language=en-US`
const season = 'https://api.themoviedb.org/3/tv/';
const YoutubeUrl = "https://www.youtube-nocookie.com/embed/";

const detailmoive = "https://api.themoviedb.org/3/tv/";
const apitrailer = '/videos';



function Episode ({index,count}) {
    const [countEp, setCount] = useState('');
    useEffect(()=>{
        setCount(count[index])
      },[]);
    return <p>{countEp}</p>
}
export default Episode; 