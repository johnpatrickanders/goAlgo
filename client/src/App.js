import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import SortingViz from './SortingViz/SortingViz';


function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/">
                    <SortingViz></SortingViz>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
