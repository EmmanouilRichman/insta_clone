import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';
import Moment from 'moment';

export default class ChatRoom extends Component {
  intervalID;
    constructor(props){
        super(props);


        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            messages: [],
            message: '',
            name: '',
            redirect: false
        }
    }
    componentDidMount(){

      this.getData();
    }

    componentWillUnmount(){
      clearTimeout(this.intervalID);
    }

    getData = () => {
      axios.get('http://localhost:5000/chat/')
      .then(res => {
          this.setState({messages: res.data})
          this.intervalID = setTimeout(this.getData.bind(this), 5000);
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

    onChangeName(e){
      this.setState({
        name: e.target.value
      })
    }

    onSubmit(e){
       e.preventDefault();

       const newMessage = {
        message: this.state.message,
        name: this.state.name,
    };
   axios.post('http://localhost:5000/chat/add',newMessage)
    .then(res => console.log(res.data))
    .catch((error) => {
        console.log(error);
    })
       this.setState({redirect: true});
    }

    render() {
        if (this.state.redirect) {
          window.location.reload();
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
                        <li style={{marginTop: "20px", overflow: 'scroll'}}>{chat.name}: {chat.message} - <i>{Moment(`${chat.date}`).format('MM/DD/YYYY')}</i></li>
                        )
                    })}
                    </ul>

                </div>

               <div className="container" style={{textAlign: 'center', marginTop: '100px'}}>
                <form onSubmit={(this.onSubmit)} style={{width: '300px', marginLeft: '35%'}}>
                    <h3>Chat</h3>
                    <div className="form-group">
                        <label>Chat</label>
                        <input type="text" 
                        className="form-control" 
                        value={this.state.message} 
                        onChange={this.onChangeMessage}/>
                        <label>Name</label>
                         <input type="text" 
                        className="form-control" 
                        value={this.state.name} 
                        onChange={this.onChangeName}/>
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
