import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import clientActions from "../../actions/clientActions";
import constants from "../../constants/constantsTemplate";

const CreateClientScreen = () => {

    const clientCreate = useSelector((state: any) => state.clientCreate);
    const { loading, error, success } = clientCreate;

    const [name, setName] = useState("");
    const [identification, setIdentification] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [source, setSource] = useState("");

    const dispatch = useDispatch();

    const createClientHandler = () => {
        dispatch(clientActions.create({ name, identification, phone, address, city, email, source }) as any);
    }

    const navigate = useNavigate();

    useEffect(() => {
        const clientConstants = new constants('CLIENT');
        if (success) {
            dispatch ({type: clientConstants.constants().CREATE_RESET});
            navigate('/clients');
        }
    }, [success])

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h2 className="screen-title">Create an client</h2>
                    <p className="screen-copy">Create a new client</p>
                </div>
                <div>
                    <button className="btn" onClick={() => createClientHandler()} ><span><i className='bx bx-plus'></i></span> <p>Save</p></button>
                    <button className="btn"><p>Cancel</p></button>
                </div>
            </div>

            <div className="page-content">
                <form>

                    <div className="form-group">
                        <div className="form-input">
                            <i className='bx bx-pencil'></i> <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-input">
                            <i className='bx bx-bracket' ></i>
                                <input type='text' name="" id="" placeholder="Identification" onChange={(e) => setIdentification(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-input">
                            <i className='bx bx-category' ></i>
                                <input type='number' name="" id="" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="form-input">
                            <i className='bx bx-dollar' ></i>
                            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-input">
                            <i className='bx bxs-battery-charging'></i>
                            <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="form-input">
                            <i className='bx bx-image-add' ></i>
                            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-input">
                            <i className='bx bxs-battery-charging'></i>
                            <select name="" id="" onChange={(e) => setSource(e.target.value)}>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Google">Google</option>
                                <option value="Tik Tok">Tik Tok</option>
                                <option value="Youtube">Youtube</option>
                                <option value="Word of Mouth">Word of Mouth </option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateClientScreen;