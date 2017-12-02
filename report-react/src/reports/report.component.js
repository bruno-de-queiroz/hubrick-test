import React from 'react';
import PropTypes from 'prop-types';

export default class Report extends React.Component {
    block(e) {
        e.preventDefault();
        const {data, onBlock} = this.props;
        onBlock(data.id);
    }

    resolve(e) {
        e.preventDefault();
        const {data, onResolve} = this.props;
        onResolve(data.id);
    }

    render() {
        const {data} = this.props;
        return (
            <li className="report-item">
                <div className="row">
                    <div className="col-xs-10">
                        <div className="row">
                            <dl className="col-xs-5">
                                <dt>Id:</dt>
                                <dd>{data.payload.reportId}</dd>
                            </dl>

                            <dl className="col-xs-5">
                                <dt>Type:</dt>
                                <dd>{data.payload.reportType.toLowerCase().replace('_', ' ')}</dd>
                            </dl>
                        </div>
                        <div className="row">
                            <dl className="col-xs-5">
                                <dt>State:</dt>
                                <dd>{data.state.toLowerCase()}</dd>
                            </dl>

                            <dl className="col-xs-5">
                                <dt>Message:</dt>
                                <dd>{data.payload.message}</dd>
                            </dl>
                        </div>
                    </div>
                    <div className="col-xs-2">
                        <button type="button"
                                disabled={data.state === 'BLOCKED'}
                                onClick={this.block.bind(this)}
                                className="btn btn-warning">Block
                        </button>

                        <button type="button"
                                disabled={data.state === 'CLOSED'}
                                onClick={this.resolve.bind(this)}
                                className="btn btn-success">Resolve
                        </button>
                    </div>
                </div>
            </li>
        )
    }
}

Report.propTypes = {
    data: PropTypes.object.isRequired,
    onBlock: PropTypes.func.isRequired,
    onResolve: PropTypes.func.isRequired,
};
