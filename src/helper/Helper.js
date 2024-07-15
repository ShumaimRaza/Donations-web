import {HOST} from "../Constants";

export const getImageUrl = (path) => {
    if (path.includes("http")){
        return path;
    }else{
        return HOST + path;
    }
}