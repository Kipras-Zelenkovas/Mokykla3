import { NavigateFunction } from "react-router-dom";
import { LoginData, RegisterData } from "../Interfaces/AuthDatas";
import { http } from "./HttpLinks";
import axios from 'axios';

export const register = (data: RegisterData, navigate: NavigateFunction) => {
    http.post('/user/register', {
        name: data.name,
        email: data.email,
        password: data.password,
        roles_id: data.role
    }).then((res) => {
        console.log(res.data)
        navigate('/login')
    }).catch((err) => {
        console.log(err)
    })
}

export const login = (data: LoginData, navigate: NavigateFunction, setAuth: Function) => {
    http.get('/sanctum/csrf-cookie')
    .then((res) => {
        http.post('/user/login', {
            email: data.email,
            password: data.password
        }).then((res) => {
            localStorage.setItem('token', res.data.token)

            http.get('/api/user', {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            }).then((res) => {
                localStorage.setItem('user', JSON.stringify(res.data))
                setAuth(true)
                navigate('/')
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

export const logout = (navigate: NavigateFunction, setAuth: Function, setAdmin: Function) => {
    http.post('/user/logout', {}, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        setAuth(false)
        setAdmin(false)

        console.log(res.data)

        navigate('/login')
    }).catch((err) => {
        console.log(err)
    })
}

export const isAdmin = async () => {
    const res = await http.get('/user/admin')
    if(res.data.message === 'Unauthenticated'){
        return false
    }
    return res.data.admin;
}

export const isLogged = async () => {
    const res = await http.get('/user/logged')
    if(res.data.message === 'Unauthenticated'){
        return false
    }
    return res.data.logged
}