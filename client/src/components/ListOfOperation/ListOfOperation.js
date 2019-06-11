import React, { Component } from 'react';
import {viewOfSegment,marginZero,operationsLessThanSix} from '../style';
import {Segment,Table,Button,Modal,Header,Image} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import Filter from '../Filter/Filter'
class ListOfExpenses extends Component {

  constructor(props){
    super(props);
    this.state = {
      active:'active',
      selectedCellsTotal:0,
      redirect:false
    }
    this.sum = this.sum.bind(this);
    this.addClassActive = this.addClassActive.bind(this);
  }

  sum(key) {
    let {searchByName, category,date_of_expense,wallet,expenses} = this.props
    let filteredExpenses = this.props.expenses&&this.props.expenses.map(operation=>operation.filter(expense=>
      { if(expense )return  (expense.name&&expense.name.toLowerCase().includes(searchByName.toLowerCase())) && 
                (expense.category&&expense.category.indexOf(category)!==-1) &&
                (expense.date_of_expense&&expense.date_of_expense.indexOf(date_of_expense)!==-1) &&
                (expense.wallet_id&&expense.wallet_id.toString().includes(wallet))
      }
    ))
      let arrayOfSums = filteredExpenses.map(element=>element[0]&&element.reduce((a, b) => a + (b[key] || 0), 0))
      .reduce((a,b)=>{let first = a?a:0; let second = b?b:0 ;return first+second})

    return filteredExpenses[0]&&arrayOfSums
  }

  addClassActive(e){
    e.preventDefault();
    if (e.target.parentNode.classList[0]){
      e.target.parentNode.classList.remove('active');
      const checkedNumber  = Number(e.target.parentNode.childNodes[1]&&e.target.parentNode.childNodes[1].innerHTML)?Number(e.target.parentNode.childNodes[1].innerHTML):0;
      let selectedCellsTotal = this.state.selectedCellsTotal;
      selectedCellsTotal-=checkedNumber;
      this.setState({selectedCellsTotal})
    }else{
      e.target.parentNode.classList.add("active");
      const checkedNumber  = Number(e.target.parentNode.childNodes[1]&&e.target.parentNode.childNodes[1].innerHTML)?Number(e.target.parentNode.childNodes[1].innerHTML):0;
      let selectedCellsTotal = this.state.selectedCellsTotal;
      selectedCellsTotal+=checkedNumber;
      this.setState({selectedCellsTotal})
    }
  }
  render() {
    if(this.state.redirect) return <Redirect to='/operation'/>
    const {selectedCellsTotal} = this.state;
    const {expenses,searchByName,category,date_of_expense,wallet,IsExpense,currentOperation} = this.props;
    let filteredExpenses = expenses&&expenses.map(operation=>operation.filter(expense=>
    { if(expense){
      return (expense&&expense.name&&expense.name.toLowerCase().includes(searchByName.toLowerCase())) && 
             (expense&&expense.category&&expense.category.indexOf(category)!==-1) &&
             (expense&&expense.date_of_expense&&expense.date_of_expense.indexOf(date_of_expense)!==-1) &&
             (expense.wallet_id&&expense.wallet_id.toString().includes(wallet))  
    }}
    ))
    let countNumberOfAllOperationexpenses = expenses?expenses.reduce((a,b)=>a + b.length,0):0
    return (
      <div>
        <Segment style={countNumberOfAllOperationexpenses>6?operationsLessThanSix:viewOfSegment} inverted color='black' placeholder>
          <h1>List of {IsExpense?'Expenses':'Incomes'}</h1>
          <Filter 
            expenses={this.props.expenses}
            handleOnChange={this.props.handleOnChange}     
            emptyFilter={this.props.emptyFilter}
            wallets={this.props.wallets}
          />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>NAME</Table.HeaderCell>
                <Table.HeaderCell>AMOUNT</Table.HeaderCell>
                <Table.HeaderCell>CATEGORY</Table.HeaderCell>
                <Table.HeaderCell>ACCOUNT ID</Table.HeaderCell>
                <Table.HeaderCell>DATE</Table.HeaderCell>
                <Table.HeaderCell>FUNCTIONS</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {expenses&&filteredExpenses.map(operations=> operations.map(expense=> {const id = expense.id;
                return (
                  <Table.Row onClick={this.addClassActive}  key={expense.id}>
                    <Table.Cell>{expense.name}</Table.Cell>
                    <Table.Cell>{expense.amount}</Table.Cell>
                    <Table.Cell>{expense.category}</Table.Cell>
                    <Table.Cell>{expense.wallet_id}</Table.Cell>
                    <Table.Cell>{expense.date_of_expense}</Table.Cell>
                    <Table.Cell>
                      <div style={{display:'flex',justifyContent:'space-evenly'}}>
                        <Button style={marginZero} name='delete' value='Delete'  icon='trash' size='big'
                          onClick={ (e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            this.props.setCurrentOperation(e,expense);
                            this.props.handleDeleteOperation(e,id);
                            this.props.fetchAllOperation();
                          }}
                        />
                        <Button style={marginZero} name='edit' value='Edit'  icon='edit outline' size='big'
                            onClick={ (e)=>{
                              e.preventDefault();
                              e.stopPropagation();
                              this.props.setCurrentOperation(e,expense);
                              this.setState({redirect:true});
                              this.props.handleEditState(e);
                            }}
                          />
                          <Modal trigger={
                            <Button onClick={(e)=>this.props.setCurrentOperation(e,expense)} style={marginZero} name='view' value='View'  icon='folder open outline' size='big'/>
                          }
                          >
                            <Modal.Header>Operation: </Modal.Header>
                            <Modal.Content image>
                              <Image wrapped size='medium' src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='medium' />
                              <Modal.Description>
                                <Header>{currentOperation.type_of_operation}</Header>
                                <p>Name: {currentOperation.name}</p>
                                <p>Amount: {currentOperation.amount}</p>
                                <p>Category: {currentOperation.category}</p>
                                <p>Date of operation: {currentOperation.date_of_expense}</p>
                                <p>Description: {currentOperation.description}</p>
                                <p>Priority: {currentOperation.priority}</p>
                                <p>Account id: {currentOperation.wallet_id&&currentOperation.wallet_id}</p>
                              </Modal.Description>
                            </Modal.Content>
                          </Modal>      
                        </div>
                    </Table.Cell>
                  </Table.Row>
              )}
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell>Total: </Table.HeaderCell>
                <Table.HeaderCell content={expenses&&this.sum('amount')} icon='currency' />
                <Table.HeaderCell content="Selected cells' sum: "/>
                <Table.HeaderCell content={selectedCellsTotal}/>
                <Table.HeaderCell />
                <Table.HeaderCell />
              </Table.Row>
            </Table.Footer>
          </Table>
        </Segment>
      </div>
    );
  }
}

export default ListOfExpenses;