export type EmailSignUpRequest = {
    name: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string,
}

export type EmailSignInRequest = {
    username: string,
    password: string,
}

export type SignSuccessResponse = {
    message: string,
    token: string,
    error?: string
}
