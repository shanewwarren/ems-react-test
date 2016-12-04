import React from 'react'
import classNames from 'classnames';
import { observable } from 'mobx';
import { observer } from 'mobx-react';


@observer
class Flash extends React.Component {

    static propTypes = {
        status: React.PropTypes.string,
        message: React.PropTypes.string,
        styleClass: React.PropTypes.string
    }

    render() {

        let icon = null;
        let classes = null;

        if (!this.props.status || !this.props.message) {
            return false;
        }

        const status = this.props.status.toLowerCase();
        classes = classNames({
            'alert': true,
            'error': (status === 'error'),
            'warning': (status === 'warning'),
            'success': (status === 'success')
        }, this.props.styleClass);


        return (
            <div className={classes}>
                <p>{this.props.message}</p>
            </div>
        );
    }
}

export default Flash;
