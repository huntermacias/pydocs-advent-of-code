import Head from 'next/head';
import '../styles/globals.css'; // Adjust the path according to your directory structure
import Layout from '@/components/layout';

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  return (
    <>
      <Head>
        <title>Pydocs - Advent of Coding</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pydocs-aoc.vercel.app/" />
        <meta property="og:title" content="Pydocs - Advent of Coding" />
        <meta property="og:description" content="Your ultimate Python documentation resource." />
        <meta property="og:image" content="/1.png" />
        
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://pydocs-aoc.vercel.app/" />
        <meta property="twitter:title" content="Pydocs - Advent of Coding" />
        <meta property="twitter:description" content="Your ultimate Python documentation resource." />
        <meta property="twitter:image" content="/1.png" />
        {/* Add the favicon link if you have one */}
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* Add additional global meta tags or links here */}
      </Head>
      <Layout>
        <Component {...pageProps} />

      </Layout>
    </>
  );
}

export default MyApp;
