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
                <Link to="/brands"><i className='bx bx-bracket'></i> Post</Link>
                <Link to="/brands"><i className='bx bx-bracket'></i> Create Post</Link>
                    <h3>PRODUCT</h3>
                    <Link to="/brands"><i className='bx bx-bracket'></i> Brands</Link>
                    <Link to="/categories"><i className='bx bx-category'></i> Categories</Link>
                    <Link to="/games"><i className='bx bx-game'></i> Games</Link>
                    <Link to="/programs"><i className='bx bx-color'></i> Programs</Link>
                    <Link to="/products"><i className='bx bxl-product-hunt'></i> Products</Link>
                    <Link to="/computers"><i className='bx bx-desktop' ></i> Computers</Link>
                    <h3>CLEINTS</h3>
                    <Link to="/clients"><i className='bx bxs-user-badge'></i> Clients</Link>
                    <h3>QUOTE</h3>
                    <Link to="/quote"><i className='bx bx-desktop' ></i> Quote</Link>
                    <Link to="/quotations"><i className='bx bx-desktop' ></i> Quotations</Link>
                
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
            <Link to="/insigths"><i className='bx bx-calendar' ></i> Insgiths</Link>
                </div>

            </details>
            <details>
                <summary>MANAGEMENT <i className='bx bx-chevron-down' ></i></summary>
                <div className='navigation-list'>
                    <Link to="/employes"><i className='bx bxs-user-detail' ></i> Employes</Link>
                </div>

            </details>

            

            

        </aside>
    )
}

export default Navigation;