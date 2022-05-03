import React from 'react'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'

export const About = () => {
  return (
    <Box sx={{ background:'white', m: '0', boxShadow:3}} height='90vh '>
        <Typography sx={{pt:'2em', pb:'50px', textAlign:'center', fontWeight: 'bold', background:'white', color:'black', fontFamily: 'Raleway',}} variant="h1" noWrap component="div">
            MoViz
        </Typography>
        <Typography sx={{lineHeight:'2em', mx:'10em'}}>
        With the rate at which new movies are produced and
            released, the race to capture the attention, viewership and
            wallet of today’s audience has never been more competitive.
            Add to this the fact that with streaming media, consumers have
            never been this spoiled for choice. Consequently, for writers
            and production companies, the ability to make data driven
            decisions about writing, casting and production has quickly
            become the need of the hour. However, without the presence of
            an integrated system to allow for the visualization and analysis
            of data about actors, movies and production crew, producers
            are often forced to rely on scripts which may not connect
            with the audience, casting decisions that don’t account for
            working chemistry between actors, and production crews that
            don’t always get along.
        </Typography>
        <Typography sx={{lineHeight:'2em', mt:'10px', mx:'10em'}}>
            This project aims to provide a solution to exactly this
            problem by aggregating, visualizing and analyzing data about
            movies, actors and crew to provide insights into how different
            factors play into the success, popularity and commercial
            viability of a movie.
            The target users of the system are:
        </Typography>
        <Typography sx={{mt:'10px', textAlign:'center'}}>
            1) Producers, who want to know how successful their
            movies could be given the genres, cast, crew, etc.
        </Typography>
        <Typography sx={{textAlign:'center'}}>
            2) Writers, who want to write data driven scripts based on
            the success of different actors in certain genres.
        </Typography>
        <Typography sx={{textAlign:'center'}}>
            3) Analysts, who want to understand and visualize the
            performance and characteristics of movies over time.
        </Typography>
    </Box>
  )
}
