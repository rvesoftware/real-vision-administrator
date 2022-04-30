import Navigation from "../../../components/Documentation/Navigation";
import EditablePage from "../../EditablePage";
import '../../../styles/documentation.css'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingBox from "../../../components/LoadingBox";
import { useDispatch } from "react-redux";
import pageActions from "../../../actions/pageActions";

interface Page {
    _id?: string;
    fetchedBlocks?: any;
    err?: string;    
}

const DocumentationScreen = () => {

    const [pageSelected, setPageSelected] = useState<Page>();

    const pageList = useSelector((state: any) => state.pageList);
    const { loading, error, data: pages } = pageList;

    const pageCreate = useSelector((state: any) => state.pageCreate);
    const { loading: loadingCreate, error: errorCreate, success } = pageCreate;

    const dispatch = useDispatch();

    const createHandler = () => {
        const blocks = [{tag:'h2', html: "Untitle"}]

        dispatch(pageActions.create({blocks}) as any);
    }

    useEffect(() => {
        dispatch(pageActions.list() as any);
    }, [dispatch, success])
    return (
        <div className="screen-documentation">
            {/* <Navigation />
             */}
                  <div className='navigation'>
            <div className="search">
            <i className='bx bx-search' ></i>
            <input type="text" placeholder='Quick Find' />
            </div>
            
            <h4>Pages</h4>
            <div className="pages">

                {loading? <LoadingBox /> : (
                    <div>
                        {pages.map((page: any) => {
                            return (

                              <div className="page-item" key={page._id} onClick={() => setPageSelected({_id: page._id, fetchedBlocks: page.blocks, err: "No Error"} )}>
                              <i className='bx bx-file'></i>
                              <p className="page-title">{page.blocks[0].html}</p>
                              <div className="page-options"></div>
                          </div>
                            )
                        })}
                    </div>
                )}
               
            </div>

            <button onClick={() => createHandler()} className='new-page'><i className='bx bx-plus'></i> New page</button>
        </div>
        {pageSelected && (
            <EditablePage id={pageSelected?._id || ""}  fetchedBlocks={pageSelected?.fetchedBlocks} err={pageSelected?.err} />
        )}
        </div>
    )
}

export default DocumentationScreen;