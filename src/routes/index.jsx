import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../views/home';
import UserPage from '../views/user';
import VaccinePage from '../views/vaccine';


const Routes = ()=>{
    return(
        <Router>
            <Switch>
                <Route exact path="/" component ={Home} />
                <Route exact path="/user" component ={UserPage} />
                <Route exact path="/vaccine" component = {VaccinePage} />
            </Switch>
        </Router>
    )
}

export default Routes