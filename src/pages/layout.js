import '../styles/layout.css'
import React from 'react'
import {Outlet} from 'react-router-dom'
import Nav from '../components/nav.js'
import Footer from '../components/footer.js'

export default function Layout() {
    return (
        <React.Fragment>
            <Nav />
            <Outlet />
            {/* <Footer /> */}
        </React.Fragment>
    )
}