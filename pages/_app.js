import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { Provider } from 'react-redux'
import React from 'react'
import SEO from '../next-seo.config'
import SideBar from '../components/layout/SideBar'
import '../config/language'
import { store , persistor } from '../redux'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/globals.scss'
import '../styles/media.scss'


function MyApp({ Component, pageProps }) {

  return(
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon.ico"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link rel="apple-touch-icon" href="/manifest.json"></link>
        <meta name="theme-color" content="#0a0a0a" />
        
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.6.0/dist/umd/popper.min.js" integrity="sha384-KsvD1yqQ1/1+IA7gi3P0tyJcT3vR+NdBTt13hSJ2lnve8agRGXTTyNaBYmCR/Nwi" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.min.js" integrity="sha384-nsg8ua9HAw1y0W1btsyWgBklPnCUAFLuTMS2G72MMONqmOymq585AcH49TLBQObG" crossOrigin="anonymous"></script>
      </Head>

      <DefaultSeo {...SEO} />
        
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <SideBar />
        </PersistGate>
      </Provider>
    </>
  )
}

export default MyApp
