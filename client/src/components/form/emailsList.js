import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getEmails, deleteEmail } from '../../actions';
class EmailsList extends Component {
    state = { isLoading: false };
    componentDidMount() {
        this.props.getEmails(() => this.setState({ isLoading: true }));
    }
    handleDelete(id) {
        this.props.deleteEmail(id, () => null);
    }
    renderContent() {
        if (this.state.isLoading === false) {
            return (<div><div className="progress">
                <div className="indeterminate blue"></div>
            </div></div>);
        }
        if (this.state.isLoading === true && this.props.emails.length !== 0) {
            const email = this.props.emails.reverse().map(email => (
                <div className="row" key={email._id}>
                    <div className="col s12 m10 l10 push-m1 push-l1">
                        <div className="card grey lighten-3">
                            <a className=" right red-text cursor mr-1" onClick={() => {
                                if (window.confirm(`Delete ${email.title} ?`)) this.handleDelete(email._id)
                            }}>delete</a><br />

                            <span className="right email-date">{new Date(email.dateSent).toLocaleString()}</span>
                            <div className="card-content">
                                <div className="left">
                                    <i className="material-icons medium left grey-text">mail</i>
                                </div>
                                <div>
                                    <span className="card-title">{email.title}</span>
                                    <p >Re: {email.subject}</p>
                                </div>

                            </div>
                            <div className="card-action white-text grey darken-2">
                                <span className="email-status">Recipients: {email.recipientsCount}</span>
                                <span className="email-status">Opens:{Math.round(email.open / email.recipientsCount * 100)}%</span>
                                <span className="email-status">Clicks:{Math.round(email.click / email.recipientsCount * 100)}%</span>
                                <Link to={'/mails/reports/' + email._id} className="right orange-text">View full report</Link>
                            </div>
                        </div>
                    </div>
                </div >
            ));
            return (<div>{email}</div>);
        }
        return (<div className="wrapper-50vh"><p className="orange-text lighten-3 center-align">You have no emails at the moment.</p></div>);

    }
    render() {
        return (<div>{this.renderContent()}</div>);
    }
}
function mapStateToProps(state) {
    return { emails: state.emails };
}
export default connect(mapStateToProps, { getEmails, deleteEmail })(EmailsList);