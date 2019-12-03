import React from 'react';
import {formatCreditCardNumber, formatCVC, formatExpirationDate,} from './utils';

import style from "../threeStepContestForm.module.scss";

import 'react-credit-cards/es/styles-compiled.css';
import Card from 'react-credit-cards';

const _ = require("lodash");


export default class CreditCard extends React.Component {
    state = {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        issuer: '',
        focused: '',
        formData: null,
    };

    handleCallback = ({issuer}, isValid) => {
        if (isValid) {
            this.setState({issuer});
        }
    };

    handleInputFocus = ({target}) => {
        this.setState({
            focused: target.name,
        });
    };

    handleInputChange = ({target}) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value);
        }

        this.setState({[target.name]: target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        const cloneData = _.cloneDeep(formData);
        cloneData['number'] = cloneData['number'].replace(/ /g, '');
        this.props.submit(cloneData);
        this.form.reset();
        this.setState({formData});
    };

    render() {
        const {number, expiry, cvc, focused,} = this.state;

        return (
            <div key="Payment">
                <div className="displayForForm">
                    <div className={style.creditCard}>
                        <Card
                            number={number}
                            expiry={expiry}
                            name={'  '}
                            cvc={cvc}
                            focused={focused}
                            callback={this.handleCallback}
                        />
                    </div>
                    <div className={style.preBusinessStepForm}>
                        <div className={style.businessStepForm}>
                            <form ref={c => (this.form = c)} onSubmit={this.handleSubmit}
                                  className={style.displayForForm}>
                                <div className={`${style.preForInputs} ${style.forCardField}`}>
                                    <input className={`${style.forInputs} ${style.forCardField}`}
                                           type="tel"
                                           name="number"
                                           placeholder="Card Number"
                                           pattern="[\d| ]{16,22}"
                                           required
                                           onChange={this.handleInputChange}
                                           onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className={`${style.preForInputs} ${style.forCardField}`}>
                                    <input className={`${style.forInputs} ${style.forCardField}`}
                                           type="tel"
                                           name="expiry"
                                           placeholder="Valid Thru"
                                           pattern="\d\d/\d\d"
                                           required
                                           onChange={this.handleInputChange}
                                           onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className={`${style.preForInputs} ${style.forCardField}`}>
                                    <input className={`${style.forInputs} ${style.forCardField}`}
                                           type="tel"
                                           name="cvc"
                                           placeholder="CVC"
                                           pattern="\d{3,4}"
                                           required
                                           onChange={this.handleInputChange}
                                           onFocus={this.handleInputFocus}
                                    />
                                </div>
                                <div className="form-actions">
                                    <button className="btn btn-primary btn-block">PAY</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
