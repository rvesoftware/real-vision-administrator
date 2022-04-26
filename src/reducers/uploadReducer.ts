export const uploadReducer = (state = {}, action: any) =>  {
    switch (action.type) {
      case "UPLOAD_REQUEST":
        return { loading: true };
      case "UPLOAD_SUCCESS":
        return { loading: false };
      default:
        return state;
    }
  };