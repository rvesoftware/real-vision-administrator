import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import categoryActions from '../../actions/categoryActions';
import productActions from '../../actions/productActions';
import LoadingBox from '../../components/LoadingBox';
import { DivisaFormater } from '../../utils/divisaFormater';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';

const QuoteScreen = () => {

    const productList = useSelector((state: any) => state.productList);
    const { loading: loadingProducts, error: errorProduct, data: products } = productList;

    const categoryList = useSelector((state: any) => state.categoryList);
    const { loading: loadingCategory, error: errorCategory, data: categories } = categoryList;

    const dispatch = useDispatch();

    const [specs, setSpecs] = useState<any>([]);
    const [note, setNote] = useState(
        'Real Visión Enterprise garantiza a sus clientes el servicio de reparación sin costo por repuesto o mano de obra, por un periodo de 3 meses los cuales inician a partir de la fecha de compra del computador, de igual modo se le proporciona una garantía de 12 meses, la cual inicia a partir de la fecha de compra del equipo.'
      );
      const [name, setName] = useState("");
      const [code, setCode] = useState(10057);

    const specsHandler = (e:any, product: any) => {
        console.log(product)
        e.preventDefault();
        const index = specs.findIndex((s:any) => s.category == product.category);
        console.log(index)
        if(index >= 0){
            specs.splice(index, 1);
        }
        setSpecs([...specs,  {name:product.name, price: product.price, category: product.category, image: product.image, wattage: product.wattage}]) 
    }

    const removeSpecHandler = (e:any, product: any) => {
        e.preventDefault();
        console.log(product.category)
        const index = specs.findIndex((s:any) => s.category == product.category);
        const a = specs.splice(index, 1);
        console.log(a);
        console.log(specs)
        setSpecs([...specs]);
    }

    let actualPrice = specs.reduce((a: any, c: any) => Number(a) + Number(c.price) , 0);
    let actualWattage = specs.filter((s:any) => s.category != "626dd9b2cfc8d7c93ecd9ec3").reduce((a: any, c: any) => Number(a) + Number(c.wattage) , 0);

    
    const createAndDownloadPdf = async() => {
        const {data} = await axios.post('https://real-vision-api.herokuapp.com/create-pdf', {specs: [...specs], price: actualPrice, code:code, name: name}, {responseType: 'blob' });
        console.log(data)
        const pdfBlob = new Blob([data], {type: 'application/pdf'});
        const link = document.createElement('a')
        link.href = URL.createObjectURL(pdfBlob);
        link.target = '_blank';
        const stri = `${name}.pdf`
        link.download = stri;

        document.body.append(link)
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 7000);
        // await saveFile(pdfBlob, "newPDF.pdf");
        console.log(pdfBlob instanceof File)
        
    }   

    useEffect(() => {

        dispatch(categoryActions.list() as any)
        dispatch(productActions.list() as any)
    }, [dispatch])

    const submitHandler = () => {


    }

    return (
        <div className='page'>
            <div className="page-header">
                <div>
                    <h2 className="screen-title">Create an quote</h2>
                    <p className="screen-copy">Create a new quoute for a client</p>
                </div>
                <div>
                    <Link to="#" className="btn" download="quotation.pdf" onClick={() => createAndDownloadPdf()} ><span><i className='bx bx-plus'></i></span> <p>Save</p></Link>
                </div>
            </div>

            <div className="page-content">
            <div className="quote-input">


            <input type="text" placeholder='Client name' className='quote-input'onChange={(e) => setName(e.target.value)} />
            <input type="text" value={code} className='quote-input' readOnly />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Article</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>

                {!loadingCategory &&  (
                    <tbody className='quote-list'>

                        {categories.map((category: any) => (
                            <tr key={category._id}>

                                {!loadingProducts && (
                                    <>
                                        <td>
                                            <select name="" id="" onChange={(e) => specsHandler(e, JSON.parse(e.target.value)) }>
                                                <option value="" onClick={(e) => removeSpecHandler(e, {category: category._id, name: 0, price: 0})} >{category.name}</option>
                                                {products.filter((product: any) => product.category == category._id)
                                                    .map((product: any) => (

                                                        <option key={product._id}  value={JSON.stringify(product)} onClick={(e) => specsHandler(e, product)} >{product.name}</option>
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
                                            
                                            <input type="number" value={specs.filter((s:any) => s.category == category._id).map((s:any) => s.category == category._id? Number(s.price) : s.name? 0 : 0)}  readOnly />
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
            <textarea name="" value={note} id="" onChange={(e) => setNote(e.target.value)} cols={30} rows={10} readOnly>
            </textarea>                                                           
            </div>   
            </div>


            <div className='quote-price'>
                <h2>{actualWattage}W</h2>
                <h2> {DivisaFormater(actualPrice)} CO$</h2>
            </div>
        </div>
    )
}

export default QuoteScreen
