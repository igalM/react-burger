import React, { Component } from 'react';
import Input from "../../components/UI/Input/Input";
import Button from '../../components/UI/Button/Button';
import styles from './Auth.module.scss';
import * as actionsCreators from "../../store/actions";
import { connect } from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component {

    state = {
        authForm: {
            email: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                value: '',
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if (!this.props.isBuildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, el) => {
        const updatedControls = updateObject(this.state.authForm, {
            [el]: updateObject(this.state.authForm[el], {
                value: event.target.value,
                valid: checkValidity(this.state.authForm[el].validation, event.target.value),
                touched: true
            })
        });
        let formIsValid = true;
        for (let input in updatedControls) {
            formIsValid = updatedControls[input].valid && formIsValid;
        }
        this.setState({ authForm: updatedControls });
    }

    submitForm = (e) => {
        e.preventDefault();
        this.props.onSubmitAuth(
            this.state.authForm.email.value,
            this.state.authForm.password.value,
            this.state.isSignup);
    }

    changeAuthModeHandler = () => {
        this.setState(prevState => ({ isSignup: !prevState.isSignup }));
    }

    render() {
        const formElements = [];

        for (let key in this.state.authForm) {
            formElements.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        let form = <form onSubmit={(e) => this.submitForm(e)}>
            {formElements.map(el => {
                return <Input
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    valid={!el.config.valid}
                    shouldValidate={el.config.validation}
                    touched={el.config.touched}
                    changed={(event) => this.inputChangedHandler(event, el.id)}
                />
            })}
            <Button btnType="Success">SUBMIT</Button>
        </form>;

        if (this.props.loading) {
            form = <Spinner />;
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        let errorMsg = null;

        if (this.props.error) {
            errorMsg = <p>{this.props.error.message}</p>;
        }

        return (
            <div className={styles.Auth}>
                {authRedirect}
                {errorMsg}
                {form}
                <Button
                    clicked={this.changeAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    isAuthenticated: state.authReducer.token !== null,
    authRedirectPath: state.authReducer.authRedirectPath,
    isBuildingBurger: state.ingredientsReducer.isBuildingBurger
})

const mapDispatchToProps = dispatch => ({
    onSubmitAuth: (email, password, isSignup) => dispatch(actionsCreators.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actionsCreators.setAuthRedirectPath('/'))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
