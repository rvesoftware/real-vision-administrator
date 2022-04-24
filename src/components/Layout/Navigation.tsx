import { Link } from 'react-router-dom';
import '../../styles/navigation.css'

const Navigation = () => {
    return (
        <aside>
            <Link to="/">Task</Link>
            <Link to="/">Documentation</Link>
        </aside>
    )
}

export default Navigation;