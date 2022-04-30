import axios from "axios";
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

    const pageOne = useSelector((state: any) => state.pageOne);
    const { loading, error, data: page } = pageOne;


    const [blocks, setBlocks] = useState([...fetchedBlocks]);
    const [currentBlockId, setCurrentBlockId] = useState<any>();

    const prevBlocks = usePrevious(blocks);

    console.log(blocks)

    const addBlockHandler = (currentBlock: Block) => {
        setCurrentBlockId(currentBlock._id);
        const newBlock: any = { id: uid(), html: "", tag: "p" };
        const thisBlocks = blocks;
        const index = thisBlocks.map((b: Block) => b._id).indexOf(currentBlock._id);
        const updatedBlocks = [...thisBlocks];
        updatedBlocks.splice(index + 1, 0, newBlock);
        updatedBlocks[index] = { ...updatedBlocks[index], tag: currentBlock.tag, html: currentBlock.html }
        setBlocks(updatedBlocks);
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(pageActions.one(id) as any)    
        if (prevBlocks) {
            console.log(blocks)
            const nextBlockPosition = blocks.map((b) => b.id).indexOf(currentBlockId) + 2;
            console.log(blocks.map((b) => b.id).indexOf(currentBlockId));
            console.log(nextBlockPosition)
            const nextBlock = document.querySelector(
                `[data-position="${nextBlockPosition}"]`
            );

            if (nextBlock) {
                console.log(nextBlock);
                (nextBlock as HTMLFormElement).focus();
            }
        }

        const updatePageOnServer = async (blocks: any) => {
            try {
                dispatch(pageActions.update({_id: id, blocks: blocks}) as any)
            } catch (err) {
                console.log(err)
            }
        }

        if (prevBlocks && prevBlocks != blocks) {
            updatePageOnServer(blocks);
        }
    }, [blocks, prevBlocks, currentBlockId])

    return (
        <div className="page">

            {loading ? <LoadingBox /> : (
                <>
                    {blocks.map((block: any, key: number) => {
                        const position =
                            blocks.map((b) => b._id).indexOf(block._id) + 1;
                        return (

                            <EditableBlock
                                key={key}
                                id={block.id}
                                tag={block.tag}
                                html={block.html}
                                position={position}
                                addBlockHandler={() => addBlockHandler(block)}
                            />
                        )

                    })}

                </>
            )}


        </div>
    )
}

export default EditablePage;