import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import pageActions from "../actions/pageActions";
import LoadingBox from "../components/LoadingBox";
import { uid } from "../utils/uid";
import usePrevious from "../utils/usePrevious";
import EditableBlock from "./EditableBlock";

interface Block {
    _id: string,
    html: string,
    tag: string,
}

interface Props {
    id: string;
    fetchedBlocks: any;
    err: any;
}

const EditablePage = ({ id, fetchedBlocks, err }: Props) => {

    if (err) {
        return (
          <div className="error" key={err}>
            <h3>Something went wrong 💔</h3>
            <p>Have you tried to restart the app at '/' ?</p>
            <p>{err}</p>
          </div>
        );
      }

      const initialBlock = { id: uid(), html: "", tag: "p" };

    const pageOne = useSelector((state: any) => state.pageOne);
    const { loading, error, data: page } = pageOne;
    const dispatch = useDispatch();


    const [blocks, setBlocks] = useState([initialBlock]);
    const [newBlocks, setNewBlocks] = useState({});
    const [currentBlockId, setCurrentBlockId] = useState<any>();

    const prevBlocks: any = usePrevious(blocks);

    useEffect(() => {
        const updatePageOnServer = async (blocks: any) => {
            try {
                dispatch(pageActions.update({_id: id, blocks: blocks}) as any)
            } catch (err) {
                console.log(err)
            }
        }

        // if (prevBlocks && prevBlocks != blocks) {
        //     console.log("HIRE")
        //     updatePageOnServer(newBlocks);
        // }

    }, [blocks, prevBlocks]);


    useEffect(() => {
        if (prevBlocks && prevBlocks.length + 1 === blocks.length ) {
            const nextBlockPosition = blocks.map((b: any) => b._id).indexOf(currentBlockId) + 1 + 1;
            const nextBlock = document.querySelector(
                `[data-position="${nextBlockPosition}"]`
            );

            if (nextBlock) {
                (nextBlock as HTMLFormElement).focus();
            }
        }

        // dispatch(pageActions.one(id) as any);
    }, [blocks, prevBlocks, currentBlockId])


    const updateBlockHandler = (currentBlock: Block) => {
        const index = blocks.map((b: any) => b.id).indexOf(currentBlock._id);
        const oldBlock = blocks[index];
        const updatedBlocks = [...blocks];
        updatedBlocks[index] = {...updatedBlocks[index], tag: currentBlock.tag, html: currentBlock.html }
        console.log("THIS IS UPDATED", updatedBlocks)
        setNewBlocks(updatedBlocks);
        console.log("UPDATE BLOCKS", newBlocks)
    }



    const addBlockHandler = (currentBlock: any) => {
        setCurrentBlockId(currentBlock._id);
        const index = blocks.map((b: any) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...blocks];
        const newBlock: any = {html: "", tag: "h1" };
        updatedBlocks.splice(index + 1, 0, newBlock)
        updatedBlocks[index] = { ...updatedBlocks[index], tag: currentBlock.tag, html: currentBlock.html }
        setBlocks(updatedBlocks);
    }



    return (
        <div className="page">

            {loading ? <LoadingBox /> : (
                <>
                    {blocks.map((block: any) => {
                        const position = blocks.map((b:any) => b._id).indexOf(block._id) + 1;
                        return (
                            <EditableBlock
                                key={block._id}
                                id={block._id}
                                tag={block.tag}
                                html={block.html}
                                position={position}
                                updateBlockHandler={updateBlockHandler}
                                addBlockHandler={addBlockHandler}
                            />
                        )

                    })}

                </>
            )}


        </div>
    )
}

export default EditablePage;