import { useEffect } from "react";
import { useDispatch as _useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import productActions from "../../actions/productActions";
import LoadingBox from "../../components/LoadingBox";
import constants from "../../constants/constantsTemplate";
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

const ProductsScreen = () => {

    const productList = useSelector((state: any) => state.productList);
    const {loading, error, data: products} = productList;


    const dispatch = _useDispatch();

    useEffect(() => {
         dispatch(productActions.list() as any);
    }, [dispatch])
    return (
        <div className="page">
            <div className="page-header">
                <div>

                    <h2 className="screen-title">Products</h2>
                    <p className="screen-copy">Products for the current period</p>
                </div>

                <button className="btn"><span><i className='bx bx-plus'></i></span> <p>Add an client</p></button>

            </div>
            {loading?  <LoadingBox /> : (

            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" name="" id="" /></th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Wattage</th>
                        <th>Created At</th>
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
                    {products.map((product: any) => (
                        <tr key={product._id}>
                            <td><input type="checkbox" name="" id="" /></td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.wattage}</td>
                            <td>{product.createdAt}</td>
                            <td ><span className={product.status? "active" : "out"}>{product.status? "Active" : "Out"}</span></td>
                            <td><i className='bx bxl-whatsapp'></i> <i className='bx bx-notepad' ></i><i className='bx bx-pencil' ></i> <i className='bx bx-trash-alt' ></i></td>
                        </tr>
                    ))}
                    <tr>

                    </tr>
                </tbody>
            </table>
            )}

            <div className="page-footer">
             Row per page: 10 1-3 of {clients.length}
            </div>
        </div>
    )
}

export default ProductsScreen;