import React, {useEffect} from 'react';
import {TextField,makeStyles,Button,Box } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import displayConstant from '../../pages/mainpage/displayConstant.js'
import summaryForm from '../../pages/mainpage/sqlConstants.js'

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

export default function InputForm(props) {

  useEffect(() => {
    if(props.modifiedData[0]){
      changeModify(props.modifiedData[0]);
      props.modifyHooker({});
    }
  });

  const classes = useStyles();
  const [state, setState] = React.useState({});
  
  //MARK: - Create the state for each input field
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
    props.handlePost(state,'/form');
    setState({});
  }

  const changeUpdate = () => {
    props.handlePost(state,'/modifylist');
    setState({});
  }


  const formGenerator = (whatForm,displayForm) => {

  //MARK: - Generate the input form    
      const formComponent = whatForm.map((item,i) => {
          switch (true) {
            case item.includes("id"): 
              return null
            case item.includes("time"): return (
              <TextField
              id="datetime-local" 
              key={i}
              label={displayForm[i]}
              name={item}
              value={state[item] || ''}
              variant="outlined"
              type="datetime-local"
              className={classes.textField}
              InputLabelProps={{shrink: true}}
              onChange={changeHandler}/>
            )
            case item.includes("stock"): return (
              <TextField key={i} id="outlined-number" label={displayForm[i]} name={item} type="number" value={state[item] || ''} variant="outlined"  onChange={changeHandler}/>
            )
            default: return (
              <TextField key={i}  id={item} label={displayForm[i]} name={item} value={state[item] || ''} variant="outlined" onChange={changeHandler}/>
            )
          }
        })

//MARK: - Button that submits changes to form 
      const addButton = () => {
          return(
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick = {props.openForm==='add'? changeSubmit : changeUpdate}
                startIcon={<CloudUploadIcon />}
                style = {{width:100, height:55,marginLeft:10}}
              >
                {props.openForm==='add'? "Add" : "Modify"}
              </Button>
          )
    }    
 
//MARK: - Layout 
      return (
        <div style = {{display: "flex", alignItems: "center",marginBottom:20}}>
          <Box className={classes.root}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          noValidate
          autoComplete="off" >
                {formComponent}
          </Box>
          <Box className={classes.root} style={{marginRight:50}}>
                {addButton()}   
          </Box>
        </div>

    )
  }

  //MARK: - choose inventory as default
  const formdisplay = () => {
      if (summaryForm.hasOwnProperty(props.formnav)){
        return formGenerator(summaryForm[props.formnav],displayConstant[props.formnav])
      } else {
        return formGenerator(summaryForm["inventory"],displayConstant["inventory"])
      }
  }

  return formdisplay();
}