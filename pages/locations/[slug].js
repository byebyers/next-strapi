//import Moment from "react-moment";
//import ReactMarkdown from "react-markdown";


import Layout from "@/components/layout";
import Header from '@/components/header'
import Footer from '@/components/footer'
import { fade, revealDelay, fadeDelay, reveal, revealDelayTop, revealDelayBottom, scaleDelay } from '@/helpers/transitions'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { NextSeo } from 'next-seo'
import { fetchAPI } from "../../lib/api";
import { data } from "autoprefixer";

const Location = ({ locations, location }) => {

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
          <m.div className="m-auto text-center" variants={fade}>
          <h1 className="border-b-2 border-black">{location.attributes.title}</h1>
          { location.attributes.menus.data.map((menuItem) => {

            return(
              <p key={`menuItem${menuItem.id}`}>{menuItem.attributes.title}</p>
            )
          }) }
            
          </m.div>
        </m.main>
      </LazyMotion>
      <Footer />
    </Layout>
  );
};

export async function getStaticPaths() {
  const locationRes = await fetchAPI("/locations", { fields: ["slug"] });

  return {
    paths: locationRes.data.map((location) => ({
      params: {
        slug: location.attributes.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const locationRes = await fetchAPI("/locations", {
    filters: {
      slug: params.slug,
    },
    populate: "deep",
  });
  const [ locationsRes ] = await Promise.all([
    fetchAPI("/locations"),
  ]);

  return {
    props: { 
      location: locationRes.data[0],
      locations: locationsRes.data, 
    },
    revalidate: 1,
  };
}

export default Location;