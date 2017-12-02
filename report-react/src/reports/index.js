import React from 'react';
import PropTypes from 'prop-types';
import {fetch, update} from './report.actions';
import {connect} from 'react-redux';
import ReportList from './report-list.component';
import './report.style.css';

@connect(
    (state) => ({items: state.reports}),
    {fetch, update}
)
export default class Reports extends React.Component {
    componentDidMount() {
        this.props.fetch();
    }

    block(id) {
        this.props.update(id, 'BLOCKED');
    }

    resolve(id) {
        this.props.update(id, 'CLOSED');
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>Reports</h1>
                <ReportList items={this.props.items}
                            onBlock={this.block.bind(this)}
                            onResolve={this.resolve.bind(this)}/>
            </div>
        )
    }
}

Reports.propTypes = {
    fetch: PropTypes.func,
    update: PropTypes.func,
    items: PropTypes.array,
};