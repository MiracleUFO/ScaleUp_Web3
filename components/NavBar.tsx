import type { NextComponentType } from 'next'
import { useRouter } from 'next/router';

import { FaUserAstronaut } from 'react-icons/fa'
import { BiHomeSmile } from 'react-icons/bi'

import styles from '../styles/Nav.module.css';

const NavBar: NextComponentType = () => {
    const router = useRouter()
    console.log(router)
    return (
        <nav className={styles.nav}>
            <span><BiHomeSmile /></span>
            <span><FaUserAstronaut /></span>
        </nav>
    )
}

export default NavBar