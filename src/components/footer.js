import '../styles/footer.css'

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-left'>
                <div className='web-credit'>{'Website made by '}
                    <a className='github-link' href='https://github.com/hawk-r19' target='_blank' rel='noreferrer'>Rasheek Huq</a>
                </div>
                <a className='logo-credit' target='_blank' rel='noreferrer' href="https://www.vecteezy.com/free-vector/tennis-logo">Tennis Logo Vectors by Vecteezy</a>
            </div>
            <div className='footer-right'>
                <a className='instagram-link' href='https://www.instagram.com/shar_huq/' target='_blank' rel='noreferrer'>
                    <img src={require('../imgs/instagram.jpg')} alt='instagram logo'/>
                </a>
                <a className='facebook-link' href='https://www.facebook.com/shahriyar.i.huq' target='_blank' rel='noreferrer'>
                    <img src={require('../imgs/facebook.jpg')} alt='facebook logo'/>
                </a>
            </div>
        </div>
    )
}