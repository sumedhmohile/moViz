import React from 'react'
import { Box } from '@mui/material'
import { Typography } from '@mui/material'

export const About = () => {
  return (
    <Box sx={{background:'white', m: '0', boxShadow:3}} height='90vh '>
        <Typography sx={{fontWeight: 'bold', color:'black'}} variant="h4" noWrap component="div">
            MoViz
        </Typography>
    </Box>
  )
}
