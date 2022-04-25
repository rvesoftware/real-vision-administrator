import { Link } from 'react-router-dom';
import '../../styles/navigation.css'

const Navigation = () => {
    return (
        <aside>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/computers">Computers</Link>
            <Link to="/clients">Clients</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/calendar">Calendar</Link>
            <Link to="/task">Task</Link>
            <Link to="/documentation">Documentation</Link>
        </aside>
    )
}

export default Navigation;