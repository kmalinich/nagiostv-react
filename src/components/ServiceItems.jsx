import React, { Component } from 'react';
import './animation.css';
import './ServiceItems.css';
import { formatDateTime, formatDateTimeAgo } from '../helpers/moment.js';
import { wrapperClass, stateClass } from '../helpers/colors.js';
import { nagiosStateType, nagiosServiceStatus } from '../helpers/nagios.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const defaultStyles = {
  overflow: 'hidden',
  //width: '100%',
  backgroundColor: '#111',
  //padding: '10px',
  //border: '2px solid yellow',
  color: 'white',
  //display: 'flex',
  justifyContent: 'center'
  //fontSize: '1.2em',
  //margin: '5px 5px 0 5px',
  //borderRadius: '10px'
}

class ServiceItem extends Component {

  render() {

    //console.log('this.props.serviceProblemsArray is', this.props.serviceProblemsArray);
    //console.log(Object.keys(this.props.serviceProblemsArray));

    return (
      <div className="ServiceItems">

        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {this.props.serviceProblemsArray.map((e, i) => {
            //console.log('ServiceItem item');
            //console.log(e, i);

            return (
              <div key={i} style={{ ...defaultStyles }} className={`ServiceItem ${wrapperClass(e.status)}`}>
                <div style={{ float: 'right' }}>
                  ({e.state_type}){' '}
                  {nagiosStateType(e.state_type)}{' '}
                  ({e.status}){' '}
                  {nagiosServiceStatus(e.status)}{' '}
                  {e.problem_has_been_acknowledged && <span>ACKED</span>}
                  {e.is_flapping && <span>FLAPPING</span>}
                </div>
                <div style={{ textAlign: 'left' }}>
                  {e.host_name}{' '}
                  <span className={stateClass(e.status)}>
                    <span className="color-orange">{e.description}</span>{' - '}
                    {e.plugin_output}
                  </span>
                </div>
                <div style={{ textAlign: 'left' }}>
                  Last check was {formatDateTimeAgo(e.last_check)} ago{' - '}
                  Next check in: {formatDateTime(e.next_check)}
                </div>
              </div>
            );
            
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default ServiceItem;