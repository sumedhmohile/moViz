import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { RevenueGenreTime } from './Components/RevenueGenreTime';
import { AvgRevenueActorGenre } from './Components/AvgRevenueActorGenre';
import { PopularityByGenreAndYear } from './Components/PopularityByGenreAndYear';

import { MoviesCountVsYear } from './Components/MoviesCountVsYear';
import { MovieRevenueVsYear} from './Components/MovieRevenueVsYear'
import { MovieAvgRevenueVsYear } from './Components/MovieAvgRevenueVsYear';
import { MovieBudgetVsYear } from './Components/MovieBudgetVsYear';
import { MovieAvgBudgetVsYear} from './Components/MovieAvgBudgetVsYear'
import BudgetPopularityGenre from './Components/BudgetPopularityGenre';
import CompHolder from './Components/CompHolder';
import CountByGender from './Components/CountByGender';
import DurationVsRevenueGraph from './Components/DurationVsRevenueGraph';
import LanguageRevenueBudgetPopularity from './Components/LanguageRevenueBudgetPopularity';

const drawerWidth = window.innerWidth/6;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  marginTop: window.innerHeight/15,
  zIndex: '0',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Home = () => {
  const basicGraphList = ['Movie Count by Year', 
  'Movie Total Revenue by Year', 
  'Movie Average Revenue by Year', 
  'Movie Total Budget by Year', 
  'Movie Average Budget by Year',
  'Gender Distribution Of Actors',
  ]
  
  
  const graphList = ['Revenue of Genres vs Time', 
    'Popularity of Genres vs Time', 
    'Average Revenue of Actors by Genre', 
    'Budget vs Rating by Genre', 
    'Actor Correlation For Average Revenue by Genre',
    'Average Revenue vs Movie Runtime',
    'Impact of language on Popularity, Budget and Revenue',
  ]
  const theme = useTheme()

  const [displayGraph, setDisplayGraph] = useState(0)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer  variant="permanent">
        <DrawerHeader/>
        <List sx={{width: drawerWidth}}>
          {graphList.map((text, index) => (
            <ListItemButton
              onClick= {()=>{setDisplayGraph(index)}}
              key={text}
              sx={{
                minHeight: window.innerHiehgt/10,
                justifyContent: 'initial',
                px: window.innerWidth/400,
              }}
            >
              <ListItemText primary={text}/>
            </ListItemButton>
          ))}
        </List>
        <Divider/>

        <List sx={{width: drawerWidth}}>
          {basicGraphList.map((text, index) => (
            <ListItemButton
              onClick= {()=>{setDisplayGraph(index+graphList.length)}}
              key={text}
              sx={{
                minHeight: window.innerHiehgt/10,
                justifyContent: 'initial',
                px: window.innerWidth/400,
              }}
            >
              <ListItemText primary={text}/>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <AppBar sx={{height:window.innerHeight/10, zIndex:theme.zIndex.drawer + 1}} position="fixed">
        <Toolbar 
          sx={{
            // marginLeft: drawerWidth/40,
            height: '100%',
            justifyContent:'center'
          }}
        >
          <Typography variant="h4" noWrap component="div">
            MoViz
          </Typography>
        </Toolbar>
      </AppBar>
      

      <Box component="main" sx={{height:'95vh', marginLeft: window.innerWidth/45, flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {displayGraph===0 && <RevenueGenreTime/>}
        {displayGraph===1 && <PopularityByGenreAndYear/>}
        {displayGraph===2 && <AvgRevenueActorGenre/>}
        {displayGraph===3 && <BudgetPopularityGenre/>}
        {displayGraph===4 && <CompHolder/>}
        {displayGraph===5 && <DurationVsRevenueGraph/>}
        {displayGraph===6 && <LanguageRevenueBudgetPopularity/>}


        {displayGraph===7 && <MoviesCountVsYear/>}
        {displayGraph===8 && <MovieRevenueVsYear/>}
        {displayGraph===9 && <MovieAvgRevenueVsYear/>}
        {displayGraph===10 && <MovieBudgetVsYear/>}
        {displayGraph===11 && <MovieAvgBudgetVsYear/>}
        {displayGraph===12 && <CountByGender/>}
      </Box>

    </Box>
  );
}