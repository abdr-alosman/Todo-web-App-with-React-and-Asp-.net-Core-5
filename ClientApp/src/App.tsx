//import * as React from 'react';
import React, { Component } from 'react';

import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';


import { FetchTasks } from './components/FetchTasks';
import { AddTask } from './components/AddTask';
import { KayitOl } from './components/KayitOl';
import { FetchUsers } from './components/FetchUsers';





import './custom.css'


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
             
                <Route path='/fetch-task' component={FetchTasks} />
                <Route path='/add-task' component={AddTask} />
                <Route path='/task/edit/:id' component={AddTask} />
                <Route path='/add-user' component={KayitOl} />
                <Route path='/user/edit/:id' component={KayitOl} />
                <Route path='/fetch-user' component={FetchUsers} />
               
            </Layout>
        );
    }
}
