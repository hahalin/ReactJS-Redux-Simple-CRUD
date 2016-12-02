import React, { Component, PropTypes } from 'react'
import { Router, Route, hashHistory,Link } from 'react-router'

export default class LeftNav extends Component {

	render(){

		return(

        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav" id="side-menu">
                    <li>
                        <a href="#" style={{fontSize:'18px'}}><i className="fa fa-table fa-fw"></i>系統設定<span className="fa arrow"></span></a>
                        <ul className="nav nav-second-level">
                            <li><Link to="/index" activeClassName="active">共用資料設定</Link></li>
                        </ul>    
                    </li>
                </ul>
            </div>
        </nav>
		)
	}
}
