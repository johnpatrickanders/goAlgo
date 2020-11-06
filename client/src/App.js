import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SortingViz from './SortingViz/SortingViz';
import PathFindingViz from './PathfindingViz/PathfindingViz';


function App() {

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/pathfinding">
                    <PathFindingViz></PathFindingViz>
                </Route>
            </Switch>
            <Switch>
                <Route exact path="/">
                    <SortingViz></SortingViz>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
