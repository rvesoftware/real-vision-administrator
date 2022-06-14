import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import accountActions from "../../actions/accountActions";
import constants from "../../constants/constantsTemplate";
import { DivisaFormater } from "../../utils/divisaFormater";

const AccountsScreen = () => {

    const accountList = useSelector((state: any) => state.accountList);
    const { loading, error, data: accounts } = accountList;

    const accountCreate = useSelector((state: any) => state.accountCreate);
    const { loading: loadingCreate, error: errorCreate, success } = accountCreate;

    const accountDelete = useSelector((state: any) => state.accountDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = accountDelete;


    const [openModal, setOpenModal] = useState(false);

    const [source, setSource] = useState('');
    const [type, setType] = useState('');
    const [concept, setConcept] = useState('');
    const [value, setValue] = useState('');


    const dispatch = useDispatch();

    const createAccount = () => {
        dispatch(accountActions.create({ source, concept, type, value }) as any)
    }

    const deleteHandler = (account: any) => {
        dispatch(accountActions.delete(account._id) as any);
    }

    let total = accounts?.reduce((a: any, c: any) => c.type == "Expense" ? Number(a) - Number(c.value) : Number(a) + Number(c.value), 0);

    console.log(total)
    useEffect(() => {
        dispatch(accountActions.list() as any);

        const accountConstants = new constants('ACCOUNT');

        if (success) {
            dispatch({ type: accountConstants.constants().CREATE_RESET });
            setOpenModal(false);
        }

        if (successDelete) {
            dispatch({ type: accountConstants.constants().DELETE_REQUEST });
        }


    }, [dispatch, success, successDelete])
    return (
        <>

            <div className="page">
                <div className="page-header">
                    <div>

                        <h2 className="screen-title">Accounts</h2>
                        <p className="screen-copy">Accounts for the current period</p>
                    </div>

                    <button className="btn" onClick={() => setOpenModal(true)} ><span><i className='bx bx-plus'></i></span> <p>Add an account</p></button>

                </div>

                {!loading && (

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" name="" id="" /></th>
                                <th>Date</th>
                                <th>Source</th>
                                <th>Concept</th>
                                <th>Type</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts
                                .map((account: any) => (
                                    <tr key={account._id}>
                                        <td><input type="checkbox" name="" id="" /></td>
                                        <td>{account.createdAt.substring(0, 10)}</td>
                                        <td>{account.source}</td>
                                        <td>{account.concept}</td>
                                        <td>{account.type}</td>
                                        <td>{DivisaFormater(account.value)}</td>
                                        <td>  <button className="btn-none" onClick={() => deleteHandler(account)}> <i className='bx bx-trash-alt' ></i></button></td>
                                    </tr>
                                ))}
                            <tr>

                            </tr>
                        </tbody>
                    </table>
                )}

                {!loading && (
                    <div className="page-footer">
                        Row per page: 10 1-3 of {accounts.length}
                    </div>
                )}


                <div className={total < 0 ? 'quote-price loss' : 'quote-price win'}>
                    <h2>{DivisaFormater(total)} CO$</h2>
                </div>

            </div>

            {openModal && (

                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Add Account</h2>
                            <button onClick={() => setOpenModal(false)} ><i className='bx bx-x' ></i></button>
                        </div>
                        <div className="modal-inputs">
                            <select name="" id="" value={source} onChange={(e) => setSource(e.target.value)} >
                                <option value="">Source</option>
                                <option value="Bank">Bank Account</option>
                                <option value="Cash">Cash</option>
                            </select>


                            <input type="text" placeholder="Concept" name="" id="" value={concept} onChange={(e) => setConcept(e.target.value)} />
                            <select name="" id="" value={type} onChange={(e) => setType(e.target.value)} >
                                <option value="">Type</option>
                                <option value="Expense">Expense</option>
                                <option value="Income">Income</option>
                            </select>
                            <input type="number" placeholder="Value" name="" id="" value={value} onChange={(e) => setValue(e.target.value)} />
                        </div>
                        <button className="btn-success" onClick={createAccount}>Create</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AccountsScreen;