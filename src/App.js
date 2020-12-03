import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Login} from './Components/Login';

import Navbar from './Components/Navbar.jsx';
import PostList from './Components/PostList.jsx';
import EditPost from './Components/EditPost.jsx';
import CreatePost from './Components/CreatePost.jsx';

function App() {
  return (
    <Router>
        <Navbar />
        <div className="container">
        <Route path="/" exact component={PostList} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/create"  component={CreatePost} />
      </div>
    </Router>
  );
}

export default App;
