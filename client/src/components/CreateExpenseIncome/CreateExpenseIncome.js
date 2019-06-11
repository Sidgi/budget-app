import React, {Component} from 'react';
import {viewOfSegment} from '../style';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import {labelCreateOperation,selectField,widthOfInputInCreateOperation,displayBlock} from '../style';
import {createOperation,getAllWallets,editOperation} from '../service';
import FileUpload from '../FileUpload/FileUpload';
class CreateExpenseIncome extends Component{
  constructor(props){
    super(props);
    this.state = {
      image:null,
      picture_url:null,
      preview:false
    }
    this.createOperation = this.createOperation.bind(this);
    this.editOperation = this.editOperation.bind(this);
  }

  async createOperation(e){
    e.preventDefault();
    await createOperation(this.props.currentOperation);
    this.props.fetchAllOperation();
    this.props.history.push('/myaccount');
  }

  async editOperation(e){
    e.preventDefault();
    await editOperation(this.props.currentOperation);
    this.props.fetchAllOperation();
    this.props.history.push('/myaccount');
  }


  render(){

    const {currentOperation,EditState,wallets} = this.props;
    return(
      <div>
        <FileUpload />
        <Segment style={viewOfSegment} inverted color='black' placeholder>
          <h1 style={{marginBottom:'5em'}}>{EditState?'Edit operation':'Create operation'}</h1>          
          <Grid columns={3}  stackable>
            <Grid.Column>
              <Form>
                <Form.Input  onChange={this.props.handleChangeInput} value={this.props.currentOperation.name} type='text' name='name'  label='Name' placeholder='name of operation' />
                <Form.Input  onChange={this.props.handleChangeInput} value={this.props.currentOperation.category}  name='category' label='Category' type='text' placeholder='category' />
                <Form.Input  onChange={this.props.handleChangeInput} value={this.props.currentOperation.amount} name='amount' icon='dollar' iconPosition='left' label='Amount' type='number' placeholder='amount of operation' />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form style={{display:'block', important:true}}>
                <label style={labelCreateOperation}>Type of operation</label>

                <select value={this.props.currentOperation.type_of_operation} onChange={this.props.handleChangeInput} name="type_of_operation" style={selectField}>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
                <label style={labelCreateOperation} >Priority</label>
                <select value={this.props.currentOperation.priority} onChange={this.props.handleChangeInput} name="priority" style={selectField}>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
                <label style={labelCreateOperation}>Account name</label>
                <select value={this.props.currentOperation.wallet_id} onChange={this.props.handleChangeInput} name="wallet_id" style={selectField}>
                  {wallets&&wallets.map(wallet=><option key={wallet.id} value={wallet.id}>{wallet.name}</option>)}
                </select>
                <Button onClick={EditState? this.editOperation : this.createOperation} type='submit' name='submit' content={EditState?"Edit operation":'Create operation'} primary />
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Input  value={this.props.currentOperation.description} onChange={this.props.handleChangeInput} name='description'  label='Description' type='text' placeholder='Description' />
                <label style={displayBlock}>Receipt photo</label>
                <input style={widthOfInputInCreateOperation}  name='image'   type='file' placeholder='Receipt photo' 
                  ref={fileInput => (this.fileInput = fileInput)}
                  type="file"
                  onChange={e => this.props.handleFileUpload(e)}
                />
                <Form.Input value={this.props.currentOperation.date_of_expense} onChange={this.props.handleChangeInput}   name='date_of_expense' label='Date of operation' type='date' placeholder='Date of operation' />
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      </div>
    )
  }
}


export default CreateExpenseIncome