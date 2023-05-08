import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ArticlesCollection from './components/ArticlesCollection'
import CreateArticles from './views/CreateArticles'
import EditArticles from './views/EditArticles'
import ShowArticles from './views/ShowArticles'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/">
          <ArticlesCollection />
        </Route>
        <Route exact path="/show/:id" render={(props) => <ShowArticles id={props.match.params.id} />} />
        <Route path="/create">
          <CreateArticles />
        </Route>
        <Route exact path="/edit/:id" render={(props) => <EditArticles id={props.match.params.id} />} />
      </div>
    </Router>
  );
}

export default App;
