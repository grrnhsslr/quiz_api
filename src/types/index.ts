export type UserType = {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    confirm_password: string
}

export type QuestionType = {
    answer: string,
    author: string,
    created_on: string,
    id: number,
    question:string
}

export type QuestionFormDataType = {
    answer: string,
    author: string,
    created_on: string,
    id: number,
    question:string
}

export type UserFormDataType = {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    confirm_password: string
}