import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
      margin: theme.spacing(1),
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
          if (item.includes("id")){
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
 
    return (
      <form className={classes.root} noValidate autoComplete="off" >
            {formComponent}
            <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick = {changeSubmit}
                startIcon={<CloudUploadIcon />}
              >
                Upload
            </Button>

            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick = {changeUpdate}
              startIcon={<CloudUploadIcon />}
            >
                Modify
            </Button>
      </form>
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