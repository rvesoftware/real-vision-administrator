import Navigation from "../../../components/Documentation/Navigation";
import EditablePage from "../../EditablePage";
import '../../../styles/documentation.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import { useDispatch } from "react-redux";
import pageActions from "../../../actions/pageActions";
import constants from "../../../constants/constantsTemplate";

interface Page {
    _id?: string;
    fetchedBlocks?: any;
    err?: string;    
}

const DocumentationScreen = () => {

    const [pageSelected, setPageSelected] = useState<Page>();

    const pageList = useSelector((state: any) => state.pageList);
    const { loading, error, data: pages } = pageList;

    const pageOne = useSelector((state: any) => state.pageOne);
    const { loading: loadingOne, error: errorOne, data: pageFetch } = pageOne;

    const pageCreate = useSelector((state: any) => state.pageCreate);
    const { loading: loadingCreate, error: errorCreate, success } = pageCreate;

    const [search, setSearch] = useState("");

    const dispatch = useDispatch();

    const createHandler = () => {
        const blocks = [{tag:'h1', html: "Untitle"}]
        dispatch(pageActions.create({blocks}) as any);
    }

    const deleteHandler = (id:any) => {
        dispatch(pageActions.delete(id) as any);
    }


    useEffect(() => {
        const pageConstants = new constants('PAGE');
        
        dispatch(pageActions.list() as any);

        if(success){
            dispatch({type: pageConstants.constants().CREATE_RESET})
        }
    }, [dispatch, success])

    return (
        <div className="screen-documentation">
            {/* <Navigation />
             */}
                  <div className='navigation'>
            <div className="search">
            <i className='bx bx-search' ></i>
            <input type="text" placeholder='Quick Find' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            
            <h4>WORKSPACE</h4>
            <div className="pages">
                {loading? <LoadingBox /> : (
                    <div>
                        {pages.filter((page:any) => page.blocks[0].html.toLowerCase().includes(search.toLowerCase()))
                        .map((page: any) => 
                            (
                              <div className="page-item" key={page._id} onClick={() => {dispatch(pageActions.list() as any); setPageSelected({_id: page._id, fetchedBlocks: page.blocks, err: error})}}>
                              <i className='bx bx-file'></i>
                              <p className="page-title">{page.blocks[0].html} </p>
                              <button><i className="bx bx-trash" onClick={() => deleteHandler(page._id)}></i></button>
                              <div className="page-options"></div>
                          </div>
                            )
                        )}
                    </div>
                )}
               
            </div>

            <button onClick={() => createHandler()} className='new-page'><i className='bx bx-plus'></i> New page</button>
        </div>
        {pageSelected && (
            <EditablePage id={pageSelected?._id || ""} fetchedBlocks={pageSelected.fetchedBlocks} err={pageSelected?.err} />
        )}
        </div>
    )
}

export default DocumentationScreen;