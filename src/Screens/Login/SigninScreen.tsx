const SigninScreen = () => {
    return (
        <div>
            <div>
                <p>Be the best version of yourself</p>
            </div>
            <form>
                <h3>Welcome</h3>
                <p>Sign in to your account</p>
                <input type="text" placeholder="Username" />
                <input type="password" placeholder="Password" />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default SigninScreen;