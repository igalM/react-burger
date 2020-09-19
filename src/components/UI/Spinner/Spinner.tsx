import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner: React.FC = () => (
    <CircularProgress color="secondary" size={100} style={{ margin: 'auto' }} />
);

export default Spinner;