import React, { Component } from 'react'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useAuth0 } from '@auth0/auth0-react';
import Moment from 'moment';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';



export default class PostList extends Component {
    constructor(props){
        super(props);

        this.deletePost = this.deletePost.bind(this);

        this.state = {
            posts: []
        };
    }
    componentDidMount(){
        axios.get('http://localhost:5000/posts/')
            .then(res => {
                this.setState({posts: res.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deletePost(id){
        axios.delete('http://localhost:5000/posts/' + id)
            .then(res => console.log(res.data));
        this.setState({
            posts: this.state.posts.filter(el => el._id !== id)
        })
    }

    render() {
        return (
            <div className='container' style={{textAlign: 'center' }}>
                {this.state.posts.map(post => {
                    return(
                    <div>
                        <Card className="text-center" style={{width: '18rem', float: 'left', marginRight: '10px', marginTop: '20px'}}>
                            <Card.Img style={{height: '200px', width: 'auto'}} variant="top" src={`${post.img}`} />
                            <br/>
                            <Card.Body>
                                <Card.Text>{post.title}</Card.Text>
                                <Card.Text>{post.description}</Card.Text>
                                <Card.Text>Likes: {post.likeCount} </Card.Text>
                                <Card.Text>Created on: {Moment(`${post.date}`).format('MM/DD/YYYY')}</Card.Text>
                                <div>
                                    <ul>
                                   {post.comments.map(comment => {
                                       return(
                                        <li>{comment.message}</li>
                                       );
                                   })}
                                  </ul>
                                </div>
                                <Link to={`/edit/${post._id}`} >Edit</Link>
                                <Link to={`/comment/${post._id}`}>Comment</Link>
                                <Button variant="danger" onClick={() => this.deletePost(`${post._id}`)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    );
                })}
            </div>
        )
    }
}
