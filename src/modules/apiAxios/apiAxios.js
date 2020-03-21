import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "https://accounts.stage.satoshkin.com/api/",
})


export const getUserData = {
    getEmail(){
        return instance.get("me").then(response => response.email)}

}