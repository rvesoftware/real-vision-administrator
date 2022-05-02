import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import brandActions from "../../actions/brandActions";
import categoryActions from "../../actions/categoryActions";
import productActions from "../../actions/productActions";
import constants from "../../constants/constantsTemplate";

const CreateProductScreen = () => {

    const productCreate = useSelector((state: any) => state.productCreate);
    const { loading, error, success } = productCreate;

    const categoryList = useSelector((state: any) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, data: categories } = categoryList;

    const brandList = useSelector((state: any) => state.brandList);
    const { loading: loadingBrand, error: errorBrand, data: brands } = brandList;

    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [wattage, setWattage] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");


    const dispatch = useDispatch();

    const uploadHandler = async (e: any, imageField = "image") => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();

        bodyFormData.append('file', file);

     
        try {
            dispatch({ type: "UPLOAD_REQUEST" });

            const { data } = await axios.post("http://localhost:4500/upload-image", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            dispatch({ type: "UPLOAD_SUCCESS" });
            setImage(data.secure_url);
        } catch (err) {
            console.log(err)
        }
    }

    const createProductHandler = () => {
        dispatch(productActions.create({ name, brand, category, price, wattage, image, description }) as any);
    }

    const navigate = useNavigate();

    useEffect(() => {
        const productConstants = new constants('PRODUCT');

        if (success) {
            productConstants.constants().CREATE_RESET;
            navigate('/products');
        }

        dispatch(categoryActions.list() as any)
        dispatch(brandActions.list() as any)
    }, [success])

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h2 className="screen-title">Create an products</h2>
                    <p className="screen-copy">Create a new product</p>
                </div>
                <div>
                    <button className="btn" onClick={() => createProductHandler()} ><span><i className='bx bx-plus'></i></span> <p>Save</p></button>
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
                            {!loadingBrand && (
                                <>
                                <select name="" id="" onChange={(e) => setBrand(e.target.value)}>
                                    <option value="">Select brand</option>

                                    {brands.map((brand: any) => (
                                        <option value={brand._id}>{brand.name}</option>
                                    ))}
                                </select>
                                </>

                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-input">
                            <i className='bx bx-category' ></i>
                            {!loadingCategory && (

                                <select name="" id="" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Select category</option>
                                    {categories.map((category: any) => (
                                        <option value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="form-input">
                            <i className='bx bx-dollar' ></i>
                            <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="form-input">
                            <i className='bx bxs-battery-charging'></i>
                            <input type="number" placeholder="Wattage" onChange={(e) => setWattage(e.target.value)} />
                        </div>
                        <div className="form-input">
                            <i className='bx bx-image-add' ></i>
                            <input type="file" onChange={(e) => uploadHandler(e, "featuredImage")} />
                        </div>
                    </div>
                    <div className="form-input start mx-h">
                        <i className='bx bx-align-right' ></i>
                        <textarea name="" id="" cols={30} rows={10} placeholder="Description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProductScreen;