import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useAuth(code) {
    
        const [ accessToken, setAccessToken] = useState()
        const [ refreshToken, setRefreshToken] = useState()
        const [ expiresIn, setExpiresIn] = useState()

    useEffect(() => {
        if (!code) {return}
        axios
            .post('http://localhost:3002/login', {
                code,
            })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)            
                setExpiresIn(res.data.expiresIn)
                // setExpiresIn(61)
                window.history.pushState({}, null, '/')
            })
            .catch(() => {
                window.location = '/'
        })

    }, [code])

    useEffect(() => {
        if (!code || !refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
            .post('http://localhost:3002/refresh', {
                refreshToken,
            })
            .then(res => {
                // setAccessToken(res.data.accessToken)            
                setExpiresIn(res.data.expiresIn)
                setExpiresIn(61)
            })
            .catch(() => {
                window.location = '/'
            })
        }, ((expiresIn - 60) * 1000))

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}
