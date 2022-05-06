import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import categoryActions from '../../actions/categoryActions';
import productActions from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';

const QuoteScreen = () => {

    const productList = useSelector((state: any) => state.productList);
    const { loading: loadingProducts, error: errorProduct, data: products } = productList;

    const categoryList = useSelector((state: any) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, data: categories } = categoryList;

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(categoryActions.list() as any)
        dispatch(productActions.list() as any)
    }, [dispatch])

    return (
        <div className='page'>
            <h2>Quotaton</h2>

            <table>
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>

                {loadingCategory? <LoadingBox /> :  (
                    <tbody className='quote-list'>

                        {categories.map((category: any) => (
                            <tr key={category._id}>

                                {!loadingProducts && (
                                    <>
                                        <td>
                                            <select name="" id="">
                                                <option value="">{category.name}</option>
                                                {products.filter((product: any) => product.category == category._id)
                                                    .map((product: any) => (

                                                        <option key={product._id} value="">{product.name}</option>
                                                    ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input type="number" />
                                        </td>
                                        <td>
                                            <input type="number" />
                                        </td>
                                        <td>
                                            <input type="number" />
                                        </td>
                                    </>
                                )}


                            </tr>

                        ))}
                    </tbody>


                )}


            </table>
            <div className="quote-footer">
            <label htmlFor="">Aditional Note</label>                                                
            <textarea name="" id="" cols={30} rows={10}>
            </textarea>                                                           
            </div>                                                  

            <div className='quote-price'>
                <h2>5.000.000 CO$</h2>
            </div>
        </div>
    )
}

export default QuoteScreen
