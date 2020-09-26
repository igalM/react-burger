import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { DrawerContext } from '../../../../contexts/drawer-context';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) => createStyles({
    navigationItem: {
        margin: '10px 0',
        boxSizing: 'border-box',
        display: 'block',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            margin: 0,
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            width: 'auto'
        }
    },
    navLink: {
        color: ' #8f5c2c',
        textDecoration: 'none',
        width: '100%',
        boxSizing: 'border-box',
        display: 'block',
        '&:active': {
            color: '#40a4c8'
        },
        [theme.breakpoints.up('sm')]: {
            color: 'white',
            height: '100%',
            padding: '16px 10px',
            borderBottom: '4px solid transparent',
            '&:active': {
                backgroundColor: '#8f5c2c',
                borderBottom: '4px solid #40a4c8',
                color: 'white'
            }
        }
    },
    active: {
        color: '#40a4c8',
        [theme.breakpoints.up('sm')]: {
            backgroundColor: '#8f5c2c',
            borderBottom: '4px solid #40a4c8',
            color: 'white'
        }
    }
}));

interface Props {
    exact?: boolean,
    link: string,
    children: React.ReactNode
}

const NavigationItem: React.FC<Props> = ({ exact, link, children }) => {
    const classes = useStyles();

    const { toggleDrawer, isMobile } = useContext(DrawerContext);
    const handleLinkClicked = () => isMobile ? toggleDrawer() : null;

    return <li className={classes.navigationItem}>
        <NavLink
            className={classes.navLink}
            onClick={handleLinkClicked}
            exact={exact}
            activeClassName={classes.active}
            to={link}>{children}
        </NavLink>
    </li>
};

export default NavigationItem;