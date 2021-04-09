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
            searchSelect:'',
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

    onSetSearchSelect = (input) => {
        this.setState({searchSelect:input})
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

        const filterThings = this.state.formdata.filter(formdata => {
            let selector = this.state.searchSelect;
            if(formdata[selector]){
                return formdata[selector].toLowerCase().includes(this.state.searchfield.toLowerCase())
            } else {
                return formdata
            }
        });

        // const filterThings = this.state.formdata.filter(formdata => {
        //     return formdata.sku.toLowerCase().includes(this.state.searchfield.toLowerCase())
        // });
        

        return(
            <div id='mainpage'>
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
