import React from 'react';
import clsx from 'clsx';
import InputForm from '../../components/inputForm/inputForm';
import ListGroup from '../../components/listgroup/listgroup';
import ProfileMenu from '../../components/profile/profileMenu';
import { fade,makeStyles,useTheme,Drawer,AppBar,Toolbar,List,CssBaseline,Typography,InputBase,Divider,IconButton,ListItem,ListItemIcon,ListItemText,MenuItem,Select,Box } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchIcon from '@material-ui/icons/Search';
import iconGenerator from './icon.jsx'
import sqlList from './sqlConstants.js'
import displayList from './displayConstant.js'
import drawerList from './drawerConstant.js'

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
  },

  appBar: {
    background: 'linear-gradient(to right, #7f7fd5, #86a8e7, #91eae4)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: 36,
  },

  hide: {
    display: 'none',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'wrap',
  },

  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

  select: {
    color:"white",
    minWidth: 120,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    paddingLeft: 10,
  },

  profile:{
    flexGrow:-1,
  }

}));

//MARK: - Using Material-UI Drawer VIEW

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState('');
  const [modifiedData,setModifiedData] = React.useState({});

  const formGenerator = (whatForm) => {
    const formComponent = whatForm.map((item,i) => { 
      return(
      <ListItem key={i} button className={classes.nested} onClick={()=>props.onSetFormNav(item[1])}>
                <ListItemIcon>
                  {iconGenerator[i]}
                </ListItemIcon>
                <ListItemText primary={item[0]} />
      </ListItem>)
    })

    return (
      <List component="div" disablePadding>
        {formComponent}
      </List>
  )}

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

    {/* MARK: - NavBar */}
        <AppBar
            position="fixed"
            className={
              clsx(classes.appBar, {[classes.appBarShift]: open,})
            }
          >
            
            <Toolbar>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                      [classes.hide]: open,
                    })}
                  >
                    <MenuIcon/>
                  </IconButton>
                  
                  <Typography variant="h6" noWrap>
                    Inventory Mangagement
                  </Typography>

                  <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search…"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={props.onSearchChange}
                      />
                  </div>

                  <div>
                    <Select
                      onChange={(e)=>{props.onSetSearchSelect(e.target.value)}}
                      defaultValue="" 
                      disableUnderline
                      className={classes.select}
                      inputProps={{ 'aria-label': 'Without label'}}
                    >
                      {sqlList[props.formnav].map((item,i) => {
                        if(item==='id'){return (null)
                        } else {
                          return (               
                          <MenuItem key={i} value={item}>{displayList[props.formnav][i]}</MenuItem>)
                        }
                      })}
                    </Select>
                  </div>


                  <ProfileMenu className={classes.Profile} 
                  user={props.user} 
                  Signout={props.onRouteChange} 
                  toggleModal={props.toggleModal}
                  style = {{display:"flex-end", marginRight: 100}}/>
          </Toolbar>
      </AppBar>

      {/* MARK: - Left Drawer*/}
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
                      <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                      </div>
                      <Divider />
                      {formGenerator(drawerList)}
      </Drawer>

      {/* MARK: - Tabel*/}

      <main className={classes.content}>
          <div className={classes.toolbar} />
            <Box>
              {openForm!=='' ? (<InputForm 
                formnav={props.formnav} 
                handlePost = {props.handlePost}
                modifiedData={modifiedData}
                openForm = {openForm}
                modifyHooker={setModifiedData}/>)
              : (null)}

              <ListGroup 
                loading={props.loading} 
                data={props.data ? props.data : ' '}
                formnav={props.formnav}
                setOpenForm={setOpenForm}
                openForm = {openForm}
                handlePost = {props.handlePost}
                modifyHooker={setModifiedData}
              />
            </Box>
      </main>

    </div>
  );
}
