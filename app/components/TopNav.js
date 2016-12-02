import React, { Component, PropTypes } from 'react'

export default class TopNav extends Component {

	render(){
		return(
		        <nav className="navbar navbar-default navbar-fixed-top" role="navigation" id="navbar">
		            <div className="navbar-header">
		                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".sidebar-collapse">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                </button>
		                <a className="navbar-brand" href="index.html">
		                    <label className="titlefont" style={{'FontSize':'22px','color':'white'}}>
		                        ReactJS CRUD Demo
		                    </label>
		                </a>
		            </div>
		        </nav>
			)
	}

}