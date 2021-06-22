import { NextSeo } from 'next-seo'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../components/layout/Layout'
import FullBlockOne from '../components/news/FullBlockOne'
import HomeEightGrid from '../components/news/HomeEightGrid'
import HomeFeatureGrid from '../components/news/HomeFeatureGrid'
import HomeHalfColTwoGrid from '../components/news/HomeHalfColTwoGrid'
import HomeThreeGrids from '../components/news/HomeThreeGrids'
import HomeTwoGridSix from '../components/news/HomeTwoGridSix'
import SignUp from '../components/news/SignUp'
import TheLatest from '../components/news/TheLatest'

const Home = () => {

  const { t } = useTranslation()
  const [loading , setLoading] = React.useState(false)

  const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000)
  }, [])

  return(
    <>
      <NextSeo 
        title={loading ? t('site.journal') : 'Amartdein Journal'}
        description="This will be the page meta description"
        canonical={w}
        openGraph={{
          url: w,
          title: t('site.journal'),
          description: 'This will be the page meta description',
          images: [
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: t('site.journal'),
            }
          ],
        }}
      />

      <Layout>
        <FullBlockOne />
        <HomeHalfColTwoGrid />
        <HomeEightGrid />
        <HomeFeatureGrid />
        <HomeThreeGrids />
        <HomeTwoGridSix />
        <TheLatest />
        <SignUp />
      </Layout>

    </>
  )
}

export default Home