import React, {useEffect} from 'react';
import {TextField,makeStyles,Button,Box } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },

    button: {
      margin: theme.spacing(2),
    },
  },
}));

export default function FormPropsTextFields(props) {

  useEffect(() => {
    if(props.modifiedData[0]){
      changeModify(props.modifiedData[0]);
      props.modifyHooker({});
    }
  });

  const classes = useStyles();
  const [state, setState] = React.useState({});
  const changeHandler = (e) => {
    setState((prev) => ({
     ...prev,
      [e.target.name]: e.target.value
    }))
  }; 

  const changeModify = (modifydata) => {
    setState(modifydata);
  } 

  const changeSubmit = () => {
    props.onFormSubmit(state);
    setState({});
  }

  const changeUpdate = () => {
    props.onFormUpdate(state);
    setState({});
  }

  const formGenerator = (whatForm) => {

      const formComponent = whatForm.map((item,i) => {
          if (item.includes("id")){ return(null)
          }
          else if (item.includes("time")){
            return (<TextField
                id="datetime-local" 
                key={i}
                label={item}
                name={item}
                value={state[item] || ''}
                variant="outlined"
                type="datetime-local"
                className={classes.textField}
                InputLabelProps={{shrink: true}}
                onChange={changeHandler}/>)
          } else if (item.includes("stock")){
            return (<TextField key={i} id="outlined-number" label={item} name={item} type="number" value={state[item] || ''} variant="outlined"  onChange={changeHandler}/>)
          } else {
            return (<TextField key={i}  id={item} label={item} name={item} value={state[item] || ''} variant="outlined" onChange={changeHandler}/>)
          }
      })

      const addButton = () => {
        if(props.openForm==='add'){
            return(
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick = {changeSubmit}
                  startIcon={<CloudUploadIcon />}
                >
                    Add
                </Button>
            )
        } else {
            return(<Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick = {changeUpdate}
              startIcon={<CloudUploadIcon />}
              >
                Modify
              </Button>)
        }
    }    
 
    return (
      <Box className={classes.root}
      display="flex" 
      alignItems="center"
      noValidate
      autoComplete="off" >
            {formComponent}
            {addButton()}    
      </Box>
    )}

  const formdisplay = () => {
      if (props.summaryForm.hasOwnProperty(props.formnav)){
        return formGenerator(props.summaryForm[props.formnav])
      } else {
        return formGenerator(props.summaryForm["inventory"])
      }
  }

  return formdisplay();
}