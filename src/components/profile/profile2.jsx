import React from 'react';
import './profile2.scss';
import {Avatar,Button,CssBaseline,TextField,Typography,makeStyles,Paper} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: theme.spacing(8),
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
        margin: theme.spacing(2, 1, 1),
        primary: "#2196f3",
        secondary: "#ff1744",
    },

    large: {
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    }));
      
function ProfileUpdate(props) {
    const classes = useStyles();
    return (
        <Paper elevation={3} component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.large} alt={props.user.name} src={props.user.avatar} aria-controls="profile-menu" aria-haspopup="true"/>
                <Typography component="h1" variant="h5">
                    {props.user.name}
                </Typography>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    width="50%"
                    id="name"
                    label="Name"
                    name="Name"
                    autoFocus
                    onChange={props.onNameChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    width="50%"
                    name="age"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={props.onPasswordChange}
                />
                <div>
                    <Button
                        onClick={props.onSubmitProfileUpdate}
                        width="50%"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        UPDATE
                    </Button>
                    <Button
                        width="50%"
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={props.toggleModal}
                    >
                        CANCEL
                    </Button>
                </div>
            </div>
        </Paper>
    );
    }

class Profile2 extends React.Component{

    constructor(){
        super();
        this.state = {
            updateName:'',
            updatePassword:''
        }
    }

    onNameChange = (event) => {
        this.setState({updateName: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({updatePassword: event.target.value})
    }

    onSubmitProfileUpdate = () => {
        console.log(this.props.user.email);
        fetch('http://localhost:3001/profileUpdate',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.updateName,
                email:this.props.user.email,
                password: this.state.updatePassword
            })
        }).then(response => response.json()).then(user => {
            if (user.id) {
                console.log(user)
                this.props.loadUser(user);
            } 
        })
    }

    render(){
        return(
            <div className="profile-modal">
                <ProfileUpdate 
                className={"SignIn"}
                user = {this.props.user}
                toggleModal={this.props.toggleModal}
                onNameChange={this.onNameChange}
                onPasswordChange={this.onPasswordChange}
                onSubmitProfileUpdate={this.onSubmitProfileUpdate}/>
            </div>
        )
    }
}

export default Profile2;