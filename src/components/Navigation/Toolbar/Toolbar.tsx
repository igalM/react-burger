import React, { useContext } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DrawerContext } from '../../../contexts/drawer-context';

interface Props {
    isAuthenticated: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: '100%',
        },
        backgroundColor: '#703b09',
        zIndex: 1400,
    },
    logo: {
        [theme.breakpoints.up('sm')]: {
            flexGrow: 1
        }
    },
    desktopLinks: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        }
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    drawerStyles: {
        paddingLeft: '15px',
        paddingTop: '30px'
    },
    toolbarContainer: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'space-between'
        }
    }
}));

const ResponsiveDrawer: React.FC<Props> = ({ isAuthenticated }: Props) => {
    const classes = useStyles();
    const drawerContext = useContext(DrawerContext);

    const handleDrawerToggle = () => {
        drawerContext.toggleDrawer();
    }
    const drawer = (
        <div className={classes.drawerStyles}>
            <div className={classes.toolbar} />
            <NavigationItems isAuthenticated={isAuthenticated} />
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <div className={classes.toolbarContainer}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}>
                            <MenuIcon />
                        </IconButton>
                        <div className={classes.logo}>
                            <Logo />
                        </div>
                        <nav className={classes.desktopLinks}>
                            <NavigationItems isAuthenticated={isAuthenticated} />
                        </nav>
                    </div>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={drawerContext.showDrawer}
                        onClose={drawerContext.toggleDrawer}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true
                        }}>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default ResponsiveDrawer;
