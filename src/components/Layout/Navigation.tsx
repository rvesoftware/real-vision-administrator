import { Link } from 'react-router-dom';
import '../../styles/navigation.css'

const Navigation = () => {
    return (
        <aside>
                   <details>
                <summary>MAIN <i className='bx bx-chevron-down' ></i></summary>
                <div className='navigation-list'>
                    <Link to="/"><i className='bx bx-home-alt-2'></i> Home</Link>
                </div>

            </details>
            <details>
                <summary>ENTERPRISE <i className='bx bx-chevron-down' ></i></summary>
                <div className='navigation-list'>
            <Link to="/calendar"><i className='bx bx-calendar' ></i> Calendar</Link>

                <Link to="/task"><i className='bx bx-task' ></i> Task</Link>
                <Link to="/documentation"><i className='bx bx-file' ></i> Documentation</Link>
            <Link to="/expenses">Expenses</Link>
                
                </div>

            </details>

            <details>
                <summary>HARDWARE <i className='bx bx-chevron-down' ></i></summary>
                <div className='navigation-list'>
                <Link to="/products">Products</Link>
            <Link to="/computers">Computers</Link>
            <Link to="/clients">Clients</Link>
                </div>

            </details>

            <details>
                <summary>SOFTWARE <i className='bx bx-chevron-down' ></i></summary>
                <div className='navigation-list'>
            <Link to="/calendar"><i className='bx bx-calendar' ></i> Calendar</Link>

                <Link to="/task"><i className='bx bx-task' ></i> Task</Link>
                <Link to="/documentation"><i className='bx bx-file' ></i> Documentation</Link>
                </div>

            </details>

            <details>
                <summary>MARKETING <i className='bx bx-chevron-down' ></i></summary>
                <div className='navigation-list'>
            <Link to="/calendar"><i className='bx bx-calendar' ></i> Calendar</Link>

                <Link to="/task"><i className='bx bx-task' ></i> Task</Link>
                <Link to="/documentation"><i className='bx bx-file' ></i> Documentation</Link>
                </div>

            </details>

            

            

        </aside>
    )
}

export default Navigation;