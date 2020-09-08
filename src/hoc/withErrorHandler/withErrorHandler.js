import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import WrapperComponent from '../WrapperComponent/WrapperComponent';
import useHttpError from '../../hooks/http-error';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        const [error, closeModal] = useHttpError(axios);

        return (
            <WrapperComponent>
                <Modal show={error} hide={closeModal}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </WrapperComponent>
        )
    }
}

export default withErrorHandler;