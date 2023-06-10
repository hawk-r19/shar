import './styles/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Layout from './pages/layout.js'
import Contact from './pages/contact.js'

export default function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='contact' element={<Contact />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
};