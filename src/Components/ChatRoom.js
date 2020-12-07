import React, { Component } from 'react'
import axios from 'axios';
import Moment from 'moment';
import{withAuth0} from '@auth0/auth0-react';

 class ChatRoom extends Component {
    intervalID;
    constructor(props){
        super(props);


        this.onChangeMessage = this.onChangeMessage.bind(this);
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

    componentWillMount(){
        const{user} = this.props.auth0;
        this.setState({
           name: user.name
       })
    }

    componentWillUnmount(){
      clearTimeout(this.intervalID);
    }


    getData = () => {
      axios.get('http://localhost:600/chat/')
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

    onSubmit(e){
       e.preventDefault();

       const newMessage = {
        message: this.state.message,
        name: this.state.name,
    };
   axios.post('http://localhost:600/chat/add',newMessage)
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
                    <p>Chat away...</p>
                </div>
                <div className="container" style={{border: '1px solid black', height: '300px', marginTop: '100px',overflowX:'hidden', overflowY: 'auto'}}>
                    <ul style={{listStyle: 'none'}}>
                    {this.state.messages.map(chat => {
                        return(
                        <li style={{marginTop: "20px", overflow: 'scroll'}}>{chat.name}: {chat.message} - <i>{Moment(`${chat.date}`).format('MM/DD/YYYY hh:mm A')}</i></li>
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
                        <div className="form-group">
                            <input type="submit" value="Send Chat" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
               </div>
            </div>
        )
    }
}

export default withAuth0(ChatRoom);
