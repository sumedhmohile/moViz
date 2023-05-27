import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { ProfileCard } from "./ProfileCard";

export const PopularActors = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/peopleTopTenMostPopular/")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ m: "3em", boxShadow: 3 }} height="22vh">
      <ScrollMenu>
        {userData.map((data) => {
          return (
            <ProfileCard
              key={data.person_id}
              imgUrl={"http://image.tmdb.org/t/p/w500" + data.profile_path}
              name={data.name}
              designation={data.known_for_department}
              birthday={data.birthday}
              place={data.place_of_birth}
            />
          );
        })}
      </ScrollMenu>
    </Box>
  );
};
