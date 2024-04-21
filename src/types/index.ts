export type UserType = {
    admin?: null | boolean | undefined,
    created_on?: string,
    email: string,
    first_name: string,
    last_name: string,
    modified_on?: string,
    token: string,
    user_id: number
}

export type UserFormDataType = {
    email: string,
    first_name: string,
    last_name: string,
    password: string,
    confirm_password?: string
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
    question:string
}

export type loginFormDataType = {
    email: string,
    password: string
}

export type editUserFormData = {
    email?: string,
    first_name?: string,
    last_name?: string,
    password?: string,
    confirm_password?: string
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    tokenExpiration:string
}