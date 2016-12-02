import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import { Provider,connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import '../css/demo.css'
import '../css/rowtop.css'
import LeftNav from '../components/LeftNav'
import TopNav from '../components/TopNav'

import {ConfirmBox,confirm} from '../dialog/ConfirmBox'

import {api_url} from '../constants/bootstrap'
import {load_kvs,fetch_kvs,change_gp,delete_kv,edit_kv,add_kv} from '../actions'
import configureStore from '../store/configureStore'


// var $  = require( 'jquery' )
// var dt = require( 'datatables.net' )()

var gplist=[
	{id:1,v:'類別A'},
	{id:2,v:'類別B'},
	{id:3,v:'類別C'},
	{id:4,v:'類別D'},
	{id:5,v:'類別E'}
]

class TermIndex extends React.Component {

	constructor(props) {
  		super(props)	

  		if (props.gplist!=null)
  		{
  			gplist=props.gplist
  		}

  		let gpv=1
  		if ((props.gp===undefined) || (props.gp===null ))
  		{
  			gpv=1
  		}
  		else 
  		{
  			gpv=props.gp
  		}

  		this.state={
  			gp:gpv,
  			mode:0,
  			data:[],
  			editData:{}
		}

  	}

  	componentWillMount() {
  		this.props.load_kvs(this.props.gp)
  	}

  	componentWillReceiveProps(nextProps) {
	    if (nextProps.gp !== this.props.gp) {
	    	this.props.load_kvs(nextProps.gp)
	    }

	    if (nextProps.op =='CLOSE_INPUT')
	    {
	    	this.setState({mode:0})
			$('#inputwin').modal('hide')
	    }
	   	
    }

  	handleChangeGp(id)
  	{
  		if (id!==this.state.gp)
  		{
	  		this.setState({gp:id})
	  		this.props.change_gp(id)
  		}
  	}

  	handleSave()
  	{
  		const $this=this
  		const gp=this.state.gp
  		const v=$('#edv').val()
  		const sort=$('#edsort').val()
  		const id=$('#hid').val()
  		const mode=this.state.mode

  		if (mode===2)
  		{
  			this.props.edit_kv(id,gp,v,sort)
  		}

  		if (mode===1)
  		{
  			this.props.add_kv(gp,v,sort)
		}
  	}

  	handleDelete()
  	{
  		
  		const $this=this
  		const id=$('#hid').val()
  		const gp=this.state.gp
  		const mode=this.state.mode
  		if (mode===1)
  		{
  			alert('新增模式無刪除功能')
  			return false
  		}
  		if (mode===2)
  		{
  			confirm('提示訊息?', {
		      description: '確定刪除此筆資料?',
		      confirmLabel: '是',
		      abortLabel: '否'
		    })
		    .then((function(_this) {
			    return function(){
			      	$this.props.delete_kv(id,gp)
			    }
		    })(this));
  		}
  	}

  	openInputWin(_mode,record)
  	{

  		this.setState({mode:_mode})
  		$("#inputwin form")[0].reset();
  		if (_mode===2)
  		{
  			$('#hid').val(record.id)
  			$('#edv').val(record.v)
  			$('#edsort').val(record.sort)
  		}
  		$('#inputwin').modal();
  	}



  	renderPills(){

 		const gp=this.state.gp

  		return (
  			<div className='row'>
  			<ul className="nav nav-pills col-md-offset-1" >
  				{
  					gplist.map(function(item,i){
  						console.log(item.id.toString()===gp.toString())	
	  					if (item.id.toString()===gp.toString())
	  					{
	  						return (
		  						<li role="presentation" onClick={()=>this.handleChangeGp(item.id)} className="active" ><a href="#">{item.v}</a></li>
	  						)
	  					}
	  					else 
	  					{
	  						return (
		  						<li role="presentation"><a href="#" onClick={()=>this.handleChangeGp(item.id)}>{item.v}</a></li>
	  						)
	  					}
	  					
  					},this)
  				}
  			</ul>
  			</div>
  		)
  	}


    renderInputForm()
    {
	 	const gp=parseInt(this.state.gp)

	 	let gpv=''

	 	gplist.map(function(item)
	 	{
	 		if (item.id===gp)
	 		{
	 			gpv=item.v
	 			return
	 		}
	 	})

	 	let actionV=''

	 	if (this.state.mode===1)
	 	{
	 		actionV='新增'
	 	}

	 	if (this.state.mode===2)
	 	{
	 		actionV='修改'
	 	}

    	return (
    		<div className="modal fade" id="inputwin" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header btn-info">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 className="modal-title " id="myModalLabel">{actionV}【{gpv}】資料</h4>
                        </div>
                        <div className="modal-body">
                        	<div className="panel-body">
	                            <form role="form"  className="form-horizontal">

	                                 <div className="form-group">
											<label htmlFor="" className="col-sm-3 control-label">名稱</label>
	                                        <div className="col-sm-8">
	                                            <input className="form-control" placeholder="" id='edv'>
	                                            </input>
	                                            <input type='hidden' id='hid' />
	                                            
	                                        </div>                                    
	                                </div>        
	                                <div className="form-group">
											<label htmlFor="" className="col-sm-3 control-label">排序</label>
	                                        <div className="col-sm-8">
	                                            <input className="form-control" type='number' placeholder="" id='edsort'>
	                                            </input>
	                                        </div>                                    
	                                </div>                              
	                            </form>
                        	</div>
                    	</div>
                    	<div className="modal-footer">
                        <div className="span7 text-center">
	                      	<button type="button" className="btn btn-primary" onClick={()=>this.handleSave()}>儲存</button>
                         	<button type="button" className="btn btn-danger" onClick={()=>this.handleDelete()}>刪除</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">取消</button>

                        </div>
                    	</div>
                	</div>
            	</div>
            </div>
    	)
    }

	render(){

		const props=this.props

		const r=this.props
		let fdlist=r.fd==null?[]:r.fd
		let data=r.data==null?[]:r.data
  		return (
  			<div>
  			  <TopNav></TopNav>
	          <LeftNav></LeftNav>
	          <div id="page-wrapper" className=''>
	          	  
	          	  	<h1 className='page-header titlefont'>共用資料設定</h1>
	          	  
	          	  <div className="panel panel-default ">
  						<div className="panel-body" style={{margin:'8px'}}>
	          	  			{this.renderPills()}
	          	  			<div className='row top5'>
	          	  				<button className='btn btn-info titlefont' onClick={()=>this.openInputWin(1)}>新增</button>
	          	  			</div>
	          	  			<div className='row top5 col-md-8' >
		          	  			<table id="grida" className='table table-hover table-bordered'>
									<thead>
										<tr>
										<th className='success' style={{width:'100px'}}>
											操作
										</th>
			          	  				{fdlist.map(function(item,i){
			          	  						return(
			          	  							<th className='success'>{item}</th>
			          	  						)
			          	  				})}
			          	  				</tr>
			          	  			</thead>
			          	  			<tbody>
									{
										
										data.map(function(item,i){

											return(
												<tr>
													<input type="hidden" className='hid' value={item.id}></input>
													<td>
														<button  onClick={()=>this.openInputWin(2,item)} >修改</button>
													</td>
													<td>{item.v}</td>
													<td>{item.sort}</td>
												</tr>
											)
										}.bind(this))
									}
								</tbody>
			          	  		</table>
	          	  			</div>
	          	  		</div>
	          	  </div>
	          </div>
	          {
	          	this.renderInputForm()
	          }
	        </div>
  		)
	}

}

function mapStateToProps(state,ownProps) {
  return {
  	gp:state.kvs.gp,
  	fd:state.kvs.fd,
  	op:state.kvs.op,
  	mode:0,
    data: state.kvs.data
  };
}

const mapDispatchToProps =  (dispatch, ownProps) => {
	return {
	    load_kvs: bindActionCreators(load_kvs, dispatch),
	    add_kv:bindActionCreators(add_kv,dispatch),
	    edit_kv:bindActionCreators(edit_kv,dispatch),
	    change_gp: bindActionCreators(change_gp, dispatch),
	    delete_kv:bindActionCreators(delete_kv, dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TermIndex)
