import axios from "axios";

const InsigthsScreen = () => {

    const login  = async() => {
        const {data} = await axios.get('https://graph.facebook.com/v13.0/134895793791914?fields=instagram_business_account&access_token=EAAJvOIchee0BAMwARdua5gP2pC9l4m8jOJtD8Ejl9iw5o5QYbjNLK8cRHWlZCvWs8bmCKQ1WkDUylbixkfP0wVtzwGMAo0qmNCRGHHD5wjvmknzQIdsgpn9QEYGZADbHpRcFJmdN4okV3Ogf3lDEqSn7QN46jwjTaqIhptmK8s4mEZBjd7JPQwqjkSS5XlLPZCgltKJpKgZDZD');
        console.log(data)
    }

    

    return (
        <div>
            <button onClick={() => login()}>Login</button>
        </div>
    )
}

export default InsigthsScreen;