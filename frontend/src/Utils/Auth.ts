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

export const logout = (navigate: NavigateFunction, setAuth: Function) => {
    http.post('/user/logout', {}, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((res) => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        setAuth(false)

        console.log(res.data)

        navigate('/login')
    }).catch((err) => {
        console.log(err)
    })
}

export const isAdmin = async () => {
    
    // let x = (async () => {
    //     let data = 'a';
    //     await http.get('/user/admin')
    //         .then((res) => {
    //             data = res.data;
    //             console.log(res.data);
    //             return res.data.admin
    //         }).catch((err) => {
    //             console.log(err);
    //             return false
    //         })
    //     console.log(data);
    //     return data;
    // })().then((res) => {
    //     console.log('pisk', res);
    // });
    // console.log('x', x);
    console.log('isAdmin called')
    const res = await http.get('/user/admin')
    return res.data.admin;
}