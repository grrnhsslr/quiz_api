import axios from 'axios';
import { QuestionType, UserFormDataType, UserType } from '../types';


const baseURL:string = 'https://cae-bookstore.herokuapp.com/';
const userEndpoint: string = '/user';
const postEndpoint: string = '/question/all';


const apiClientNoAuth = () => axios.create({
    baseURL: baseURL

})

type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>>{
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }
        else {
            error = 'something went wrong'
        }
    }
    return { data, error }
}

async function getAllQuestions(): Promise<APIResponse<{questions : QuestionType[]}>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(postEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        }
        else {
            error = 'something went wrong'
        }
    }
    return { data, error }
}

export {
    register,
    getAllQuestions,
}