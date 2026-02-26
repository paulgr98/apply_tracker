import './Footer.css'
import { Link } from 'react-router-dom';

const FooterComponent = () => {

    const year = new Date().getFullYear();

    return (
        <>
            <footer className='footer'>
                <span>
                    Copyright ©{year} <Link to={"https://github.com/paulgr98"} target='_blank' className='links'>paulgr98</Link>
                </span>
            </footer>
        </>
    )
}

export default FooterComponent