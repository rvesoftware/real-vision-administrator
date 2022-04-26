import axios from "axios";
import { useDispatch } from "react-redux";

export const uploadHandler = async (e: any, imageField: string) => {
    const dispatch = useDispatch();

    const file = e.target.files[0];
    const bodyFormData = new FormData();

    console.log(file)
    bodyFormData.append("file", file);
    try{
        dispatch({type: "UPLOAD_REQUEST"});
        const {data} = await axios.post("http://localhost:4500/image/upload", bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
              },
        });
        dispatch({type: "UPLOAD_SUCCESS"});
        return data.secure_url;
    }catch(err){
        console.log(err)
    }
}