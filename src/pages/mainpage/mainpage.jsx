import React from 'react';
import './mainpage.style.scss';
import summaryForm from './constants';
import Modal from '../../components/modal/modal';
import Profile2 from '../../components/profile/profile2'
import Sidebar from '../../components/sidebar/sidebar';
import CircularProgress from '@material-ui/core/CircularProgress';


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
        this.onSubmitForm();
    }

    componentDidUpdate(){
        if(!this.state.loadingForm){this.onSubmitForm()};
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

    

    onSubmitForm = (newform = '') => {
            fetch('http://localhost:3001/form',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                   "formnav":this.state.formnav,
                   "data":newform
                })})
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({formdata:data,loading:true,loadingForm:true})})
        }

    onDeleteFrom = (deletelist = ['']) => {
        fetch('http://localhost:3001/deletelist',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                   "formnav":this.state.formnav,
                   "deletelist":deletelist
                })})
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({formdata:data,loading:true,loadingForm:true})})
    }

    onModifyFrom = (modifyform = ['']) => {
        fetch('http://localhost:3001/modifylist',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                   "formnav":this.state.formnav,
                   "modifyform":modifyform
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
                        <Profile2 isProfileOpen={isProfileOpen} user={this.props.user} loadUser={this.props.loadUser} toggleModal={this.toggleModal}/>
                    </Modal>
                }
                <Sidebar 
                onRouteChange={this.props.onRouteChange} 
                onSearchChange={this.onSearchChange}
                onSetSearchSelect={this.onSetSearchSelect}
                loading={this.state.loading} 
                data={filterThings}
                onSetFormNav={this.onSetFormNav}
                formnav={this.state.formnav}
                summaryForm={summaryForm}
                handleInputChange={this.onSubmitForm}
                handleInputUpdate={this.onModifyFrom}
                onDeleteFrom={this.onDeleteFrom}
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
