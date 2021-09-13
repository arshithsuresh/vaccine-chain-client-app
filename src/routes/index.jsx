import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from '../views/home';
import ManufacturerPage from '../views/manufacturer';
import ManufacturerUserPage from '../views/manufacturer/user';
import ManufacturerVaccinePage from '../views/manufacturer/vaccine';


import PublicUserPage from '../views/public/user';
import UserPage from '../views/public';
import VaccinePage from '../views/vaccine';
import PublicVaccinePage from '../views/public/vaccine';
import PublicVerificationPage from '../views/public/verfyCertificate';
import PublicVerifyVaccinePage from '../views/public/verifyVaccine';
import DistributerUserPage from '../views/distributer/user';


const Routes = ()=>{
    return(
        <Router>            
                <Route exact path="/" component ={Home} />
                <Route exact path="/manufacturer" component ={ManufacturerPage} />
                <Route exact path="/manufacturer/user" component ={ManufacturerUserPage} />
                <Route exact path="/manufacturer/vaccine" component ={ManufacturerVaccinePage} />

                <Route exact path="/distributer" component = {DistributerUserPage} />

                <Route exact path="/public" component ={UserPage} />
                <Route exact path="/public/user" component ={PublicUserPage} />
                <Route exact path="/public/vaccine" component ={PublicVaccinePage} />
                <Route exact path="/public/verifycert/:id" component ={PublicVerificationPage} />
                <Route exact path="/public/verifyvaccine/:id" component ={PublicVerifyVaccinePage} />

                <Route exact path="/vaccine" component = {VaccinePage} />           
        </Router>
    )
}

export default Routes