import '../styles/tips.css'

export default function Tips({mobile}) {
    return (
        <div className={'page tips-page' + (mobile ? ' mobile' : '')}>Tennis Tips Coming Soon!</div>
    )
}