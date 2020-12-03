import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'


export default class PostList extends Component {
    constructor(props){
        super(props);

        this.deletePost = this.deletePost.bind(this);

        this.state = {posts: []};
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
            <div>
                {this.state.posts.map(post => {
                    return(
                    <Card style={{ width: '18rem' }} key={post._id}>
                    <Card.Img variant="top" src={`${post.img}`} />
                    <Card.Body>
                        <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
                    );
                })}
            </div>
        )
    }
}
