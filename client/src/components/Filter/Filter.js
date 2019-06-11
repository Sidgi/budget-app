import React, { Component } from 'react';
import {displayFlex,displayBlock,dimensionOfFilters} from '../style';
import {Button} from 'semantic-ui-react';

class Filter extends Component {
  constructor(props){
    super(props)
  }
  render() {
    let {expenses,wallets} = this.props;
    return (
      <div>
        <div style={displayFlex}>
          <div>
            <label style={displayBlock}>Search by name</label>
            <input name='searchByName' value={this.props.searchByName} onChange={this.props.handleOnChange} style={dimensionOfFilters}/>
          </div>
          <div >
            <label style={displayBlock}>Search by category</label>
            <select name='category' onChange={this.props.handleOnChange} style={dimensionOfFilters}>
              {wallets&&wallets.map(wallet=>wallet.operations.map(operation=>{return <option key={operation.id}>{operation.category}</option>}))}
            </select>
          </div>
          <div>
            <label style={displayBlock}>Search by wallet</label>
            <select name='wallet' onChange={this.props.handleOnChange} style={dimensionOfFilters}>
              {wallets&&wallets.map(wallet=><option key={wallet.id} value={wallet.id}>{wallet.name}</option>)}
            </select>
          </div>
          <div>
            <label style={displayBlock}>Search by date</label>
            <input name='date_of_expense' onChange={this.props.handleOnChange} style={dimensionOfFilters} type='date'/>
          </div>
          <Button onClick={this.props.emptyFilter} style={{margin:'auto 1em auto 0'}} icon='trash'></Button>
        </div>
      </div>
    );
  }
}

export default Filter;