import React, { Component } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Moment from 'moment';

export default class CreateComment extends Component {
    constructor({match, ...props}){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);

        this.state = {
            comments: [],
            title: '',
            description: '',
            img: '',
            date: '',
            redirect: false
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/posts/' + this.props.match.params.id)
        .then(res => {
            this.setState({
                title: res.data.title,
                description: res.data.description,
                img: res.data.img,
                likeCount: res.data.likeCount,
                comments: res.data.comments,
                date: res.data.date
            })
            
        })
        .catch((error) => {
            console.log(error);
        })
    }
    onSubmit(e){
        e.preventDefault();
    }

    onChangeComment(e){
        this.setState({
            comments: this.state.comments.push(e.target.value)
        })
    };
    render() {
        return (
            <div>
                <Card className="text-center" style={{width: '18rem', float: 'left', marginRight: '10px', marginTop: '20px'}}>
                    <Card.Img style={{height: '200px', width: 'auto'}} variant="top" src={`${this.state.img}`} />
                    <br/>
                    <Card.Body>
                        <Card.Text>{this.state.title}</Card.Text>
                        <Card.Text>{this.state.description}</Card.Text>
                        <Card.Text>Likes: {this.state.likeCount} </Card.Text>
                        <Card.Text>Created on: {Moment(`${this.state.date}`).format('MM/DD/YYYY')}</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
