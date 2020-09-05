import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import WrapperComponent from '../WrapperComponent/WrapperComponent';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

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
        }, [reqInterceptor, resInterceptor]);

        const closeModalHandler = () => setError(null);

        return (
            <WrapperComponent>
                <Modal show={error} hide={closeModalHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </WrapperComponent>
        )
    }
}

export default withErrorHandler;