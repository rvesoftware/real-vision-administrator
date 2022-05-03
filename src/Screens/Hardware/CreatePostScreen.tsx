import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const CreatePostScreen = () => {

    const [text, setText] = useState();

    console.log(text)
    return (
        <>
            {/* <ReactQuill value={text} onChange={(e) => setText(e.valueOf)} /> */}
        </>
    )
}

export default CreatePostScreen;