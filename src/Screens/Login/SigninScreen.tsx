import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signin } from '../../actions/adminActions';
import '../../styles/login.css'

const SigninScreen = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const adminSignin = useSelector((state:any) => state.adminSignin);
    const {adminInfo, loading, error} = adminSignin;

    const dispatch = useDispatch();

    const submitHandler = (e:any) => {
        e.preventDefault();

        dispatch(signin(username.toLowerCase(), password) as any);
    }

    return (
        <div className='login-screen'>
            <div>
                <p className='login-copy'>Be the best version of yourself</p>
            </div>
            <form onSubmit={submitHandler}>
                <h3>Welcome</h3>
                <p>Sign in to your account</p>
                <input type="text" placeholder="Username"     value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input className='input-submit' type="submit" value="Login" />
            </form>
        </div>
    )
}

export default SigninScreen;