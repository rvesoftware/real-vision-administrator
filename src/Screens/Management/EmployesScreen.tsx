
const employes = [
    {
        name: "Romis",
        middlename: "Javier",
        lastname: "Caldea",
        middlelastname: "Chauran",
        identification: 42354235553,
        username: "romis",
        position: "Product Manager",
        phone: 4365464574,
        email: "romis@gmail.com",
        location: "Guayana. Venezuela",
        birthday: "10/12/1999",
        status: true,
    },
    {
        name: "Edgar",
        middlename: "Alexander",
        lastname: "Matos",
        middlelastname: "Chauran",
        identification: 10543453431,
        username: "edgar",
        position: "Frontend Architect",
        phone: 3248764564,
        email: "edgar.matos@gmail.com",
        location: "Cerete. Colombia",
        birthday: "10/12/1999",
        status: true,
    },
    {
        name: "Luis",
        middlename: "Fernando",
        lastname: "Mosquera",
        middlelastname: "Cordoba",
        identification: 1152470605,
        username: "luis",
        position: "CTO",
        phone: 3135840605,
        email: "luismosquera199923@gmail.com",
        location: "Medellin. Colombia",
        birthday: "23/07/1999",
        status: true,
    },
    {
        name: "Jhonier",
        middlename: "Niurd",
        lastname: "Pizarro",
        middlelastname: "Cuesta",
        identification: 107822323,
        username: "jhonier",
        position: "CMO",
        phone: 315748605,
        email: "jhonier15@hotmail.com",
        location: "Medellin. Colombia",
        birthday: "20/04/1997",
        status: true,
    },
    {
        name: "Abner",
        middlename: "-",
        lastname: "Sanchez",
        middlelastname: "Davila",
        identification: 107822323,
        username: "jhonier",
        position: "Backend Architect",
        phone: 315748605,
        email: "sanchezj@hotmail.com",
        location: "Quibdo. Colombia",
        birthday: "23/04/1998",
        status: true,
    },
    {
        name: "Juan",
        middlename: "Pablo",
        lastname: "Chaverra",
        middlelastname: "Cabrera",
        identification: 107822323,
        username: "juan",
        position: "Client Success",
        phone: 3017923174,
        email: "soloconfi@hotmail.com",
        location: "Medellin. Colombia",
        birthday: "23/04/1998",
        status: true,
    },
    {
        name: "Josue",
        middlename: "-",
        lastname: "Ensastiga",
        middlelastname: "Corona",
        identification: 107822323,
        username: "juan",
        position: "Client Success",
        phone: 3017923174,
        email: "soloconfi@hotmail.com",
        location: "Medellin. Colombia",
        birthday: "23/04/1998",
        status: true,
    },
    {
        name: "Marlin",
        middlename: "Lizeth",
        lastname: "Mosquera",
        middlelastname: "Urrutia",
        identification: 107822323,
        username: "liz",
        position: "Scrum Master",
        phone: 3147923174,
        email: "soloconfi@hotmail.com",
        location: "Medellin. Colombia",
        birthday: "23/04/1997",
        status: true,
    },
    
]

const EmployesScreen = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>

                    <h2 className="screen-title">Employes</h2>
                    <p className="screen-copy">Employes for the current period</p>
                </div>

                <button className="btn"><span><i className='bx bx-plus'></i></span> <p>Add an employe</p></button>

            </div>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id="" /></th>
                        <th>Name</th>
                        <th>Middlename</th>
                        <th>Lastname</th>
                        <th>Middlelastname</th>
                        <th>Identification</th>
                        <th>Username</th>
                        <th>Position</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Birthday</th>
                        <th>Status</th>
                        <th>To contact</th>
                    </tr>
                </thead>
                <tbody>
                    {employes.sort((a, b) => a.name.localeCompare(b.name))
                    .map((employes) => (
                        <tr key={employes.name}>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td>{employes.name}</td>
                            <td>{employes.middlename}</td>
                            <td>{employes.lastname}</td>
                            <td>{employes.middlelastname}</td>
                            <td>{employes.identification}</td>
                            <td>{employes.username}</td>
                            <td>{employes.position}</td>
                            <td>{employes.phone}</td>
                            <td>{employes.email}</td>
                            <td>{employes.location}</td>
                            <td>{employes.birthday}</td>
                            <td ><span className={employes.status? "active" : "out"}>{employes.status? "Active" : "Out"}</span></td>
                            <td><i className='bx bxl-whatsapp'></i> <i className='bx bx-notepad' ></i><i className='bx bx-pencil' ></i> <i className='bx bx-trash-alt' ></i></td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </table>

            <div className="page-footer">
             Row per page: 10 1-3 of {employes.length}
            </div>
        </div>
    )
}

export default EmployesScreen;