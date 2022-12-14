import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/future/image'

import { useState, useEffect, useCallback, MouseEvent } from 'react'

import { useAccount } from 'wagmi'
import { utils } from 'ethers'

import { buildspacev2, learnweb3 } from '../constants/contractAddresses'

import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

import NavBar from '../components/NavBar'
import { CgMaximize } from 'react-icons/cg'

import styles from '../styles/User.module.css'
import 'animate.css'

const User: NextPage = () => {
    const [avatar, setAvatar]= useState('')
    const [nfts, setNfts] = useState<Nfts[]>([])
    const [showRobbo, setShowRobbo] = useState(true)

    const { address, isConnected } = useAccount()

    const isImageUrl = require('is-image-url')

    //  Gets user's avatar
    useEffect(() => {
        if (address && isConnected) {
            const svg =
                createAvatar(style, {
                    seed: address,
                    dataUri: true
                })
            if (svg) setAvatar(svg)
        }
    }, [address, isConnected])

    //  Retrieves user's NFTS
    const getUsersNFTs = useCallback(async () => {
        const options = JSON.parse(JSON.stringify(
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.NEXT_PUBLIC_NFTPORT_AUTH
                }
            }
        ))

        const baseUrl = `https://api.nftport.xyz/v0/accounts/${address}?chain=polygon&contract_address=`
        const buildspaceNfts = 
            await fetch(`${baseUrl}${buildspacev2}`, options)
                .then(res => res.json())
                .catch(err => console.log(err))  

        setTimeout(async () => {
            if (buildspaceNfts?.nfts) {
                const learnweb3Nfts =
                    await fetch(`${baseUrl}${learnweb3}`, options)
                        .then(res => res.json())
                        .catch(err => console.log(err))
                
                //  Format NFT to Nft type
                const allNfts = buildspaceNfts.nfts.concat(learnweb3Nfts.nfts).map(({
                    description,
                    file_url,
                    name,
                    ...rest
                }: {
                    description: string,
                    file_url: string,
                    name: string
                }) => {
                    return {name, file_url, description}
                })
                setNfts(allNfts)
            }
        }, 1000)
    },  [address])

    //  Calls getUsersNFTs if account address is valid
    useEffect(() => {
        const isValidAddress = utils.isAddress(JSON.parse(JSON.stringify(address)))
        if (isValidAddress) getUsersNFTs()
    }, [address, getUsersNFTs])

    //  Slowly fades out user robbo avatar after nfts load
    useEffect(() => {
        if (nfts.length) {
            console.log('stuff')
            const classes = 'animate__animated animate__fadeOut animate__delay-2s'.split(' ')
            document.getElementById('user-avatar-container')?.classList.add(...classes)
            setTimeout(() => setShowRobbo(false), 2500)
        }
    }, [nfts.length])

    //  Minimizes NFT images when img loses focus
    const minimizeAll = useCallback((): void => {
        const imgs = Array.from(document.getElementsByClassName(styles.clickedFrame) as HTMLCollectionOf<HTMLElement>)
        imgs.forEach((img) => {
            img.classList.remove(styles.clickedFrame)
            Array.from(document.getElementsByClassName('max') as HTMLCollectionOf<HTMLElement>).forEach(max => {
                max.style.display = 'block'
            })
        })
    }, [])

    //  Maximizes NFT images on click max icon
    const maximizeImg = useCallback((e: MouseEvent<HTMLElement>): void => {
        e.stopPropagation()
        minimizeAll()

        const target = e.target as HTMLElement
        const parentChildNodes = target!.parentNode!.parentNode!.children as HTMLCollectionOf<HTMLElement>
        if (parentChildNodes[1]?.style) {
            target!.parentElement!.parentElement!.classList.add(styles.clickedFrame)
            parentChildNodes[1]!.style.display = 'none'
        }
    },[minimizeAll])

    //  JSX Template
    if (isConnected)
        return (
            <div className={styles.container} onClick={minimizeAll}>
                <Head>
                    <title>ScaleUp Web3 User Page</title>
                </Head>

                <NavBar />

                <main className={styles.main}>
                    {showRobbo ?
                        <div id='user-avatar-container' className={`${styles.imgContainer}`}>
                            {avatar ? 
                                <Image 
                                    src={avatar}
                                    alt='User random generated avatar'
                                    width={250}
                                    height={300}
                                /> 
                            :   null}
                            <span className={styles.address}>#{address}</span>
                        </div>
                    :   <>
                            <h1 className={`${styles.address} ${styles.header}`}>NFTS</h1>
                            <div className={styles.nftsContainer}>
                                {nfts.map((nft, index) => {
                                    const path = nft?.file_url.replace('ipfs://', 'https://ipfs.io/ipfs/')
                                    return (
                                        isImageUrl(path) ?
                                            <div
                                                key={index}
                                                className={`${styles.frame} animate__animated animate__fadeIn animate__delay-1s`}
                                            >
                                                <Image 
                                                    src={path}
                                                    alt={nft?.name}
                                                    title={nft?.description}
                                                    width={246}
                                                    height={154}
                                                />
                                                <span onClick={maximizeImg} className='max'><CgMaximize /></span>
                                            </div>
                                        : 
                                            <iframe key={index}
                                                className='animate__animated animate__fadeIn animate__delay-1s'
                                                title={nft?.name}
                                                src={path}
                                                allow='fullscreen; picture-in-picture;'
                                            >
                                                Your browser does not support iframe.
                                                <a href={path} target='_blank' rel='noreferrer'>See content here</a>
                                            </iframe>
                                    )
                                })}
                            </div>
                        </>
                    }
                </main>
            </div>
        )
    else return (
        <main className={styles.main}><span className={styles.address}>404</span></main>
    )
}

export default User