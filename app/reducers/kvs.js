
import {ADD_KV,GET_KV} from '../actions'

import {api_url} from '../constants/bootstrap'


export const kvs = (state = {gp:1,fd:[],data:[],test:0,op:'BROWSE'}, action) => {
  switch (action.type) {
    case 'CLOSE_INPUT':
      return {
        ...state,
        op:'CLOSE_INPUT'
      }
    case 'GET_KV':
      return Object.assign({}, state,{
        gp:action.gp,
        fd:action.fd,
        data:action.data,
        op:'BROWSE'
      })
    case 'CHANGE_GP':
      {
        if (state.gp !== action.gp)
        {
          return {
            ...state,
            gp:action.gp
          }
        }
        return state
      }
    default:
      return state
  }
}


