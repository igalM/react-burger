import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    navigationItems: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row'
        }
    }
}));

interface Props {
    isAuthenticated: boolean;
}

const NavigationItems: React.FC<Props> = ({ isAuthenticated }: Props) => {
    const { navigationItems } = useStyles();
    let authenticatedRoutes = <ul className={navigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
    </ul>;
    if (!isAuthenticated) {
        authenticatedRoutes = <ul className={navigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        </ul>;
    }
    return authenticatedRoutes;
};

export default NavigationItems;
