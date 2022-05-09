import { useSelector } from 'react-redux';
import '../../styles/header.css'

const Header = () => {

    const adminSignin = useSelector((state: any) => state.adminSignin);
    const { adminInfo, loading, error } = adminSignin;


    return (
        <header>
            <div className='logo'>
                <img src="/logo.svg" alt="" />
            </div>
            <div>
                {adminInfo.admin.image ? (
                    <div className="picture">
                        <img src={adminInfo.admin.image} alt="Photo" />
                    </div>
                ) : (
                    <div className='admin-letter'>
                        {adminInfo.admin.name.charAt(0)}
                    </div>

                )}

                <span className='user-info'>
                    <p>{adminInfo.admin.name} {adminInfo.admin.lastname}</p>
                    <p>{adminInfo.admin.position}</p>
                </span>
            </div>
        </header>
    )
}

export default Header;