import React, { useState } from "react";
import { Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";

import { MovieTopTenMostPopular } from "./components/MovieTopTenMostPopular";
import { MovieTrendsVsYear } from "./components/MovieTrendsVsYear";
import { ActorGenreVsAvgRevenue } from "./components/ActorGenreVsAvgRevenue";
import { MovieGenreVsBudgetVsRating } from "./components/MovieGenreVsBudgetVsRating";
import { Comparison } from "./components/Comparison";
import { MovieGenreVsAvgRevenueVsRuntime } from "./components/MovieGenreVsAvgRevenueVsRuntime";
import { MovieLanguageVsAvgBudgetVsAvgRevenue } from "./components/MovieLanguageVsAvgBudgetVsAvgRevenue";

import { PeopleTopTenMostPopular } from "./components/PeopleTopTenMostPopular";
import { PeopleDepartmentCount } from "./components/PeopleDepartmentCount";
import { PeopleGenderCount } from "./components/PeopleGenderCount";

import { TopChartsHolder } from "./components/TopChartsHolder";
import { About } from "./components/About";

const drawerWidth = window.innerWidth / 5;

export const Home = () => {
  const graphList = [
    "Movie Trends vs. Year",
    "Movie Top Ten Most Popular",
    "Average Revenue of Popular Actors by Genre",
    "Movie Genre vs. Budget vs. Rating",
    "Actor Correlation",
    "Movie Genre vs. Average Revenue vs. Runtime",
    "Impact of Language on Popularity, Budget and Revenue",
    "People Top Ten Most Popular",
    "People Department Count",
    "People Gender Distribution",
    "Top Charts",
  ];
  const componentList = [
    <MovieTrendsVsYear />,
    <MovieTopTenMostPopular />,
    <ActorGenreVsAvgRevenue />,
    <MovieGenreVsBudgetVsRating />,
    <Comparison />,
    <MovieGenreVsAvgRevenueVsRuntime />,
    <MovieLanguageVsAvgBudgetVsAvgRevenue />,
    <PeopleTopTenMostPopular />,
    <PeopleDepartmentCount />,
    <PeopleGenderCount />,
    <TopChartsHolder />,
  ];

  const fadeTime = 200;

  const theme = useTheme();
  const [displayGraph, setDisplayGraph] = useState(-1);

  const boxColor = "#135DA8";

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: boxColor,
            color: "white",
            width: drawerWidth,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            background: boxColor,
            height: window.innerHeight / 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            m: "10px",
          }}
        >
          <Typography
            onClick={()=>(setDisplayGraph(-1))}
            style={{cursor: 'pointer'}}
            sx={{ fontWeight: "bold", color: "white" }}
            variant="h4"
            noWrap
            component="div"
          >
            MoViz
          </Typography>
        </Box>

        <List sx={{ width: drawerWidth }}>
          {graphList.map((text, index) => (
            <>
              <ListItemButton
                sx={{
                  mx: "10px",
                  borderRadius: "10px",
                  background: displayGraph === index ? "#1773CF" : boxColor,
                  color: displayGraph === index ? "white" : "#D6D6D6",
                }}
                onClick={() => {
                  setDisplayGraph(index);
                }}
                key={text}
              >
                <ListItemText primary={text} />
              </ListItemButton>
              {index === 6 && <Divider sx={{ borderBottomWidth: 2 }} />}
            </>
          ))}

        <ListItemButton sx={{
                mx: '10px',
                borderRadius: '10px',
                background: boxColor,
                color: '#D6D6D6',
              }}><ListItemText><a style={{textDecoration:'none'}} href='/Network.html'>Network Graph</a></ListItemText></ListItemButton>
        </List>
      </Drawer>

      {/* <AppBar
        sx={{
          background: 'white',
          width: `calc(100% - ${drawerWidth}px)`,
          height: window.innerHeight / 10,
          zIndex: theme.zIndex.drawer + 1,
        }}
        position="fixed"
      >
        <Toolbar
          sx={{
            // marginLeft: drawerWidth/40,
            height: "100%",
          }}
        >
          <Typography style={{marginRight:30}} variant="h4" noWrap component="div">
            MoViz
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => (
              <Link href="#"
                onClick={() => {
                  setDisplayPage(index + 1);
                }}
                key={page}
                sx={{ mx:2, my: 2, color: 'white', display: 'block', 
                    '&:hover': {
                      color: '#000',
                      textDecoration: 'none'
                    },
                }}
              >
                {page}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar> */}

      <Box
        component="main"
        sx={{
          background: "#eaedf2",
          height: "fit-content",
          marginLeft: `${drawerWidth}px`,
          flexGrow: 1,
          p: 3,
        }}
      >
        {displayGraph===-1 && (
          <Fade timeout={fadeTime} in={displayGraph === -1}>
            <div><About/></div>
          </Fade>
        )}
        {componentList.map((component, index) => (
          <>
            {displayGraph === index && (
              <Fade timeout={fadeTime} in={displayGraph === index}>
                <div>{component}</div>
              </Fade>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};
