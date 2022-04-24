import '../../styles/header.css'

const Header = () => {
    return (
        <header>
            <div className='logo'>
                <img src="/logo.svg" alt="" />
            </div>
            <div>
                <div className="picture">
                    <img src="/ceo.png" alt="Photo" />
                </div>
                <span className='user-info'>
                    <p>Nestor Mosquera</p>
                    <p>CEO</p>
                </span>
            </div>
        </header>
    )
}

export default Header;