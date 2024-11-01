import  ResponseDto  from "../apis/response";

const ResponseBody = (data) => {
    return data || ResponseDto || null;
};

export default ResponseBody;
