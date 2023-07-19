import '../styles/layout.css'
import React from 'react'
import {Outlet} from 'react-router-dom'
import Nav from '../components/nav.js'
import Footer from '../components/footer.js'

export default function Layout({mobile}) {
    return (
        <React.Fragment>
            <Nav mobile={mobile}/>
            <Outlet/>
            <Footer mobile={mobile}/>
        </React.Fragment>
    )
}