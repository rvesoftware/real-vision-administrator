import constantsTemplate from "../constants/constantsTemplate"
import reducerTemplate from "./reducersTemplate";

const pageConstants = new constantsTemplate("PAGE");
const pageReducer = new reducerTemplate({constants: pageConstants});

const pageMoreReducer = ( state= {data: []} , action: any) => {
    switch (action.type) {
      case "EDIT_PAGE_NAME":
        const index = state.data.findIndex((x:any) => x._id === action.payload.id);
        const newPages: any = [...state.data];
        newPages[index].blocks[0].html = action.payload.name;

        return newPages;

      default:
        return state;
    }
  };

export default pageReducer;