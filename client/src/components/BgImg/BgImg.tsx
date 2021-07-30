import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import bgImg from '../../Images/Sign_BG_image.png';

const BgImg = (): JSX.Element => {
  return (
    <Grid item xs={12} sm={8} md={6} elevation={0} component={Paper}>
      <img src={bgImg} style={{ height: '100%' }} />
    </Grid>
  );
};

export default BgImg;
