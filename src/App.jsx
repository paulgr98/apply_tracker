import './App.css'

import { BrowserRouter } from 'react-router-dom'

import JobApplication from './components/JobApplication'
import Footer from './components/Footer'

function App() {

    return (
        <>
            <BrowserRouter>
                <JobApplication />
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
