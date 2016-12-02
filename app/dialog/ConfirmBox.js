//http://blog.arkency.com/2015/04/beautiful-confirm-window-with-react/
//https://jsfiddle.net/fernandokokocha/p9gqqgp7/

import React from 'react'
import ReactDOM from 'react-dom'

var Modal = React.createClass({
  displayName: 'Modal',
  backdrop: function() {
    return <div className='modal-backdrop in' />;
  },

  modal: function() {
    var style = {display: 'block'};
    return (
      <div
        className='modal in'
        tabIndex='-1'
        role='dialog'
        aria-hidden='false'
        ref='modal'
        style={style}
      >
        <div className='modal-dialog modal-sm'>
          <div className='modal-content'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  },

  render: function() {
    return (
      <div>
        {this.backdrop()}
        {this.modal()}
      </div>
    );
  }
});

var ConfirmBox = React.createClass({
  displayName: 'Confirm',
  getDefaultProps: function() {
    return {
      confirmLabel: 'OK',
      abortLabel: 'Cancel'
    };
  },

  abort: function() {
    return this.promise.reject();
  },

  confirm: function() {
    return this.promise.resolve();
  },

  componentDidMount: function() {
    this.promise = new $.Deferred();
    return ReactDOM.findDOMNode(this.refs.confirm).focus();
  },

  render: function() {
    var modalBody;
    if (this.props.description) {
      modalBody = (
        <div className='modal-body'>
          {this.props.description}
        </div>
      );
    }
    return (
      <Modal>
        <div className='modal-header'>
          <h4 className='modal-title'>
            {this.props.message}
          </h4>
        </div>
        {modalBody}
        <div className='modal-footer'>
          <div className="text-center">
          <button
              role='confirm'
              type='button'
              className='btn btn-primary'
              ref='confirm'
              onClick={this.confirm}
            >
              {this.props.confirmLabel}
            </button>
            {' '}
            <button
              role='abort'
              type='button'
              className='btn btn-default'
              onClick={this.abort}
            >
              {this.props.abortLabel}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
});

var MessageBox = React.createClass({
  displayName: 'MessageBox',
  getDefaultProps: function() {
    return {
      confirmLabel: '確定'
    };
  },

  confirm: function() {
    return this.promise.resolve();
  },

  componentDidMount: function() {
    this.promise = new $.Deferred();
    return ReactDOM.findDOMNode(this.refs.confirm).focus();
  },

  getTitlebgCLass()
  {
    if (this.props.type==='alert') {
      return ' modal-header btn-danger'
    }
    else
    {
      return 'modal-header btn-info'
    }
  },

  render: function() {
    var modalBody;
    if (this.props.description) {
      modalBody = (
        <div className='modal-body '>
          {this.props.description}
        </div>
      );
    }

    let titlebg=''
    
    if (this.props.type==='alert')
    {
      titlebg='brand-danger'
    }

    return (

      <Modal>
        <div className={this.getTitlebgCLass()}>  
          <h4 className='modal-title'>
            {this.props.message}
          </h4>
        </div>
        {modalBody}
        <div className='modal-footer'>
          <div className="text-center">
          <button
              role='confirm'
              type='button'
              className='btn btn-primary'
              ref='confirm'
              onClick={this.confirm}
            >
              {this.props.confirmLabel}
            </button>
            {' '}
          </div>
        </div>
      </Modal>
    );
  }
});

var confirm = function(message, options) {

  var cleanup, component, props, wrapper;
  if (options == null) {
    options = {};
  }
  props = $.extend({
    message: message,
    type:'confirm'
  }, options);
  wrapper = document.body.appendChild(document.createElement('div'));
  component = ReactDOM.render(<ConfirmBox {...props}/>, wrapper);
  cleanup = function() {
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(function() {
      return wrapper.remove();
    });
  };
  return component.promise.always(cleanup).promise();
};

var messagebox = function(message, options) {

  var cleanup, component, props, wrapper;
  if (options == null) {
    options = {};
  }
  props = $.extend({
    message: message,
    type:'alert'
  }, options);

  wrapper = document.body.appendChild(document.createElement('div'));
  component = ReactDOM.render(<MessageBox {...props}/>, wrapper);
  cleanup = function() {
    ReactDOM.unmountComponentAtNode(wrapper);
    return setTimeout(function() {
      return wrapper.remove();
    });
  };
  return component.promise.always(cleanup).promise();
};

exports.confirm=confirm;

exports.ConfirmBox=ConfirmBox;

exports.messagebox=messagebox;