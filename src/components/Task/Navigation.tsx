
const Navigation = () => {
    return (
        <div className='navigation-task'>
            <h2 className="screen-title">Your team</h2>
            <p className="screen-copy">Teams you've been added to</p>

            <button className="task-team-create-button" ><span><i className='bx bx-plus'></i></span> <p>Join or create a team</p></button>

            <div className="teams-task-list">
                <div className="team-task-item">
                    <i className='bx bx-code-alt' ></i>
                    <div>
                        <h3>UX Changes</h3>
                        <p>10 members</p>
                    </div>
                </div>
                <div className="team-task-item">
                    <i className='bx bx-code-alt' ></i>
                    <div>
                        <h3>Development team</h3>
                        <p>20 members</p>
                    </div>
                </div>
                <div className="team-task-item">
                    <i className='bx bx-code-alt' ></i>
                    <div>
                        <h3>QA team</h3>
                        <p>3 members</p>
                    </div>
                </div>
                <div className="team-task-item">
                    <i className='bx bx-code-alt' ></i>
                    <div>
                        <h3>Management</h3>
                        <p>13 members</p>
                    </div>
                </div>

                <div className="team-task-item">
                    <i className='bx bx-store-alt' ></i>
                    <div>
                        <h3>Marketing</h3>
                        <p>25 members</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;