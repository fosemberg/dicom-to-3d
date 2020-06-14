import * as React from 'react'
import {BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css'
import ServerInfoNavbar from "./components/Navbar/Navbar";
import ParamsPage from "./pages/ParamsPage";
import SettingsPage from "./pages/SettingsPage";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div>
          <ServerInfoNavbar/>
          <div>
            <Switch>
              <Route path='/' exact={true} component={ParamsPage}/>
              <Route path="/settings" component={SettingsPage}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
