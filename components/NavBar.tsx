import type { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useAccount } from 'wagmi'

import { FaUserAstronaut } from 'react-icons/fa'
import { BiHomeSmile } from 'react-icons/bi'

import styles from '../styles/Nav.module.css'

const NavBar: NextComponentType = () => {
    const { pathname }= useRouter()
    const { isConnected } = useAccount()

    return (
        <>
            {isConnected ?
                <nav className={`${styles.nav} animate__animated animate__fadeInLeft animate__delay-2s`}>
                    <Link href='/'>
                        <span className={pathname === '/' ? styles.active : ''} title='home'><BiHomeSmile /></span>
                    </Link>
                    
                    <Link href='/user'>
                        <span className={pathname === '/user' ? styles.active : ''} title='user'><FaUserAstronaut /></span>
                    </Link>
                </nav>
                :   null
            }
        </>
    )
}

export default NavBar