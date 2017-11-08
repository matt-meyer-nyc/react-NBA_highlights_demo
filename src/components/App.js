import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './Home';
import Teams from './Teams';
import Team from './Team';



class App extends Component {

  render() {

    return (

      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Home}/>
          <Route exact path="/teams" component={Teams}/>
        <Route exact path="/team/:id" component={Team}/>
          <Footer />
        </div>
      </BrowserRouter>

    );

  }

}


export default App;
