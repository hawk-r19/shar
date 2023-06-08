import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Nav from './components/nav.js'

export default function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path='/' element={<Home />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
};