import Navigation from "../../../components/Documentation/Navigation";
import EditablePage from "../../EditablePage";
import '../../../styles/documentation.css'

const DocumentationScreen = () => {
    return (
        <div className="screen-documentation">
            <Navigation />
            <EditablePage />
        </div>
    )
}

export default DocumentationScreen;