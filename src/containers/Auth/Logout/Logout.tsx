import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import { Redirect } from 'react-router-dom';


const Logout: React.FC = () => {

    const dispatch = useDispatch();
    const onLogout = useCallback(() => dispatch(actions.authLogout()), [dispatch]);

    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to="/" />
}

export default Logout;