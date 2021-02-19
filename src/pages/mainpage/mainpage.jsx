import React from 'react';
import './mainpage.style.scss';
import MiniDrawer from '../../containers/sidebar/sidebar';
import CircularProgress from '@material-ui/core/CircularProgress';


class Mainpage extends React.Component{
    constructor(){
        super();
        this.state = {
            loading:false,
            searchfield:'',
            sortoption:'',
            result:null,
            formnav:'inventoryForm',
            formsubmit:null
        }
    }
    
    componentDidMount(){
        fetch('http://localhost:3001/mainpage',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                hello:'hello'
            })})
            .then(response => response.json())
            .then(data => {this.setState({result:data, loading:true})})
    }

    onSearchChange = (event) => {
        this.setState({searchfield:event.target.value})
    }
    
    onSetFormNav = (whichform) => {
        this.setState({formnav:whichform})
    }

    handleSubmit(newform) {
        console.log(newform);
     }

    // "this" locates where the function is called 

    render(){

    if(this.state.loading){
        const filterThings = this.state.result.filter(result => {
        return result.title.toLowerCase().includes(this.state.searchfield.toLowerCase())});

        return(
            <div id='mainpage'>
                <MiniDrawer 
                onRouteChange={this.props.onRouteChange} 
                onSearchChange={this.onSearchChange}
                sortChange={this.onSortChange} 
                loading={this.state.loading} 
                data={filterThings}
                onSetFormNav={this.onSetFormNav}
                formnav={this.state.formnav}
                handleInputChange={this.handleSubmit}
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
