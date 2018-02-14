import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmails } from '../../actions';
class EmailsList extends Component {
    componentDidMount() {
        this.props.getEmails(() => this.setState({ isLoading: true }));
    }
    state = { isLoading: false };
    renderContent() {
        if (this.state.isLoading === false) {
            return (<div><div className="progress">
                <div className="indeterminate"></div>
            </div></div>);
        } else if (this.state.isLoading === true && this.props.emails.length !== 0) {
            const email = this.props.emails.map(email => (
                <div className="row" key={email._id}>
                    <div className="col s12 m10 l10 push-m1 push-l1">
                        <div className="card grey lighten-2">
                            <span className="right">Sent on{` `}{new Date(email.dateSent).toLocaleString()}</span>
                            <div className="card-content">
                                <span className="card-title"><b>{email.title}</b></span>
                                <p >About: {email.subject}</p>
                                Message:<br />
                                <p className="white emailbox">{email.body}</p>
                            </div>
                            <div className="card-action white-text grey darken-2">
                                <span className="email-status">Total recipients: {email.recipientsCount}</span>{` `}
                                <span className="email-status">Opens: {email.open / email.recipientsCount * 100}%</span>{` `}
                                <span className="email-status">Clicks:{email.click / email.recipientsCount * 100}%</span>
                                <Link to={'/mails/reports/' + email._id} className="right orange-text">View full report</Link>
                            </div>
                        </div>
                    </div>
                </div >
            ));
            return (<div>{email}</div>);
        } else {
            return (<div>No email found.</div>);
        }



    }
    render() {
        return (<div>{this.renderContent()}</div>);
    }
}
function mapStateToProps(state) {
    return { emails: state.emails };
}
export default connect(mapStateToProps, { getEmails })(EmailsList);