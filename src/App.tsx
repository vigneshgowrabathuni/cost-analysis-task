import React, { lazy } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Navbar } from 'reactstrap';
const Home = lazy(() => import('./pages/Home'));
const ApplicationDetails = lazy(() => import('./pages/ApplicationDetails'));

function App() {
  return (
    <BrowserRouter>
      <Navbar className="my-2 text-white" color="dark" dark>
        <Link to="/" className="navbar-brand">
          Home{' '}
        </Link>
      </Navbar>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route
          exact={true}
          path="/app/:appName"
          component={ApplicationDetails}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
