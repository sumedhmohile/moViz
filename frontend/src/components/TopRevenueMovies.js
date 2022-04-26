import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { TaggedContentCard } from 'react-ui-cards';
import { Box } from "@mui/material";

function TopRevenueMovies(props){

    const [userData,setUserData]=useState([]);
    const URL = "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/api/movieTopTenByRevenue/";
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
    <Box sx={{m: '3em', boxShadow:3}} height='28vh '>
    <ScrollMenu>
    {userData.map((data,id)=>{
return <TaggedContentCard
    href={ data.homepage }
    thumbnail={ imageURL + data.poster_path }
    title={ data.title }
    description={ "Revenue: $" + data.revenue }
    tags={ ["Rating: " + data.vote_average, data.release_date] }
/>
})}
</ScrollMenu>
  </Box>
);





}

export default TopRevenueMovies;