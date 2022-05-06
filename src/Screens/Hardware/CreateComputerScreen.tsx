import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import brandActions from "../../actions/brandActions";
import categoryActions from "../../actions/categoryActions";
import computerActions from "../../actions/computerActions";
import gameActions from "../../actions/gameActions";
import productActions from "../../actions/productActions";
import programActions from "../../actions/programActions";
import constants from "../../constants/constantsTemplate";

const CreateComputerScreen = () => {

    const computerCreate = useSelector((state: any) => state.computerCreate);
    const { loading, error, success } = computerCreate;

    const categoryList = useSelector((state: any) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, data: categories } = categoryList;

    const productList = useSelector((state: any) => state.productList);
    const { loading: loadingProducts, error: errorProduct, data: products } = productList;

    const gameList = useSelector((state: any) => state.gameList);
    const { loading: loadingGames, error: errorGames, data: games } = gameList;

    const programList = useSelector((state: any) => state.programList);
    const { loading: loadingPrograms, error: errorPrograms, data: programs } = programList;

    const brandList = useSelector((state: any) => state.brandList);
    const { loading: loadingBrand, error: errorBrand, data: brands } = brandList;

    const [name, setName] = useState("");
    const [specs, setSpecs] = useState<any>([]);
    const [price, setPrice] = useState("");
    const [wattage, setWattage] = useState("");
    const [gamesComputer, setGamesComputer] = useState<any>([]);
    const [programsComputer, setProgramsComputer] = useState<any>([]);
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");

    const dispatch = useDispatch();

    console.log(image)
    const uploadHandler = async (e: any, imageField = "image") => {

        const file = e.target.files[0];
        const bodyFormData = new FormData();

        bodyFormData.append('file', file);
     
        try {
            dispatch({ type: "UPLOAD_REQUEST" });

            const { data } = await axios.post("https://real-vision-api.herokuapp.com/upload-image", bodyFormData, {
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
        setPrice(actualPrice);
        setWattage(actualWattage);
        dispatch(computerActions.create({ name, price: actualPrice, wattage: actualWattage, image, specs, description, games: gamesComputer, programs: programsComputer }) as any);
    }

    const specsHandler = (product: any) => {
        setSpecs([...specs,  {name:product.name, price: product.price, category: product.category, image: product.image, wattage: product.wattage}]) 
    }

    const gamesHandler = (game: any) => {
        setGamesComputer([...gamesComputer, {name: game.name, image: game.image}])
    }

    const programsHandler = (program: any) => {
        setProgramsComputer([...programsComputer, {name: program.name, image: program.image}])
    }

    let actualPrice =specs.reduce((a: any, c: any) => Number(a) + Number(c.price) , 0);
    let actualWattage =specs.reduce((a: any, c: any) => Number(a) + Number(c.wattage) , 0);

    const navigate = useNavigate();

    useEffect(() => {
        const computerConstants = new constants('COMPUTER');

        if (success) {
            dispatch({type: computerConstants.constants().CREATE_RESET});
            navigate('/computers');
        }

        dispatch(categoryActions.list() as any)
        dispatch(productActions.list() as any)
        dispatch(brandActions.list() as any)
        dispatch(gameActions.list() as any)
        dispatch(programActions.list() as any)
    }, [dispatch, success])

    console.log(programsComputer)
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h2 className="screen-title">Create an computers</h2>
                    <p className="screen-copy">Create a new computer</p>
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
                            <i className='bx bx-dollar' ></i>
                            <input type="number" placeholder="Price" value={actualPrice} onChange={(e) => setPrice(e.target.value)} readOnly />
                        </div>

                        {/* <div className="form-input">
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
                        </div> */}
                    </div>
                    {!loadingCategory && (

                    <div className="form-group">
                            {categories.map((category: any) => (

                        <div className="form-input" key={category._id}>
                            <>
                            <img className="form-icon" src={category.icon} alt="" />
                            {!loadingProducts && (
                                <select name="" id="" key={category._id} >
                                    <option value="">Select {category.name}</option>
                                    {products.filter((product:any) => product.category == category._id)
                                    .map((product: any) => (
                                        <option key={product._id}  value={product._id} onClick={() => specsHandler(product)} >{product.name}</option>
                                    ))}
                                </select>
                            )}
                            </>
                            
                        </div>
                        ))}
                    </div>
                        )}

                    <div className="form-group">
                       
                    </div>

                    <div className="form-group">
                        <div className="form-input">
                            <i className='bx bxs-battery-charging'></i>
                            <input type="number" placeholder="Wattage" value={actualWattage} onChange={(e) => setWattage(e.target.value)} readOnly />
                        </div>
                        <div className="form-input">
                            <i className='bx bx-image-add' ></i>
                            <input type="file" onChange={(e) => uploadHandler(e, "featuredImage")} />
                        </div>
                    </div>
                    <div className="form-group">
                        {!loadingGames && (

                        <div className="form-input">
                            <i className='bx bx-game'></i>
                            <select name="" id="">
                            <option value="">Select Games</option>
                                {games.map((game: any) => (
                                    <option onClick={() => gamesHandler(game)} value={game._id}>{game.name}</option>
                                ))}
                            </select>
                        </div>
                        )}

                                    <div className="input-tags">
                                        {gamesComputer.map((game:any) => (
                                            <span>{game.name}</span>
                                        ))}
                                    </div>

                    </div>
                    <div className="form-group">
                        {!loadingPrograms && (

                        <div className="form-input">
                            <i className='bx bx-game'></i>
                            <select name="" id="">
                            <option value="">Select Programs</option>
                                {programs.map((program: any) => (
                                    <option onClick={() => programsHandler(program)} value={program._id}>{program.name}</option>
                                ))}
                            </select>
                        </div>
                        )}

                                    <div className="input-tags">
                                        {programsComputer.map((program:any) => (
                                            <span>{program.name}</span>
                                        ))}
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

export default CreateComputerScreen;