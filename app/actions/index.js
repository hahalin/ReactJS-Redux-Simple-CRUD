
import {api_url} from '../constants/bootstrap'


export const ADD_KV = (_gp,_k,_v) => ({
  type: 'ADD_KV',
  gp:_gp,
  k: _k,
  v: _v
})

const set_kvs=(r)=>{
	return {
		type:'GET_KV',
		gp:r.gp,
		fd:r.fd,
		data:r.data,
		op:'BROWSE'
	}
}

export const delete_kv=(id,gp)=>{
	return (dispatch, getState) => {
		$.ajax({
		  url: 'http://'+api_url+"/api/kv/index/",
		  method: "delete",
		  data: {id:id},
		  dataType: "json"
		})
		.success(function(r)
		{
			dispatch({type:'CLOSE_INPUT'})
			return dispatch(fetch_kvs(gp))
		})
	}
}

export const add_kv=(gp,v,sort)=>{
	return (dispatch,getState)=>{
		$.ajax({
		  url: 'http://'+api_url+"/api/kv/index/",
		  method: "POST",
		  data: {gp:gp,k:'',v:v,sort:sort},
		  dataType: "json"
		})
		.error(function(r){
			const o=JSON.parse(r.responseText)
			alert(o.message)
		})
		.success(function(r)
		{
			dispatch({type:'CLOSE_INPUT'})
			return dispatch(fetch_kvs(gp))
		})
	}
}

export const edit_kv=(id,gp,v,sort)=>{
	return (dispatch,getState)=>{
		$.ajax({
			  url: 'http://'+api_url+"/api/kv/index/",
			  method: "PUT",
			  data: {id:id,gp:gp,v:v,sort:sort},
			  dataType: "json"
		})
		.error(function(r){
			const o=JSON.parse(r.responseText)
			alert(o.message)
		})
		.success(function(r)
		{
			dispatch({type:'CLOSE_INPUT'})
			return dispatch(fetch_kvs(gp))
		})
	}
}

export const change_gp=(_gp)=>{
	return (dispatch, getState) => {
		dispatch({type:'CHANGE_GP',gp:_gp})
	}
}

export const fetch_kvs= (_gp)=>{
	return (dispatch, getState) => {
		return $.ajax({
			  url: 'http://'+api_url+"/api/kv/index/"+_gp,
			  method: "GET",
			  dataType: "json"
			})
			.done(function(r)
			{
				var fdlist=[];
				let columns;
				for (var key in r.fd) {
					fdlist.push(r.fd[key]);
				}

				return dispatch(set_kvs({gp:_gp,fd:fdlist,data:r.data}))

			})
	}
}

export const load_kvs = (_gp)=>{
	return (dispatch, getState) => {
		return dispatch(fetch_kvs(_gp))
	}
}
