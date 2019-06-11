import React, { Component } from 'react';
import {NoTopSpace,displayFlex,displayBlockAndMargin} from '../style';
import {Segment,Image} from 'semantic-ui-react';
class MyAccount extends Component {
  constructor(props){
    super(props)
  }
	sum(array) {
    let sum = 0;
    array&&array.map(operation=>operation.map(data=>{return sum+=data.amount}));
    return sum;
  }
  render() {
    const {expenses,incomes,wallets} = this.props;

    return (
      <Segment style={NoTopSpace} inverted color='black' placeholder>
        <h1>Welcome to Budgeting app dear {localStorage.getItem('username')}</h1>
        <div style={displayFlex}>
          <Image style={{borderRadius:'50%'}} src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium'  />
          <div style={displayBlockAndMargin}>
            <h1>Your email is:  {localStorage.getItem('email')}</h1>
            <h1>Your username is:  {localStorage.getItem('username')}</h1>
          </div>
        </div> 
        <h3>Your total income is: {this.sum(incomes)}</h3>
        <h3>Your total expense is: {this.sum(expenses)}</h3>
        <h3>Your total balance is: {this.sum(incomes) - this.sum(expenses)}</h3>
        <h3>
          {(this.sum(incomes) - this.sum(expenses))>0? 
            `You are in a good place your income is more than expense on ${this.sum(incomes) - this.sum(expenses)}`:
            `You have to work harder you currently in minus on ${this.sum(incomes) - this.sum(expenses)}`}
        </h3>
      </Segment>
    );
  }
}

export default MyAccount;