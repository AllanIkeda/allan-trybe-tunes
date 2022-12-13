import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';
import Favorite from './components/Favorites';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import NotFound from './components/NotFound';

class App extends React.Component {
  state = {
    // isLoading: true,
  };

  render() {
    // const { isLoading } = this.state;
    // if (isLoading) return <Loading />;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album" component={ Album } />
          <Route path="/favorites" component={ Favorite } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/">
            <Login />
          </Route>
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
