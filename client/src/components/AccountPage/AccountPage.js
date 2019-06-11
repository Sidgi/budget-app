import React,{Component} from 'react'
import {viewOfSegment} from '../style';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import {createWallet} from '../service';
import {labelCreateOperation,selectField} from '../style';

class AccountPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      form:{
        name:'',
        currency:'Dollar',
        limit:'',
        cash_or_credit:'Cash',
        total:'',
        user_id: localStorage.getItem('user_id')
      }
    }
    this.handleCreateWallet = this.handleCreateWallet.bind(this)
  }

  async handleCreateWallet(e){
    e.preventDefult()
    await createWallet(this.state.form);
  }
  handleChangeInput =  (e) => {
    let { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState, 
      'form': { 
        ...prevState['form'], [name]: value
      }
    }));
  }
  async handleCreateWallet(){
    await createWallet(this.state.form);
    this.props.history.push('/operation');
    this.props.fetchAllOperation();
  }
  render(){
    return(
      <div>
        <Segment style={viewOfSegment} inverted color='black' placeholder>
        <h1>Create Wallet</h1>
        <Grid columns={1} relaxed='very' stackable>
          <Grid.Column>
            <Form onSubmit={this.handleCreateWallet} className='signUp'>
              <Form.Input onChange={this.handleChangeInput} type='text' name='name' label='Name' placeholder='Account name' />
              <Form.Input onChange={this.handleChangeInput} type='number' name='limit' label='Limit' placeholder='Limit'/>
              <label style={labelCreateOperation}>Cash or Credit Account</label>
              <select onChange={this.handleChangeInput} name='cash_or_credit' style={selectField}>
                <option>Cash</option>
                <option>Credit</option>
              </select>
              <label style={labelCreateOperation}>Currency</label>
              <select onChange={this.handleChangeInput} name='currency' style={selectField}>
                <option>Dollar</option>
                <option>Euro</option>
                <option>Ruble</option>
              </select>
              <Button type='submit' name='submit' content='Create Wallet' primary />
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
      </div>
    )
  }
}
export default AccountPage