import React, { useState } from "react";
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
import { MovieGenreVsTotalRevenueVsYear } from "./components/MovieGenreVsTotalRevenueVsYear";
import { MovieGenreVsAvgPopularityVsYear } from "./components/MovieGenreVsAvgPopularityVsYear";
import { AvgRevenueActorGenre } from "./components/AvgRevenueActorGenre";
import { MovieGenreVsBudgetVsRating } from "./components/MovieGenreVsBudgetVsRating";
import { CompHolder } from "./components/CompHolder";
import { MovieGenreVsAvgRevenueVsRuntime } from "./components/MovieGenreVsAvgRevenueVsRuntime";
import { LanguageRevenueBudgetPopularity } from "./components/LanguageRevenueBudgetPopularity";

import { MovieTopTenMostPopular } from "./components/MovieTopTenMostPopular";
import { MovieCountVsYear } from "./components/MovieCountVsYear";
import { MovieTotalRevenueVsYear } from "./components/MovieTotalRevenueVsYear";
import { MovieAvgRevenueVsYear } from "./components/MovieAvgRevenueVsYear";
import { MovieTotalBudgetVsYear } from "./components/MovieTotalBudgetVsYear";
import { MovieAvgBudgetVsYear } from "./components/MovieAvgBudgetVsYear";
import { MovieAvgRuntimeVsYear } from "./components/MovieAvgRuntimeVsYear";
import { PeopleGenderCount } from "./components/PeopleGenderCount";

const drawerWidth = window.innerWidth / 6;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  marginTop: window.innerHeight / 15,
  zIndex: "0",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Home = () => {
  const basicGraphList = [
    "Movie Top Ten Most Popular",
    "Movie Count vs. Year",
    "Movie Total Revenue vs. Year",
    "Movie Average Revenue vs. Year",
    "Movie Total Budget vs. Year",
    "Movie Average Budget vs. Year",
    "Movie Average Runtime vs. Year",
    "People Gender Distribution",
  ];

  const graphList = [
    "Movie Genre vs. Total Revenue vs. Year",
    "Movie Genre vs. Average Popularity vs. Year",
    "Average Revenue of Actors by Genre",
    "Movie Genre vs. Budget vs. Rating",
    "Actor Correlation for Average Revenue by Genre",
    "Movie Genre vs. Average Revenue vs. Runtime",
    "Impact of Language on Popularity, Budget and Revenue",
  ];

  const theme = useTheme();
  const [displayGraph, setDisplayGraph] = useState(0);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer variant="permanent">
        <DrawerHeader />
        <List sx={{ width: drawerWidth }}>
          {graphList.map((text, index) => (
            <ListItemButton
              onClick={() => {
                setDisplayGraph(index);
              }}
              key={text}
              sx={{
                minHeight: window.innerHiehgt / 10,
                justifyContent: "initial",
                px: window.innerWidth / 400,
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
        <Divider />

        <List sx={{ width: drawerWidth }}>
          {basicGraphList.map((text, index) => (
            <ListItemButton
              onClick={() => {
                setDisplayGraph(index + graphList.length);
              }}
              key={text}
              sx={{
                minHeight: window.innerHeight / 10,
                justifyContent: "initial",
                px: window.innerWidth / 400,
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <AppBar
        sx={{
          height: window.innerHeight / 10,
          zIndex: theme.zIndex.drawer + 1,
        }}
        position="fixed"
      >
        <Toolbar
          sx={{
            // marginLeft: drawerWidth/40,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" noWrap component="div">
            MoViz
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          height: "95vh",
          marginLeft: window.innerWidth / 45,
          flexGrow: 1,
          p: 3,
        }}
      >
        <DrawerHeader />
        {displayGraph === 0 && <MovieGenreVsTotalRevenueVsYear />}
        {displayGraph === 1 && <MovieGenreVsAvgPopularityVsYear />}
        {displayGraph === 2 && <AvgRevenueActorGenre />}
        {displayGraph === 3 && <MovieGenreVsBudgetVsRating />}
        {displayGraph === 4 && <CompHolder />}
        {displayGraph === 5 && <MovieGenreVsAvgRevenueVsRuntime />}
        {displayGraph === 6 && <LanguageRevenueBudgetPopularity />}

        {displayGraph === 7 && <MovieTopTenMostPopular />}
        {displayGraph === 8 && <MovieCountVsYear />}
        {displayGraph === 9 && <MovieTotalRevenueVsYear />}
        {displayGraph === 10 && <MovieAvgRevenueVsYear />}
        {displayGraph === 11 && <MovieTotalBudgetVsYear />}
        {displayGraph === 12 && <MovieAvgBudgetVsYear />}
        {displayGraph === 13 && <MovieAvgRuntimeVsYear />}
        {displayGraph === 14 && <PeopleGenderCount />}
      </Box>
    </Box>
  );
};
