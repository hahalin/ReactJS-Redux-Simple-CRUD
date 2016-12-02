import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import { createStore } from 'redux'
import { Provider,connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import configureStore from './store/configureStore'

import TermIndex from './pages/TermIndex'

const store = configureStore()

ReactDOM.render(
	 <Provider store={store} >
	    <Router history={hashHistory}>
	    	<Route path="/" component={TermIndex} />
	    </Router>
	</Provider>
	,document.getElementById('wrapper')
);
