import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';
import Moment from 'moment';

export default class ChatRoom extends Component {
    constructor(props){
        super(props);


        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            messages: [],
            message: '',
            redirect: false
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5000/chat/')
            .then(res => {
                this.setState({messages: res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }
    onChangeMessage(e){
        this.setState({
            message: e.target.value
        });
    }

    onSubmit(e){
       e.preventDefault();
       this.setState({redirect: true});
       
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/chat" />;
       }
        return (
            <div className="container">
                <div className="jumbotron" style={{textAlign: 'center'}}>
                    <h1>Chat Room</h1>
                </div>
                <div className="container" style={{border: '1px solid black', height: '300px', marginTop: '100px',overflowX:'hidden', overflowY: 'auto'}}>
                    <ul style={{listStyle: 'none'}}>
                    {this.state.messages.map(chat => {
                        return(
                        <li>{chat.messages.name}: {chat.messages.message} - <i>{Moment(`${chat.messages.date}`).format('MM/DD/YYYY')}</i></li>
                        )
                    })}
                    </ul>

                </div>

               <div className="container" style={{textAlign: 'center', marginTop: '100px'}}>
                <form onSubmit={(this.onSubmit)} style={{width: '300px', marginLeft: '35%'}}>
                    <h3>Chat</h3>
                    <div className="form-group">
                        <input type="text" 
                        className="form-control" 
                        value={this.state.message} 
                        onChange={this.onChangeMessage}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Send Chat" className="btn btn-primary" />
                        </div>
                </form>
               </div>
            </div>
        )
    }
}
