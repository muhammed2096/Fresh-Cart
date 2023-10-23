import React, { useContext } from 'react';
import { tokenContext } from '../../Context/tokenContext';
import FeatureProducts from '../FeatureProducts/FeatureProducts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';

function Home(){

  let {token} = useContext(tokenContext)
 
  return(
    <>
     <div className="py-3">
      <MainSlider/>
      <CategoriesSlider/>
   <FeatureProducts/>
  </div>
 
    </>
   
  )
};
  




export default Home;
