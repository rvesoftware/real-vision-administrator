
const clients = [
    {
        name: "Ray Tamata",
        position: "Head of marketing",
        departament: "Sales",
        phone: 9889123,
        email: "raytama@gmail.com",
        location: "Lviv. Ukraine",
        status: true,
    },
    {
        name: "Romis Caldea",
        position: "Head of design",
        departament: "Design",
        phone: 4365464574,
        email: "romis@gmail.com",
        location: "Lviv. Venezuela",
        status: true,
    },
    {
        name: "Ray Tamata",
        position: "Head of marketing",
        departament: "Sales",
        phone: 9889123,
        email: "raytama@gmail.com",
        location: "Lviv. Ukraine",
        status: true,
    },
]

const ClientsScreen = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>

                    <h2 className="screen-title">Clients</h2>
                    <p className="screen-copy">Clients for the current period</p>
                </div>

                <button className="btn"><span><i className='bx bx-plus'></i></span> <p>Add an client</p></button>

            </div>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id="" /></th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Departament</th>
                        <th>Phone number</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>To contact</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr className="new-tr">
                        <>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td>Choose all</td>
                        </>
                        <td className="selected"><input type="checkbox" name="" id="" /> 2 of 250 selected</td>
                    </tr> */}
                    {clients.map((client) => (
                        <tr key={client.name}>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td>{client.name}</td>
                            <td>{client.position}</td>
                            <td>{client.departament}</td>
                            <td>{client.phone}</td>
                            <td>{client.email}</td>
                            <td>{client.location}</td>
                            <td ><span className={client.status? "active" : "out"}>{client.status? "Active" : "Out"}</span></td>
                            <td><i className='bx bxl-whatsapp'></i> <i className='bx bx-notepad' ></i><i className='bx bx-pencil' ></i> <i className='bx bx-trash-alt' ></i></td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </table>

            <div className="page-footer">
             Row per page: 10 1-3 of {clients.length}
            </div>
        </div>
    )
}

export default ClientsScreen;