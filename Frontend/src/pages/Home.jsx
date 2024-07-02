import React from 'react';
import Layout from '../components/Layout';
import Trending from '../components/Trending';
import Recommended from '../components/Recommended';

const HomePage = () => {
return(
  <div>
    <Layout placeholder="Search for Movies and TvSeries..." type="multi"/>
    <Trending/>
    <Recommended/>
  </div>
)
};

export default HomePage;
