import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import WrapperComponent from '../WrapperComponent/WrapperComponent';

const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor() {
            super();

            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        state = {
            error: null
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeModalHandler = () => {
            this.setState({ error: null });
        }
        render() {
            return (
                <WrapperComponent>
                    <Modal show={this.state.error} hide={this.closeModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </WrapperComponent>
            )
        }


    }
}

export default WithErrorHandler;