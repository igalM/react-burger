import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpError from '../../hooks/http-error';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, closeModal] = useHttpError(axios);

        return (
            <Fragment>
                <Modal show={error} hide={closeModal}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;