import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
    logo: {
        padding: '8px',
        height: '50px',
        boxSizing: 'border-box',
        borderRadius: '5px'
    },
    img: {
        height: '100%'
    }
}));

const Logo: React.FC = () => {
    const classes = useStyles();

    return <div className={classes.logo}>
        <img className={classes.img} src={burgerLogo} alt="Logo" />
    </div>
};

export default Logo;