import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { TaggedContentCard } from "react-ui-cards";

export const PopularMovies = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/movieTopTenMostPopular/")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ m: "3em", boxShadow: 3 }} height="28vh">
      <ScrollMenu>
        {userData.map((data) => {
          return (
            <TaggedContentCard
              href={data.homepage}
              thumbnail={"http://image.tmdb.org/t/p/w500" + data.poster_path}
              title={data.title}
              description={"Popularity: " + data.popularity}
              tags={["Rating: " + data.vote_average, data.release_date]}
            />
          );
        })}
      </ScrollMenu>
    </Box>
  );
};
