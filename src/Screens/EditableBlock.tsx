import { createRef, useEffect, useState } from "react";
import ContentEditable from "react-contenteditable";
import getCaretCoordinates from "../components/getCaretCoordinates ";
import SelectMenu from "../components/selectMenu";


interface Props{
    id: string;
    html: string;
    tag: string;
    position: number;
    addBlockHandler: Function
}

const EditableBlock = (props: Props) => {
    const contentEditable = createRef();
    const [html, setHtml] = useState("");
    const [tag, setTag] = useState("p");
    const [htmlBackup, setHtmlBackup] = useState("");
    const [previosKey, setPreviousKey] = useState(null);
    const [addPlaceholder, setAddPlaceholder] = useState({})
    const [placeholder, setPlaceholder] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [selectMenuIsOpen, setSelectMenuIsOpen] = useState(false);
    const [selectMenuPosition, setSelectMenuPosition] = useState({x: null, y:null});

    const addPlaceholderHandler = ({block, content, position} : any) => {
        const isFirstBlockWithout = position === 1 && !content;
        const isFirstBlockWithoutSibling = !block?.parentElement?.nextElementSibling;
        if(isFirstBlockWithout && isFirstBlockWithoutSibling) {
            setHtml("Untitled");
            setTag("h1");
            setPlaceholder(true);
            return true;
        }else{
            return false;
        }
    }

    useEffect(() => {
        console.log("Current", contentEditable.current)
        const hasPlaceholder = addPlaceholderHandler({
            block: contentEditable.current,
            position: props.position,
            content: props.html
        });
    
        if(!hasPlaceholder){
            setHtml(props.html);
            setTag(props.tag);
        }
    }, [])

    const handleFocus = () => {
        if(placeholder){
            setHtml("");
            setPlaceholder(false);
            setIsTyping(true);
        }
    }
    const onKeyDownHandler = (e: any) => {        
        if(e.key === "/"){
            setHtmlBackup(html);
        }

        if(e.key === "Enter" && previosKey !== "Shift" ){
                e.preventDefault();
                props.addBlockHandler({id: props.id, html: html, tag: tag, ref: contentEditable.current});
        }
        // if(e.key === "Backspace" && !html){
        //     e.preventDefault();
        // }

        setPreviousKey(e.key);
    }


    const OpenMenuSelectHandler = () => {
        const {x, y} = getCaretCoordinates();
        setSelectMenuIsOpen(true);
        setSelectMenuPosition({x:null, y: null});
        // document.addEventListener("click", )
    }

    const onKeyUpHandler = (e: any) => {
        if (e.key === "/") {
          OpenMenuSelectHandler();
        }
      }
        
    return(
        <>
        {selectMenuIsOpen && (
            <SelectMenu position={selectMenuPosition} />
        )}
        <ContentEditable 
            innerRef={() => contentEditable}
            data-position={props.position}
            className={["block", placeholder? " placeholder": ""].join("")}
            html={html}
            tagName={tag}
            onChange={(e) => setHtml(e.target.value)}
            onKeyDown={(e) => onKeyDownHandler(e)}
            onFocus={handleFocus}
            onKeyUp={(e) => onKeyUpHandler(e)}
        />
        </>

    )
}

export default EditableBlock;