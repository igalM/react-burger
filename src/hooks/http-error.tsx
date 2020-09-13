import { AxiosError, AxiosInstance } from 'axios';
import { useState, useEffect } from 'react';

export default (axios: AxiosInstance) => {
    const [error, setError] = useState<AxiosError | null>(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = axios.interceptors.response.use(res => res, error => {
        setError(error);
    });

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, [axios, reqInterceptor, resInterceptor]);

    const closeModalHandler = () => setError(null);

    return [error ? error.message : null, closeModalHandler];
}