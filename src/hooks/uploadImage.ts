import axios from "axios";
import { useDispatch } from "react-redux";

const uploadHandler = async (e: any, imageField = "image", dispatch: any, setImage: any) => {

    const file = e.target.files[0];
    const bodyFormData = new FormData();

    bodyFormData.append('file', file);

    try {
        dispatch({ type: "UPLOAD_REQUEST" });

        const { data } = await axios.post("http://localhost:4500/upload-image", bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        dispatch({ type: "UPLOAD_SUCCESS" });
        setImage(data.secure_url);
    } catch (err) {
        console.log(err)
    }
}
