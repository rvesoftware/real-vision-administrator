import { Link } from 'react-router-dom';
import '../../styles/navigation.css'

const Navigation = () => {
    return (
        <aside>
            <Link to="/task">Task</Link>
            <Link to="/documentation">Documentation</Link>
        </aside>
    )
}

export default Navigation;