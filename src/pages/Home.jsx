import Banner from 'components/Banner';
import SlideImage from 'components/SlideImage';
import React from 'react';
import Products from 'components/Products';
import Category from 'components/Category';
import BannerSide from 'components/BannerSide';

export default function Home() {
  return (
    <section className='sectionContents'>
      <BannerSide />
      <SlideImage />
      <Banner />
      <Category />
      <Products />
    </section>
  );
}
