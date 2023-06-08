import './styles/App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home.js'
import Nav from './components/nav.js'

export default function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Nav />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
};