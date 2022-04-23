import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { TaggedContentCard } from 'react-ui-cards';

function PopularMovies(props){

    const [userData,setUserData]=useState([]);
    const URL = "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/api/movieTopTenMostPopular/";

    const imageURL = "http://image.tmdb.org/t/p/w500";


useEffect(()=>{
    axios.get(URL)
        .then(res=>{
        console.log(res.data);
setUserData(res.data)
})
.catch(err=>{
    console.log(err);
})
},[])

return (
    <>
    <ScrollMenu>
    {userData.map((data,id)=>{
return <TaggedContentCard
    href={ data.homepage }
    thumbnail={ imageURL + data.poster_path }
    title={ data.title }
    description={"Popularity: " + data.popularity }
    tags={ ["Rating: " + data.vote_average, data.release_date] }
/>
})}
</ScrollMenu>
  </>
);





}

export default PopularMovies;