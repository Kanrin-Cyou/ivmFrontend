import React from 'react';
import './mainpage.style.scss';
import Sidebar from '../../containers/sidebar/sidebar';
import CircularProgress from '@material-ui/core/CircularProgress';
import summaryForm from './constants';

class Mainpage extends React.Component{
    constructor(){
        super();
        this.state = {
            loading:false,
            loadingForm:false,
            searchfield:'',
            sortoption:'',
            formdata:'',
            formnav:'inventory'
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
    
    onSetFormNav = (whichform) => {
        this.setState({loadingForm:false,formnav:whichform});
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
        fetch('http://localhost:3001/modifyform',{
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

    // if (newform === ''){
    //     fetch('http://localhost:3001/form',{
    //         method: 'post',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //            "formnav":this.state.formnav,
    //         })})
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data);
    //             this.setState({formdata:data,loading:true,loadingForm:true})})
    // } else {
    //     fetch('http://localhost:3001/submit',{
    //         method: 'post',
    //         headers: {'Content-Type':'application/json'},
    //         body: JSON.stringify({
    //            "formnav":this.state.formnav,
    //            "data":newform
    //         })})
    //         .then(response => response.json())
    //         .then(data => {console.log(data)})
    // }

    // "this" locates where the function is called 

    render(){

    if(this.state.loading){
        // const filterThings = this.state.formdata.filter(formdata => {
        // return formdata.title.toLowerCase().includes(this.state.searchfield.toLowerCase())});

        return(
            <div id='mainpage'>
                <Sidebar 
                onRouteChange={this.props.onRouteChange} 
                onSearchChange={this.onSearchChange}
                loading={this.state.loading} 
                data={this.state.formdata}
                onSetFormNav={this.onSetFormNav}
                formnav={this.state.formnav}
                summaryForm={summaryForm}
                handleInputChange={this.onSubmitForm}
                onDeleteFrom={this.onDeleteFrom}
                />
            </div>
        );
    } else {
        return(
            <div id='mainpage'>
                <CircularProgress/>
            </div>
        )
    }
}
}

export default Mainpage;
