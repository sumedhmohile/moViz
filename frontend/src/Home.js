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
import { MovieTopTenMostPopular } from "./components/MovieTopTenMostPopular";
import { MovieTrendsVsYear } from "./components/MovieTrendsVsYear";
import { ActorGenreVsAvgRevenue } from "./components/ActorGenreVsAvgRevenue";
import { MovieGenreVsBudgetVsRating } from "./components/MovieGenreVsBudgetVsRating";
import { Comparison } from "./components/Comparison";
import { MovieGenreVsAvgRevenueVsRuntime } from "./components/MovieGenreVsAvgRevenueVsRuntime";
import { LanguageRevenueBudgetPopularity } from "./components/LanguageRevenueBudgetPopularity";

import { PeopleTopTenMostPopular } from "./components/PeopleTopTenMostPopular";
import { PeopleDepartmentCount } from "./components/PeopleDepartmentCount";
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
    "People Top Ten Most Popular",
    "People Department Count",
    "People Gender Distribution",
  ];

  const graphList = [
    "Movie Top Ten Most Popular",
    "Movie Trends vs. Year",
    "Average Revenue of Popular Actors by Genre",
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
                minHeight: window.innerHeight / 10,
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
        {displayGraph === 0 && <MovieTopTenMostPopular />}
        {displayGraph === 1 && <MovieTrendsVsYear />}
        {displayGraph === 2 && <ActorGenreVsAvgRevenue />}
        {displayGraph === 3 && <MovieGenreVsBudgetVsRating />}
        {displayGraph === 4 && <Comparison />}
        {displayGraph === 5 && <MovieGenreVsAvgRevenueVsRuntime />}
        {displayGraph === 6 && <LanguageRevenueBudgetPopularity />}

        {displayGraph === 7 && <PeopleTopTenMostPopular />}
        {displayGraph === 8 && <PeopleDepartmentCount />}
        {displayGraph === 9 && <PeopleGenderCount />}
      </Box>
    </Box>
  );
};
