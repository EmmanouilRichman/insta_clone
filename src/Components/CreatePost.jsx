import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';

export default class CreatePost extends Component {
    constructor(props){
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            title: '',
            description: '',
            img: '',
            redirect: false
        }
    }
    onChangeTitle(e){
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangeImg(e){
        this.setState({ img: e.target.value});
    }

    onSubmit(e){
       e.preventDefault();
        const post = {
            title: this.state.title,
            description: this.state.description,
            img: this.state.img
        };
       axios.post('http://localhost:5000/posts/add', post)
        .then(res => console.log(res.data))
        .catch((error) => {
            console.log(error);
        })
       this.setState({redirect: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/" />;
       }
        return (
            <div>
               <h3>Create Post</h3>
               <form onSubmit={(this.onSubmit)}>
                   <div className="form-group">
                       <label>Title: </label>
                       <input type="text" 
                       className="form-control" 
                       value={this.state.title} 
                       onChange={this.onChangeTitle} />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription} />
                    </div>
                    <div className="form-group">
                        <label>Photo Link: </label>
                        <input type="text"
                        className="form-control"
                        value={this.state.img}
                        onChange={this.onChangeImg}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Upload Post" className="btn btn-primary" />
                    </div>
               </form>
            </div>
        )
    }
}
