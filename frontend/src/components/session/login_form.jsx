import React from 'react';
import {
    withRouter
} from 'react-router-dom';
import Typed from 'typed.js';

class LoginForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                email: '',
                password: ''
            };

            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleDemo = this.handleDemo.bind(this);
            this.animateDemo = this.animateDemo.bind(this);
            this.renderErrors = this.renderErrors.bind(this);
        }

        componentWillUnmount() {
            this.props.clearErrors();
        }

        update(field) {
            return e => this.setState({
                [field]: e.currentTarget.value
            });
        }

        handleSubmit(e) {
            e.preventDefault();
            const user = Object.assign({}, this.state);
            this.props.login(user).then(() => {
                if (!Object.values(this.props.errors).length > 0) {
                    if (this.props.document && this.props.tags) {
                        this.props.createDocument({
                            title: this.props.document.title
                        }).then(payload => {
                            const docId = payload.document._id
                            const tags = this.props.tags.map((tag) => {
                                tag.documentId = docId
                                return tag
                            })
                            this.props.saveTagCollection(tags).then(() => {
                                this.props.history.push(`/edit/${docId}`)
                            })
                        })
                    }
                    this.props.closeModal();
                }
            })
        }

        handleDemo(e) {
            e.preventDefault();

            let email = {
                strings: ["guestuser@gmail.com"],
                typeSpeed: 20
            };

            let password = {
                strings: ["hunter2"],
                typeSpeed: 20
            };

            this.animateDemo(email, password);
        }

        animateDemo(email, password) {
            this.setState({
                email: "",
                password: ""
            }, () => {
                new Typed("#email", email);

                setTimeout(() => {
                    new Typed("#password", password);
                }, 500);

                setTimeout(() => {
                    this.props.login({
                        email: "guestuser@gmail.com",
                        password: "hunter2"
                    });
                    this.props.closeModal()
                }, 800);
            });
        }

        renderErrors() {
            return (
                <ul>
                    {Object.keys(this.props.errors).map((error, i) => (
                        <li key={`error-${i}`}>
                            {this.props.errors[error]}
                        </li>
                    ))}
                </ul>
            );
        }
    
    
    render() {
        return (
            <div className='modal-form'>
                <p>Login to save your work and pick it up again later!</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="modal-form-form" id='modal-login-form'>
                        <br />
                        <input id='email' type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                        />
                        <br />
                        <input
                            id='password' 
                            type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />
                        <br />
                        <input className='modal-button' type="submit" value="Submit" />
                        <input  className='modal-button' type="submit" value="Demo User" onClick={this.handleDemo}/>
                        <div className='form-errors'>
                            {this.renderErrors()}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


export default withRouter(LoginForm);