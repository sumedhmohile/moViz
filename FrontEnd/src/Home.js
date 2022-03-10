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

const drawerWidth = window.innerWidth/5;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  marginTop: '30px',
  zIndex: '0',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export const Home = () => {
  const graphList = ['Revenue of Genres vs Time', 'Popularity of Genres vs Time', 'Average Revenue of Actors by Genre']
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
                px: 6,
              }}
            >
              <ListItemText primary={text}/>
            </ListItemButton>
          ))}
        </List>
        <Divider/>
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
      

      <Box component="main" sx={{height:'95vh', marginLeft: drawerWidth/10, flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {displayGraph===0 && <RevenueGenreTime/>}
        {displayGraph===1 && <PopularityByGenreAndYear/>}
        {displayGraph===2 && <AvgRevenueActorGenre/>}
      </Box>


    </Box>
  );
}