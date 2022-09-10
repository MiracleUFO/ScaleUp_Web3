import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import styles from '../styles/Home.module.css'
import 'animate.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>ScaleUp Web3</title>
        <meta name='description' content='Web3 NFT retrieval app' />
        <link rel='icon' href='/logo.png' />
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        {
          // eslint-disable-next-line @next/next/no-page-custom-font
          <link href='https://fonts.googleapis.com/css2?family=Rubik&display=swap' rel='stylesheet' />
        }
      </Head>

      <main className={styles.main}>
        <div>
          <h1 className='animate__animated animate__fadeInLeft'>Learn Web3 with ScaleUp</h1>
          <p className='animate__animated animate__fadeInLeft animate__delay-1s'>Fast track your career, join ScaleUp Web3 and <br /> improve your skills.</p>
          <ConnectButton />
        </div>
        <div>
          <Image
            src='https://blush.design/api/download?shareUri=4EYAq4nspZi4hNcy&c=Bottom_0%7E2b44ff_Hair_0%7Ee8e1e1_Skin_0%7E57331f_Top_0%7Ea8e5ba&w=800&h=800&fm=png'
            alt='Humaan illustration with long white hair'
            width='80%'
            height='100%'
            layout='responsive'
            objectFit='contain'
          />
        </div>
      </main>
    </div>
  )
}

export default Home
