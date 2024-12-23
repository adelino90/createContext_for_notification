import Head from 'next/head';

import Layout from '../components/layout/layout';
import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta name='description' content='NextJS Events' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
