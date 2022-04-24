
const clients = [
    {
        name: "Ray Tamata",
        position: "Head of marketing",
        departament: "Sales",
        phone: 9889123,
        email: "raytama@gmail.com",
        location: "Lviv. Ukraine",
        status: true,
    }
]

const ClientsScreen = () => {
    return(
        <div className="page">
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
                    <tr className="new-tr">
                    <span>

                        <td><input type="checkbox" name="" id="" /></td>
                        <td>Choose all</td>
                        </span>


                        <td><input type="checkbox" name="" id="" /> 2 of 250 seledted</td>

                    </tr>
                    {clients.map((client) => (
                        <tr key={client.name}>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td>{client.name}</td>
                            <td>{client.position}</td>
                            <td>{client.departament}</td>
                            <td>{client.phone}</td>
                            <td>{client.email}</td>
                            <td>{client.location}</td>
                            <td>{client.status}</td>
                            <td>{client.name}</td>

                        </tr>
                    ))}
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ClientsScreen;