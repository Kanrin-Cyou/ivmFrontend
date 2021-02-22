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
            searchfield:'',
            sortoption:'',
            formdata:'',
            formnav:'inventoryForm',
        }
    }
    
    componentDidMount(){
        this.onSubmitForm();
        // // fetch('http://localhost:3001/mainpage',{
        // //     method: 'post',
        // //     headers: {'Content-Type':'application/json'},
        // //     body: JSON.stringify({
        // //         hello:'hello'
        // //     })})
        // //     .then(response => response.json())
        // //     .then(data => {this.setState({formdata:data, loading:true})})
    }

    onSearchChange = (event) => {
        this.setState({searchfield:event.target.value})
    }
    
    onSetFormNav = (whichform) => {
        this.setState({formnav:whichform});
        this.onSubmitForm();
    }

    onSubmitForm = (newform="hello") => {
        fetch('http://localhost:3001/form',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
               "formnav":this.state.formnav,
               "data":newform
            })})
            .then(response => response.json())
            .then(data => {this.setState({formdata:data, loading:true})})
    }

    // "this" locates where the function is called 

    render(){

    if(this.state.loading){
        console.log(this.state.formdata)
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
