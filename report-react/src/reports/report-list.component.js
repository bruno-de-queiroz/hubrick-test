import React from 'react';
import PropTypes from 'prop-types';
import Report from './report.component';

export default class ReportList extends React.Component {
    render() {
        const {
            items,
            onBlock,
            onResolve
        } = this.props;

        return (
            <ul className="report-list">
                {items
                    .filter((i) => i.state !== 'CLOSED')
                    .map((i) => (<Report key={i.id} data={i} onBlock={onBlock} onResolve={onResolve}/>))}
            </ul>
        )
    }
}

ReportList.propTypes = {
    items: PropTypes.array,
    onBlock: PropTypes.func.isRequired,
    onResolve: PropTypes.func.isRequired,
};
