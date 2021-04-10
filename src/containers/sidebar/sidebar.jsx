import React from 'react';
import clsx from 'clsx';
import { fade,makeStyles,useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputForm from '../form/form';
import ListGroup from '../listgroup/listgroup';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import FaceIcon from '@material-ui/icons/Face';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import LocalMallIcon from '@material-ui/icons/LocalMall';

const drawerWidth = 240;

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
    whiteSpace: 'nowrap',
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

  formControl: {
    position: 'relative',
    width: '100%',
    minWidth: 120,
  },

  selectEmpty: {
    color:"white",
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    paddingLeft:'20px',
  },

}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState('');
  const [modifiedData,setModifiedData] = React.useState({});

  const summaryList = [
    ["Customer","customer"],
    ["Supplyer","supplyer"],
    ["Goods","goods"],
    ["Inventory","inventory"],
    ["Imports","imports"],
    ["Imports Return","importsreturn"],
    ["Sales","sales"],
    ["Sales Return","salesreturn"]
    ]

  const iconGenerator = [
    <FaceIcon/>,
    <AssignmentIndIcon/>,
    <CardGiftcardIcon/>,
    <AmpStoriesIcon/>,
    <AddShoppingCartIcon/>,
    <MoneyOffIcon/>,
    <LocalMallIcon/>,
    <AssignmentReturnIcon/>,
  ]

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
              <FormControl className={classes.formControl}>
                  <Select
                    onChange={(e)=>{props.onSetSearchSelect(e.target.value)}}
                    defaultValue="" 
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                    {props.summaryForm[props.formnav].map((item,i) => {
                      if(item==='id'){ return (null)
                      } else {
                        return (<MenuItem key={i} value={item}>{item}</MenuItem>)
                      }
                    })}
                  </Select>
              </FormControl>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={props.onRouteChange}
                color="inherit"
              >
                <ExitToAppIcon />
              </IconButton>
            </div>

          </Toolbar>
      </AppBar>


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
                      {formGenerator(summaryList)}
      </Drawer>


      <main className={classes.content}>
        <div className={classes.toolbar} />
        {openForm!=='' ? (<InputForm 
          formnav={props.formnav} 
          summaryForm={props.summaryForm} 
          onFormSubmit={props.handleInputChange}
          onFormUpdate={props.handleInputUpdate}
          modifiedData={modifiedData}
          openForm = {openForm}
          modifyHooker={setModifiedData}/>)
        : (null)}

        <ListGroup 
          loading={props.loading} 
          data={props.data ? props.data : ' '}
          summaryForm={props.summaryForm}
          formnav={props.formnav}
          setOpenForm={setOpenForm}
          openForm = {openForm}
          onDeleteFrom={props.onDeleteFrom}
          modifyHooker={setModifiedData}
        />
      </main>

    </div>
  );
}
