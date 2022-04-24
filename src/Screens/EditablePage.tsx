import { useEffect, useState } from "react";
import { uid } from "../utils/uid";
import usePrevious from "../utils/usePrevious";
import EditableBlock from "./EditableBlock";


interface Block {
    id: string,
    html: string,
    tag: string,
}

interface Props {

}

const initialBlock = { id: uid(), html: "", tag: "p" }

const EditablePage = (props: Props) => {

    const [blocks, setBlocks] = useState([initialBlock]);
    const [currentBlockId, setCurrentBlockId] = useState<any>();

    const prevBlocks = usePrevious(blocks);

    const addBlockHandler = (currentBlock: Block) => {
        setCurrentBlockId(currentBlock.id);
        const newBlock: any = { id: uid(), html: "", tag: "p" };
        const thisBlocks = blocks;
        const index = thisBlocks.map((b: Block) => b.id).indexOf(currentBlock.id);
        const updatedBlocks = [...thisBlocks];
        updatedBlocks.splice(index + 1, 0, newBlock);
        updatedBlocks[index] = { ...updatedBlocks[index], tag: currentBlock.tag, html: currentBlock.html }
        setBlocks(updatedBlocks);
    }

    useEffect(() => {
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
    }, [blocks, prevBlocks, currentBlockId])

    return (
        <div className="page">
            {blocks.map((block: any, key: number) => {
                const position =
                    blocks.map((b) => b.id).indexOf(block.id) + 1;
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
        </div>
    )
}

export default EditablePage;