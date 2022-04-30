import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";
import clientActions from "../../actions/clientActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
import { Client } from "../../types/Client";
import ReactToPrint from 'react-to-print';
import ClientGuide from "../../components/ClientGuide";
import { useReactToPrint } from 'react-to-print';
import { Link } from "react-router-dom";
const ClientsScreen = () => {


    const clientList = useSelector((state: any) => state.clientList);
    const { loading, error, data: clients } = clientList;

    const clientCreate = useSelector((state: any) => state.clientCreate);
    const { loading: loadignCreate, error: errorCreate, success } = clientCreate;


    const clientDelete = useSelector((state: any) => state.clientDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = clientDelete;

    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);


    const [selectedBrand, setSelectedBrand] = useState<Client>();

    const [client, setClient] = useState<Client>();

    const dispatch = useDispatch();

    const deleteHandler = ({ _id, name }: Client) => {
        console.log("Delete", name)
        console.log("Delete ID", _id)
        dispatch(clientActions.delete(_id) as any)
    }

    useEffect(() => {
        const clientConstants = new constants('CLIENT');
        
        if (successDelete) {
            dispatch({ type: clientConstants.constants().DELETE_RESET });
        }

        if (success) {
            dispatch ({type: clientConstants.constants().CREATE_RESET});
        }
        
        dispatch(clientActions.list() as any);
   
    }, [dispatch, successDelete]);

    const printRef = useRef(null);
    const printHandler = async ({_id, name, identification, phone, address, city}:Client) => {
        await setClient({_id, name, identification, phone, address, city})
        await printManage();
    }

    const printManage = useReactToPrint({
        content: () => printRef.current
    }); 


    return (
        <div className="page">
            <div className="page-header">
                <div>

                    <h2 className="screen-title">Clients</h2>
                    <p className="screen-copy">Clients for the current period</p>
                </div>

                <Link to="/create-client" className="btn"><span><i className='bx bx-plus'></i></span> <p>Add an client</p></Link>

            </div>
            {loading? <LoadingBox /> : (

            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id="" /></th>
                        <th>Name</th>
                        <th>Identification</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Email</th>
                        <th>Source</th>
                        <th>Created At</th>
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
                    {clients.map(({_id, name, identification, phone, address, city, email, source, createdAt}: Client) => (
                        <tr key={_id}>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td>{name}</td>
                            <td>{identification}</td>
                            <td>{phone}</td>
                            <td>{address}</td>
                            <td>{city}</td>
                            <td>{email}</td>
                            <td>{source}</td>
                            <td><TimeAgo date={createdAt || ""} /></td>
                            <td><i className='bx bx-notepad' ></i> <button className="btn-none" onClick={() => printHandler({_id, name, identification, phone, address, city})} ><i className='bx bx-printer' ></i></button> <button className="btn-none" > <i className='bx bx-pencil' ></i> </button> <button className="btn-none" onClick={() => deleteHandler({_id, name})} > <i className='bx bx-trash-alt' ></i></button> </td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </table>
            )}


            {!loading && (
                <div className="page-footer">
                Row per page: 10 1-3 of {clients.length}
                </div>
            )}

                {/* <ClientGuide ref={printRef} name="Nestor Mosquera" identification="1152472328"  /> */}


                <div ref={printRef} className="print-screen">
                <div className="logo">
                    <div className="picture">
                        <img src="/logo.svg" alt="" />    
                    </div>
                </div>
            <table>
                <thead>
                    <tr>
                        <th>REMITENTE</th>
                        <th>DESTINATARIO</th>
                    </tr>
                </thead>
                <tbody>
                    <tr> 
                        <td> Real Vision Hardware</td>
                        <td>{client?.name}</td>
                    </tr>
                    <tr>
                        <td>1004010670</td>
                        <td>{client?.identification}</td>
                    </tr>
                    <tr>
                        <td>3207765645</td>
                        <td>{client?.phone}</td>
                    </tr>
                    <tr>
                        <td>Circular 3 #70-18</td>
                        <td>{client?.address}</td>
                    </tr>
                    <tr>
                        <td>Medellin</td>
                        <td>{client?.city}</td>
                    </tr>
    
                </tbody>
            </table>
        </div>

        </div>
    )
}

export default ClientsScreen;