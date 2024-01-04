import '../styles/globals.css'; // Adjust the path according to your directory structure

function MyApp({ Component, pageProps }: { Component: any, pageProps: any }) {
  return <Component {...pageProps} />;
}

export default MyApp;
