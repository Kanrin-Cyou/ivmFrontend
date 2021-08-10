import React from 'react';
import './mainpageController.style.scss';
import Modal from '../../components/modal/modal';
import Profile from '../../components/profile/profile'
import ViewController from './mainpageViewController';
import CircularProgress from '@material-ui/core/CircularProgress';

const hostAddress = 'http://localhost:3001';

class Mainpage extends React.Component{
    constructor(){
        super();
        this.state = {
            loading:false,
            loadingForm:false,
            searchfield:'',
            searchSelect:'',
            sortoption:'',
            formdata:'',
            formnav:'inventory',
            isProfileOpen:false,
        }
    }
    
    componentDidMount(){
        this.handlePost('','/form');
    }

    componentDidUpdate(){
        if(!this.state.loadingForm){this.handlePost('','/form')};
    }

    onSearchChange = (event) => {
        this.setState({searchfield:event.target.value})
    }

    onSetSearchSelect = (input) => {
        this.setState({searchSelect:input})
    }
    
    onSetFormNav = (whichform) => {
        if(this.state.searchSelect!==''){this.setState({searchSelect:''})}
        this.setState({loadingForm:false,formnav:whichform});
    }

    toggleModal = () => {
        this.setState(prevState => ({
          ...prevState,
          isProfileOpen: !prevState.isProfileOpen
        }))
    }

    handlePost = (datalist=[''],nav) => {
        let address = hostAddress + nav;
        fetch(address,{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "formnav":this.state.formnav,
                "datalist":datalist
            })})
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({formdata:data,loading:true,loadingForm:true})})
    }
    // "this" locates where the function is called 

    render(){

    if(this.state.loading){
        const isProfileOpen = this.state.isProfileOpen;
        const filterThings = this.state.formdata.filter(formdata => {
            let selector = this.state.searchSelect;
            if(formdata[selector]){
                return formdata[selector].toLowerCase().includes(this.state.searchfield.toLowerCase())
            } else {
                return formdata
            }
        });

        return(

            <div id='mainpage'>
 
                {isProfileOpen &&         
                    <Modal>
                        <Profile isProfileOpen={isProfileOpen} user={this.props.user} loadUser={this.props.loadUser} toggleModal={this.toggleModal}/>
                    </Modal>
                }
                <ViewController 
                    onRouteChange={this.props.onRouteChange} 
                    onSearchChange={this.onSearchChange}
                    onSetSearchSelect={this.onSetSearchSelect}
                    loading={this.state.loading} 
                    data={filterThings}
                    onSetFormNav={this.onSetFormNav}
                    formnav={this.state.formnav} 
                    handlePost = {this.handlePost}
                    toggleModal={this.toggleModal}
                    user = {this.props.user}
                />
            </div>
        );
    } else {
        return(
            <div id='mainpagerocessing'>
                <CircularProgress/>
            </div>
        )
    }
}
}

export default Mainpage;
