import React, { useEffect, useState, useCallback } from 'react';
import styles from './Auth.module.scss';
import * as actionsCreators from "../../store/actions";
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../../components/UI/Input/Input';
import { CustomButton } from '../../components/UI/Button/Button';
import { User } from '../../types';
import { RootState } from '../../store/reducers';

const Auth: React.FC = props => {
    const [isSignup, setIsSignup] = useState(true);
    const [loadingAuthMode, setLoadingAuthMode] = useState(false);
    const values = { email: '', password: '', isSignup: isSignup };
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Must be a valid email')
            .required('Required'),
        isSignup: Yup.boolean()
    });

    const dispatch = useDispatch();

    const onSubmitAuth = (user: User) => dispatch(actionsCreators.auth(user));
    const onSetAuthRedirectPath = useCallback(() => dispatch(actionsCreators.setAuthRedirectPath('/')), [dispatch]);

    const loading = useSelector((state: RootState) => state.authReducer.loading);
    const error = useSelector((state: RootState) => state.authReducer.error);
    const isAuthenticated = useSelector((state: RootState) => state.authReducer.token !== null);
    const authRedirectPath = useSelector((state: RootState) => state.authReducer.authRedirectPath);
    const isBuildingBurger = useSelector((state: RootState) => state.ingredientsReducer.isBuildingBurger);


    useEffect(() => {
        if (!isBuildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [onSetAuthRedirectPath, isBuildingBurger, authRedirectPath]);

    const changeAuthModeHandler = () => {
        setLoadingAuthMode(true);
        setTimeout(() => {
            setIsSignup(!isSignup);
            setLoadingAuthMode(false);
        }, 200);
    };

    let form = <div>
        <Formik
            onSubmit={(values) => {
                onSubmitAuth(values);
            }}
            initialValues={values}
            validationSchema={validationSchema}>
            <Form>
                <InputField formikKey="email" label="Your Email" />
                <InputField formikKey="password" label="Your Password" type="password" />
                <CustomButton
                    type="submit"
                    className="success">
                    SUBMIT
                </CustomButton>
                {isSignup ? <h5>Already registered? Click <u onClick={changeAuthModeHandler}>Here</u></h5>
                    : <h5>Don't have an account? Click <u onClick={changeAuthModeHandler}>Here</u> to Sign Up</h5>}
            </Form>
        </Formik>
    </div>

    if (loading || loadingAuthMode) {
        form = <Spinner />;
    }

    let authRedirect = null;

    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />
    }

    return (
        <div className={styles.Auth}>
            <h2>{isSignup ? 'Sign Up'
                : 'Log In'}</h2>
            {authRedirect}
            {error ? error : null}
            {form}
        </div>
    )
}

export default Auth;
