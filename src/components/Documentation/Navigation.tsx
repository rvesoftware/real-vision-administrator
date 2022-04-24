const Navigation = () => {
    return (
        <div className='navigation'>
            <div className="search">
            <i className='bx bx-search' ></i>
            <input type="text" placeholder='Quick Find' />
            </div>
            
            <h4>Pages</h4>
            <div className="pages">
                <div>
                    <div className="page-item">
                        <i className='bx bx-file'></i>
                        <p className="page-title">Untitled</p>
                        <div className="page-options"></div>
                    </div>
                </div>
            </div>
            <div className="pages">
                <div>
                    <div className="page-item">
                        <i className='bx bx-file'></i>
                        <p className="page-title">Untitled</p>
                        <div className="page-options"></div>
                    </div>
                </div>
            </div>
            <div className="pages">
                <div>
                    <div className="page-item">
                        <i className='bx bx-file'></i>
                        <p className="page-title">Untitled</p>
                        <div className="page-options"></div>
                    </div>
                </div>
            </div>
            <div className="pages">
                <div>
                    <div className="page-item">
                        <i className='bx bx-file'></i>
                        <p className="page-title">Untitled</p>
                        <div className="page-options"></div>
                    </div>
                </div>
            </div>
            <div className="pages">
                <div>
                    <div className="page-item">
                        <i className='bx bx-file'></i>
                        <p className="page-title">Untitled</p>
                        <div className="page-options"></div>
                    </div>
                </div>
            </div>

            <p className='new-page'><i className='bx bx-plus'></i> New page</p>
        </div>
    )
}

export default Navigation;