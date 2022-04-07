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
import { RevenueGenreTime } from "./components/RevenueGenreTime";
import { AvgRevenueActorGenre } from "./components/AvgRevenueActorGenre";
import { MovieGenreAvgPopularityVsYear } from "./components/MovieGenreAvgPopularityVsYear";

import { MovieCountVsYear } from "./components/MovieCountVsYear";
import { MovieTotalRevenueVsYear } from "./components/MovieTotalRevenueVsYear";
import { MovieAvgRevenueVsYear } from "./components/MovieAvgRevenueVsYear";
import { MovieTotalBudgetVsYear } from "./components/MovieTotalBudgetVsYear";
import { MovieAvgBudgetVsYear } from "./components/MovieAvgBudgetVsYear";
import { ActorGenderCount } from "./components/ActorGenderCount";
import { PeopleGenderCount } from "./components/PeopleGenderCount";

import { BudgetRatingGenre } from "./components/BudgetRatingGenre";
import { CompHolder } from "./components/CompHolder";
import { DurationVsRevenueGraph } from "./components/DurationVsRevenueGraph";
import { LanguageRevenueBudgetPopularity } from "./components/LanguageRevenueBudgetPopularity";

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
    "Movie Count vs. Year",
    "Movie Total Revenue vs. Year",
    "Movie Average Revenue vs. Year",
    "Movie Total Budget vs. Year",
    "Movie Average Budget vs. Year",
    "Actor Gender Distribution",
    "People Gender Distribution",
  ];

  const graphList = [
    "Movie Genre vs. Revenue vs. Year",
    "Movie Genre Average Popularity vs. Year",
    "Average Revenue of Actors by Genre",
    "Movie Budget vs. Rating vs. Genre",
    "Actor Correlation for Average Revenue by Genre",
    "Average Revenue vs. Movie Runtime",
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
        {displayGraph === 0 && <RevenueGenreTime />}
        {displayGraph === 1 && <MovieGenreAvgPopularityVsYear />}
        {displayGraph === 2 && <AvgRevenueActorGenre />}
        {displayGraph === 3 && <BudgetRatingGenre />}
        {displayGraph === 4 && <CompHolder />}
        {displayGraph === 5 && <DurationVsRevenueGraph />}
        {displayGraph === 6 && <LanguageRevenueBudgetPopularity />}

        {displayGraph === 7 && <MovieCountVsYear />}
        {displayGraph === 8 && <MovieTotalRevenueVsYear />}
        {displayGraph === 9 && <MovieAvgRevenueVsYear />}
        {displayGraph === 10 && <MovieTotalBudgetVsYear />}
        {displayGraph === 11 && <MovieAvgBudgetVsYear />}
        {displayGraph === 12 && <ActorGenderCount />}
        {displayGraph === 13 && <PeopleGenderCount />}
      </Box>
    </Box>
  );
};
