'use strict';

// Load modules
const React = require('react');
const ReactDOM = require('react-dom');

class Portal extends React.Component {

    static propTypes = {
        portalId: React.PropTypes.string.isRequired
    }

    render() {
        return false;
    }

    contructor() {
        this.portalElement = null;
    }

    componentDidMount() {

        let portal = this.props.portalId && document.getElementById(this.props.portalId);
        if (!portal) {
            portal = document.createElement('div');
            portal.id = this.props.portalId;
            document.body.appendChild(portal);
        }

        this.portalElement = portal;
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        document.body.removeChild(this.portalElement);
    }

    componentDidUpdate() {

        const props = Object.assign({}, this.props);
        if (props.portalId) {
            delete props.portalId;
        }


        ReactDOM.render(
            <div {...props}>

                    {props.children}
            </div>, this.portalElement);
    }
}

export default Portal;
