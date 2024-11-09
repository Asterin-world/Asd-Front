import React from 'react';
import BannerSlider from '../components/BannerSlider/BannerSlider';
import CollectionComponent from '../components/CollectionComponent';
import PopularChoice from '../components/PopularChoice';
import { CollectionProvider } from './../hooks/CollectionContext';
import { ProductProvider } from '../hooks/ProductContext';
import AtService from '../components/AtService';
import GoldSilverBanner from '../components/goldSilverBanner';
import VisionAndInsights from '../components/VisionAndInsight';
import TestimonialsBanner from '../components/TestimonialsBanner';

const Home = () => {
  return (
    <CollectionProvider>
      <>
        {/* <Header /> */}
        <main>
          <BannerSlider />
          {/* <section className="text-center my-10">
            <h1 className="text-4xl font-bold">A Classic Elegance Gift</h1>
            <p className="mt-4 text-lg text-gray-600">
              A classic diamond gift embodies timeless elegance, making every occasion special.
            </p>
          </section> */}
          {/* Men’s Collection Section */}
          <CollectionComponent collectionCategory="mens" collectionTitle="MEN’S COLLECTION" collectionType="mensCollection" />

          {/* Women’s Collection Section */}
          <CollectionComponent collectionCategory="womens" collectionTitle="WOMEN’S COLLECTION" collectionType="womensCollection" />
          <div style={{ backgroundColor: '#f8f8f8', padding: '20px' }} >
            <ProductProvider>
              <PopularChoice />
            </ProductProvider>
          </div>
          <AtService />
          <GoldSilverBanner />
          <VisionAndInsights />
          <div style={{ backgroundColor: '#f8f8f8', padding: '20px' }} >
            <TestimonialsBanner />
          </div>
        </main>
        {/* <Footer /> */}
      </>
    </CollectionProvider>
  );
};

export default Home;
