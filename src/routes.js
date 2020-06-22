import React from 'react';
import { BrowserRouter, Route  } from 'react-router-dom';

import Home from './pages/Home';
import Contato from './pages/Contato'

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />

            <Route component={Contato} path="/contato" />

        </BrowserRouter>
    )
}

export default Routes