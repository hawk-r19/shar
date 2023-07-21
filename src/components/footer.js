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
        </div>
    )
}