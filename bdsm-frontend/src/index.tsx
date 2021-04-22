import React from 'react'
import ReactDom from 'react-dom'
import App from "./App"
import {BrowserRouter as Router} from 'react-router-dom';
import './styles/style.css';

ReactDom.render((
 <React.StrictMode>
     <Router>
         <App/>
     </Router>
 </React.StrictMode>),
 document.getElementById('root')
)