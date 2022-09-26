export interface RegisterData{
    name: string,
    email: string,
    password: string,
    role: number
}

export interface LoginData{
    email: string,
    password: string
}

export interface AdminData{
    admin: boolean
}

