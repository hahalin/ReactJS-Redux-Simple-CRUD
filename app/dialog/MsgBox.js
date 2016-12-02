import React from 'react'
import ReactDOM from 'react-dom'

export default class MsgBox extends React.Component {
	
	render(){
		return
		(
			<div className="modal fade" id="MsgBox" tabindex="-1" role="dialog" aria-labelledby="MsgBoxModalLabel">
			    <div className="modal-dialog" role="document">
			        <div className="modal-content">
			            <div className="modal-header">
			                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			                <span aria-hidden="true"></span></button>
			                <h4 className="modal-title" id="MsgBoxModalLabel">
			                    <i className="glyphicon glyphicon-question-sign"></i>
			                    <span>Modal title</span>
			                </h4>
			                </div>
			            <div className="modal-body">
			                <div className="row">
			                </div>
			            </div>
			            <div className="modal-footer">
			                <div className="row">
			                    <div className="span7 text-center">
			                        <button className="btn btn-primary zIndex400 btn-lg" type="button" data-dismiss="modal">確   定</button>
			                    </div>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
		)
	} 

}


