import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {makeStyles} from '@material-ui/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';
function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: "3em",
        [theme.breakpoints.down("md")]: {
            marginBottom: "2em",
        },
        [theme.breakpoints.down("xs")]: {
            marginBottom: "1.25em",
        }
    },
    logo: {
        height: "8em",
        [theme.breakpoints.down("md")]: {
            height: "7em"
        },
        [theme.breakpoints.down("xs")]: {
            height:"5.5em"
        }
    },
    logoContainer: {
        padding: 0,
        "&:hover":{
            backgroundColor: "transparent"
        }
    },
    tabContainer: {
        marginLeft: "auto"
    },
    tab: {
        ...theme.typography.tab,
        minWidth: 10,
        marginLeft: "25px"
    },
    button: {
        ...theme.typography.estimate,
        borderRadius: "50px",
        marginLeft: "50px",
        marginRight: "25px",
        height: "45px"
    },
    menu:{
        backgroundColor:theme.palette.common.blue,
        color:"white",
        borderRadius: "0"
    },
    menuItem: {
        ...theme.typography.tab,
        opacity:0.7,
        "&:hover":{
            opacity:1
        }
    },
    drawer:{
        backgroundColor:theme.palette.common.blue
    },
    drawerIcon:{
        height:"50px",
        width:"50px"
    },
    drawerIconContainer: {
        marginLeft: "auto",
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    drawerItem: {
        ...theme.typography.tab,
        color:"white",
        opacity:0.7
    },
    drawerItemSelected: {
        "& .MuiListItemText-root":{
            opacity:1
        }        
    },
    drawerItemEstimate: {
        backgroundColor: theme.palette.common.orange
    },
    appbar:{
        zIndex:theme.zIndex.modal + 1
    }
}));

export default function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);    
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    
    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    }; 
    const handleClick = (e) => {
       setAnchorEl(e.currentTarget);
       setOpenMenu(true);       
    };
    const handleMenuItemClick = (e, i) => {
        setAnchorEl(null);        
        setOpenMenu(false);
        setSelectedIndex(i);
    }
    const handleClose = () => {
        setAnchorEl(null);
        setOpenMenu(false);
    }
    const headerOptions = [{name:"Home", link:"/"}, {name:"Services", link:"/services"},{name:"The Revolution", link:"/revolution"}, {name:"About Us", link:"/about"},{name:"Contact Us", link:"/contact"}];
    
    const menuOptions = [{name:"Services", link:"/services"},{name:"Custom Software Development", link:"/customsoftware"}, {name:"Mobile App Development", link:"/mobileapps"}, {name:"Website Development", link:"/websites"}];

    useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                if (value !==0) {
                    setValue(0);
                }
                break;
            case "/services":
                if (value !==1) {
                    setValue(1);
                    setSelectedIndex(0);
                }
                break;
            case "/customsoftware":
                if (value !==1) {
                    setValue(1);
                    setSelectedIndex(1);
                }
                break;
            case "/mobileapps":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(2);
                }
                break;
            case "/websites":
                if (value !== 1) {
                    setValue(1);
                    setSelectedIndex(3);
                }
                break;
            case "/revolution":
                if (value !== 2) {
                    setValue(2);
                }
                break;
            case "/about":
                if (value !== 3) {
                    setValue(3);
                }
                break;
            case "/contact":
                if (value !== 4) {
                    setValue(4);
                }
                break;
            default:
                setValue(0);
                
        }
    },[value]);  
    const tabs = (
        <React.Fragment>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.tabContainer} indicatorColor="primary">
                { headerOptions.map((option,i) => {
                    return (option.name==="Services") ? 
                        (<Tab className={classes.tab} key={`${option}-${i}`} component={Link} 
                            to={option.link} label={option.name} 
                            aria-owns={anchorEl ? "simple-menu" : undefined}
                            aria-haspopup={anchorEl ? true : undefined}
                            onMouseOver={(event) => handleClick(event)}/>) :
                        (<Tab className={classes.tab} key={`${option}-${i}`} component={Link} to={option.link} label={option.name}/>)                
                    }          
                )}
            </Tabs>
            <Button variant="contained" color="secondary" className={classes.button}>Free Estimate</Button>
            <Menu id="simple-menu" open={openMenu} anchorEl={anchorEl} classes={{paper: classes.menu}} onClose={handleClose} MenuListProps={{onMouseLeave:handleClose}} elevation={0} style={{zIndex:1302}} keepMounted>
                {menuOptions.map((option,i) => (
                    <MenuItem key={`${option}_${i}`} component={Link} to={option.link} classes={{root:classes.menuItem}} onClick={(event)=>{handleMenuItemClick(event, i);setValue(1);handleClose();}} selected={i === selectedIndex && value === 1} >{option.name}</MenuItem>
                ))}
            </Menu>
        </React.Fragment>
    );
   const drawer = (
        <React.Fragment>
            <SwipeableDrawer disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose={()=> setOpenDrawer(false)} onOpen={()=> setOpenDrawer(true)} classes={{paper:classes.drawer}}>
                <div className={classes.toolbarMargin}></div>
                    <List disablePadding className={classes.drawerMargin}>                    
                        {headerOptions.map((option,i) => (
                            <ListItem divider button key={`${option}${i}`} component={Link} to={option.link} onClick={()=>{setOpenDrawer(false); setValue(i);}} selected={value === i} classes={{selected:classes.drawerItemSelected}}>
                                <ListItemText disableTypography className={classes.drawerItem}>{option.name}</ListItemText>
                            </ListItem>
                        )
                        )}
                        <ListItem divider button component={Link} to="/estimate" onClick={()=>{setOpenDrawer(false); setValue(5);}} selected={value === 5} classes = {{root:classes.drawerItemEstimate, selected:classes.drawerItemSelected}} >
                            <ListItemText disableTypography className={classes.drawerItem}>Free Estimate </ListItemText>
                        </ListItem>
                    </List>
            </SwipeableDrawer>
            <IconButton className={classes.drawerIconContainer} onClick={() => setOpenDrawer(!openDrawer)} disableRipple>
                <MenuIcon className={classes.drawerIcon}/>
            </IconButton>
        </React.Fragment>
    );
     return (
         <React.Fragment>
            <ElevationScroll>
                <AppBar position="fixed" color="primary" className={classes.appbar}>
                    <Toolbar disableGutters>
                        <Button component={Link} to="/" className={classes.logoContainer} onClick={()=>setValue(0)} disableRipple>
                            <img alt="company logo" className={classes.logo} src={logo} />
                        </Button>
                        {matches ? drawer:tabs}
                        
                        
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <div className={classes.toolbarMargin} />
         </React.Fragment>
     )
}