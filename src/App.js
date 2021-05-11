import React, { Component } from 'react';
import './App.css';
import Signin from './pages/signin/signin';
import Mainpage from './pages/mainpage/mainpage';

class App extends Component{
  constructor(){
    super();
    this.state = {
      input:'',
      isSignedIn:false,
      route:'', //start point
      user:{
        id:'',
        name: '',
        email:'',
        joined: '',
        avatar:'',
      }
    }
  }

  loadUser = (data) =>{
    this.setState({user:{
      id:data.id,
      name: data.name,
      email: data.email,
      joined: data.joined,
      avatar: data.avatar,
    }})
  }

  // componentDidMount(){
  //   fetch('http://localhost:3001')
  //   .then(response=> response.json())
  //   .then(data => console.log(data))
  // }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn:false})
    } else if (route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});
  }



  render(){

    return(
      <div className="app">

        {/* <Mainpage className='Mainpage' onRouteChange={this.onRouteChange}/> */}
        {this.state.route === 'home'
          ? <Mainpage className='Mainpage' loadUser={this.loadUser} user={this.state.user} onRouteChange={this.onRouteChange}/>
          : <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        }
      </div>
    )
  }
}

export default App;
