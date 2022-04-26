import React from 'react';
import ProfileCard from './ProfileCard';
import { useState, useEffect } from "react";
import axios from "axios";
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box } from "@mui/material";

function PopularActors(props){

    const [userData,setUserData]=useState([]);
    const URL = "http://ec2-3-19-241-187.us-east-2.compute.amazonaws.com:8000/api/peopleTopTenMostPopular/";
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
    <Box sx={{m: '3em', boxShadow:3}} height='22vh '>
    <ScrollMenu>
    {userData.map((data,id)=>{
return <ProfileCard
key={ data.person_id }
imgUrl={ imageURL + data.profile_path }
name={ data.name }
designation={ data.known_for_department }
birthday={data.birthday}
place={ data.place_of_birth }
/>
})}
</ScrollMenu>
  </Box>
);





}

export default PopularActors;