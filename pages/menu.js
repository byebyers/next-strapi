import {useState, useEffect, useContext} from 'react';
import Layout from '@/components/layout'
import Header from '@/components/header'
import Footer from '@/components/footer'
import FancyLink from '@/components/fancyLink'
import Sections from '@/components/sections';
import { fade, revealDelay, fadeDelay, reveal, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { fetchAPI } from "../lib/api"
import { useLocationContext } from '@/context/location'




const Menu = ({ locations }) => {

  const store = useLocationContext();

  const locationFilter = locations.filter(node => node.id === store[0].id)

  const location = locationFilter[0]

  return (
    <Layout>
      {/* <NextSeo 
        title={home.seo.metaTitle} 
        description={home.seo.metaDesc}
        openGraph={{
          images: [
            { url: home.seo.shareGraphic.asset.url },
          ],
        }}
      /> */}
      <Header locations={locations} /> 
      <LazyMotion features={domAnimation}>
        <m.main 
          initial="initial"
          animate="enter"
          exit="exit"
          className="pt-[5rem] px-5 min-h-[calc(100vh-3.5rem)] flex flex-wrap gap-y-4"
        >
          <m.div className="m-auto text-center grid" variants={fade}>
            <h1 className="border-b-2 border-black">{`${location === undefined ? 'Pick a location' : location.attributes.title}`}</h1>
            { location && (
              <div>
                { location.attributes.menus.data.map((menuItem) => {
                  return(
                    <p key={`menuItem${menuItem.id}`}>{menuItem.attributes.title}</p>
                  )
                }) }
              </div>
            ) }
          </m.div>
        </m.main>
      </LazyMotion>
      <Footer />
    </Layout>
  );
};

export async function getStaticProps() {
  const locationsRes = await fetchAPI("/locations", {
    populate: "deep",
  });

  return {
    props: {
      locations: locationsRes.data,
    },
    revalidate: 1,
  };
}

export default Menu;