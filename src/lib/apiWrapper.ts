import axios from 'axios';
import {QuestionType, UserFormDataType, UserType, QuestionFormDataType, editUserFormData} from '../types';


const baseURL:string = 'https://cae-bookstore.herokuapp.com/';
const userEndpoint: string = '/user';
const questionEndPoint: string = '/question';
const loginEndpoint: string = '/login';

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL

})

const apiClientBasicAuth = (email: string, password:string)=>
    axios.create({
        baseURL: baseURL,
        headers: {
            Authorization: 'Basic ' + btoa(email + ':' + password)
        }
    })

const apiClientTokenAuth =(token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
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

async function login(email:string, password:string):Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint)
        data = response.data
    }
    catch(err){
        if (axios.isAxiosError(err))
            error = err.response?.data.error
        else {
            error = 'Something went wrong'
        }
    }

    return {data, error}
}

async function getAllQuestions(): Promise<APIResponse<{questions : QuestionType[]}>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(questionEndPoint + '/all');
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

async function createQuestion(token:string, questionData:QuestionFormDataType): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(questionEndPoint, questionData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getQuestionById(questionId:string|number): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().get(questionEndPoint + '/' + questionId)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error || `Post with ID ${questionId} does not exist`
        } else {
            error = 'Something Went Wrong'
        }
    }
    return { data, error }
}

async function editQuestionById(questionId:string|number, token:string, editedQuestionData:QuestionFormDataType): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(questionEndPoint + '/' + questionId, editedQuestionData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error || `Question with ID ${questionId} does not exist`
        } else {
            error = 'Something Went Wrong'
        }
    }
    return { data, error }
}

async function deleteQuestionById(questionId:string|number, token:string): Promise<APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(questionEndPoint + '/' + questionId)
        data = response.data.success
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data?.error || `question with ID ${questionId} does not exist`
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editUserById(token:string, userData:editUserFormData): Promise<APIResponse<editUserFormData>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, userData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteUserById(token:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

export {
    register,
    getAllQuestions,
    createQuestion,
    getQuestionById,
    editQuestionById,
    deleteQuestionById,
    login,
    editUserById,
    deleteUserById
}