import React, { Component } from 'react';
import {Segment} from 'semantic-ui-react';
import {reportsStyle} from '../style';

let PieChart = require("react-chartjs").Pie;

let chartOptions = {
	segmentShowStroke : true,
	segmentStrokeColor : "#fff",
	segmentStrokeWidth : 2,
	percentageInnerCutout : 50
}


class Reports extends Component {
	constructor(props){
		super(props)
	}

	sum(key,array) {
    let {searchByName, category,date_of_expense,wallet,expenses} = this.props
    let filteredExpenses = this.props.expenses&&this.props.expenses.map(operation=>operation.filter(expense=>
      { if(expense )return  (expense.name&&expense.name.indexOf(searchByName)!==-1) && 
                (expense.category&&expense.category.indexOf(category)!==-1) &&
                (expense.date_of_expense&&expense.date_of_expense.indexOf(date_of_expense)!==-1)  
      }
    ))
    return array[0]&&array.reduce((a, b) => a + (b[key] || 0), 0)
  }
  render() {
		let dataExpense = [];
		let dataIncome = [];
		let dataBalance = [];
		if(this.props.expenses){
			this.props.expenses.map(operation=>operation.map(data=>dataExpense.push({value:data.amount,label:data.name,color:'red',highlight: "#C69CBE"})));
		}else{
			dataExpense.push({value:10,label:"You don't have expenses"})
		}
		if(this.props.incomes){
			this.props.incomes.map(operation=>operation.map(data=>dataIncome.push({value:data.amount,label:data.name,color: "blue",highlight: "#C69CBE"})));
		}else{
			dataIncome.push({value:10,label:"You don't have incomes"})
		}
		dataBalance.push({value:this.sum('value',dataExpense),label:'Expense'})
		dataBalance.push({value:this.sum('value',dataIncome),label:'Incomes'})
    return (
      <Segment inverted color='black' placeholder>
				<h1>My Reports</h1>
				<div style={reportsStyle}>
					<div >
						<h1>My Expenses</h1>
						{dataExpense[0]?<PieChart data={dataExpense} options={chartOptions} width="300" height="150"/>:<h1>N/A</h1>}
					</div>
					<div>
						<h1>My Income</h1>
						{dataIncome[0]?<PieChart data={dataIncome} options={chartOptions} width="300" height="150"/>:<h1>N/A</h1>}
					</div>
					<div>
						<h1>My Balance</h1>
						{dataBalance[0].value&&dataBalance[1].value?<PieChart data={dataBalance} options={chartOptions} width="300" height="150"/>:<h1>N/A</h1>}
					</div>
				</div>
      </Segment>
    );
  }
}

export default Reports;