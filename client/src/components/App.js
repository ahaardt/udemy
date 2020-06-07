import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// connect allows componente to call action creators
import { connect } from 'react-redux';
import * as actions from '../actions';


import Header from './Header';
const Dashboard = () => <h2> Dashboard </h2>
const SurveyNew = () => <h2> SurveyNew </h2>
const Landing = () => <h2> Landing </h2>


class App extends Component {
    //Add lifecycle method to check, whether user is logged in - once component mounts
    //Wire up component to call action creators
    componentDidMount (){
        //to call an action, have to use this.props
        this.props.fetchUser();
    };
    render () {
        return (
            <div>
            {/* Browsserrouter only expects to have one child */}
            <BrowserRouter>
                <div className = 'container'>

                    {/* Show header all the time */}
                    <Header />

                    {/* React Router does greedy match  -all path that match criteria, rather than just one, matches all subsets, e.g. / included in /surveys, so need to add exact = {true} */}

                    <Route path = "/" exact = {true} component = {Landing} />
                    <Route path = "/surveys" exact = {true} component = {Dashboard}/>
                    <Route path = "/surveys/new"  component = {SurveyNew}/>


                </div>
            </BrowserRouter>
            </div>
        );
    }

}

//connect (mapStateToPros, actions)
export default connect(null, actions) (App);