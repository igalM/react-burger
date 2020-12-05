import { AxiosInstance } from 'axios';
import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpError from '../../hooks/http-error';

const WithErrorHandler = <C extends object>(
    WrappedComponent: React.ComponentType<C>,
    axios: AxiosInstance) => {
    const WithModal: React.FC<C> = (props: C) => {
        const [error, closeModal] = useHttpError(axios);
        const closeHandler = () => closeModal;
        return (
            <Fragment>
                <Modal open={error ? true : false} closeHandler={closeHandler}>
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
    return WithModal;
}

export default WithErrorHandler;