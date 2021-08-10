import React from 'react';
import {Avatar,Button,CssBaseline,TextField,Link,Grid,Box,Typography,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { withStyles } from '@material-ui/core/styles';
import AlertDialog from '../../components/alertDialog/alertDialog'

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}

        <Link color="inherit">
            Globallan Ltd.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const useStyles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
});

class Signin extends React.Component{
    
    constructor(){
        super();
        this.state = {
            signUp:false,
            signUpName:'',
            signInEmail:'',
            signInPassword:'',
            alertContent:'',
            isAlertOpen:false
        }
    }

    onAlertOpen = (event) => {
        this.setState({isAlertOpen: false})
    }

    onPageChange = (event) => {
        console.log("changing")
        this.setState({signUp: !this.state.signUp})
    }

    onNameChange = (event) => {
        this.setState({signUpName: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('https://boiling-oasis-88028.herokuapp.com/signin',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json()).then(user => {
            if (user.id) {
                console.log(user)
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } 
        })
    }

    onSubmitSignUp = () => {
        fetch('https://boiling-oasis-88028.herokuapp.com/register',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                name:this.state.signUpName,
                password: this.state.signInPassword,

            })
        }).then(response => response.json()).then(res => {
            console.log(res)
            if (res === "success") {
                this.setState({signUp:false,alertContent:"Success! Please Sign in",isAlertOpen:true})
                console.log()
            } else {
                this.setState({alertContent:"Fail! Please Sign Up Again",isAlertOpen:true})
                console.log()
            }
        })
    }

    render(){
        const { classes } = this.props;
        return(
            <div className={"SignIn"}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            {this.state.signUp? <PersonAddIcon/> : <LockOutlinedIcon />}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {this.state.signUp? "Sign up" : "Sign in"}
                        </Typography>
                        <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.onEmailChange}
                        />
                        {this.state.signUp? <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="User Name"
                            name="User Name"
                            autoComplete="Name"
                            autoFocus
                            onChange={this.onNameChange}/> : null}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.onPasswordChange}
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        /> */}
                        <Button
                            onClick={this.state.signUp? this.onSubmitSignUp : this.onSubmitSignIn}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {this.state.signUp? "Sign up" : "Sign in"}
                        </Button>

                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={this.onPageChange}>
                                    {this.state.signUp? "Already have an account? Sign In":"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </Container>
                <AlertDialog onAlertOpen={this.onAlertOpen} isAlertOpen={this.state.isAlertOpen} alertContent={this.state.alertContent}/>
            </div>
        )}
} 

export default withStyles(useStyles)(Signin);


