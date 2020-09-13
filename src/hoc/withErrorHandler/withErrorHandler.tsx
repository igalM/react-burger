import { AxiosInstance } from 'axios';
import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpError from '../../hooks/http-error';

function withErrorHandler<C>(WrappedComponent: React.ComponentType<C>, axios: AxiosInstance) {
    return (props: C) => {
        const [error, closeModal] = useHttpError(axios);

        const closeHandler = () => closeModal;

        return (
            <Fragment>
                <Modal open={error ? true : false} closeHandler={closeHandler}>
                    {error}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;