import React, {Component} from 'react';
import NavBar from './components/NavBar/Navbar';
import Footer from './components/Footer/Footer';
import {Route,Switch,Redirect} from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import CreateExpenseIncome from './components/CreateExpenseIncome/CreateExpenseIncome';
import {userCreate,userLogin,getAllOperations,deleteOperation} from './components/service';
import Home from './components/Home/Home'
import AccountPage from './components/AccountPage/AccountPage'
import './App.css';
import ListOfOperation from './components/ListOfOperation/ListOfOperation';
import MyAccount from './components/MyAccount/MyAccount';
import Reports from './components/Reports/Reports';
import history from './history.js';

class App extends Component {
  constructor(){
    super();
    this.state={
      token:null,
      email:'',
      password:'',
      username:'',
      newUser:null,
      isLoggedIn:false,
      currentOperation:{
        id:'',
        name:'',
        category:'',
        amount:'',
        wallet_id:'',
        description:'',
        type_of_operation:'Income',
        priority:'High',
        date_of_expense:new Date().toISOString().substr(0,10),
        image:''
      },
      EditState:false,
      incomes:null,
      expenses: null,
      active:'active',
      selectedCellsTotal:0,
      searchByName:'',
      category:'',
      date_of_expense:'',
      wallet:'',
      redirect:false,
      IsExpense:true,
      allWallets:null,
      filteredWallets:''
    } 
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logIn = this.logIn.bind(this);
    this.setCurrentOperation = this.setCurrentOperation.bind(this);
    this.handleEditState = this.handleEditState.bind(this);
    this.handleEditStateCreate = this.handleEditStateCreate.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.unselectImage = this.unselectImage.bind(this);
    this.emptyFilter = this.emptyFilter.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleIsExpenseTrue = this.handleIsExpenseTrue.bind(this)
    this.handleIsExpenseFalse = this.handleIsExpenseFalse.bind(this)
    this.handleDeleteOperation = this.handleDeleteOperation.bind(this)
    this.fetchAllOperation = this.fetchAllOperation.bind(this)
    this.logOut = this.logOut.bind(this)
  }
  /*
  ** THIS FUNCTION FETCHES ALL WALLETS FOR USER AND SETS INITIAL STATE TO ALL WALLETS 
  ** INCOMES AND EXPENSES 
  */ 
  async fetchAllOperation(){
    const elements = await getAllOperations();
    const allWallets = elements.wallets;
    this.setInitialState(allWallets)
    this.filterOperations();
  }

  filterOperations(){
    const incomes = this.state.allWallets&&this.state.allWallets.map(wallet=>wallet.operations.filter(operation=>operation.type_of_operation === 'Income'));
    const expenses = this.state.allWallets&&this.state.allWallets.map(wallet=>wallet.operations.filter(operation=>operation.type_of_operation === 'Expense'))
    this.setState({incomes,expenses})
  }

  setInitialState(allWallets){
    let currentOperation={
      id:'',
      name:'',
      category:'',
      amount:'0',
      wallet_id:allWallets[0].id,
      description:'',
      type_of_operation:'Income',
      priority:'High',
      date_of_expense:new Date().toISOString().substr(0,10),
      image:''
    }
    this.setState({allWallets,currentOperation});
  }
  async componentDidMount(){
    await this.fetchAllOperation();
  }
  logOut(){
    localStorage.clear();
    this.setState({isLoggedIn:false});
  }
  emptyFilter(e){
    e.preventDefault()
    this.setState({
      category:'',
      searchByName:'',
      date_of_expense:'',
      wallet:'',
      selectedCellsTotal:0
    })
    this.filterOperations();
  }
  handleEditState(e){
    e.preventDefault();
    this.setState({EditState:true});
  }
  handleEditStateCreate(e){
    const {allWallets} = this.state;
    this.setState({
      EditState:false,
      currentOperation:{
        id:'',
        name:'',
        category:'',
        amount:'0',
        wallet_id:allWallets[0].id,
        description:'',
        type_of_operation:'Income',
        priority:'High',
        date_of_expense:new Date().toISOString().substr(0,10),
        image:''
      }
    });
  }

  async handleDeleteOperation(e,id){
      await deleteOperation(e,id);
      const elements = await getAllOperations();
      this.filterOperations()
  }
  unselectImage(image){
    this.setState(prevState => ({
      ...prevState, 
      ['currentOperation']: { 
        ...prevState['currentOperation'], image: ''
      }
    }));
  };

  handleFileUpload(e){
    let reader = new FileReader();
    let image = e;
    reader.onloadend = () => {
      this.setState(prevState => ({
        ...prevState, 
        ['currentOperation']: { 
          ...prevState['currentOperation'], image: image
        }
      }));
    };
    image&&reader.readAsDataURL(image);
  }

  // this handle on Change is for filter
  handleOnChange(e){
    e.preventDefault();
    const {name,value} = e.target;
    this.setState({[name]:value});
  }

  // this function for changing state of isExpesnse if true pass to list of operations expense
  // if not pass list of incomes
 
  handleIsExpenseTrue(){
    this.setState({IsExpense:true})
  }
  handleIsExpenseFalse(){
    this.setState({IsExpense:false})
  }
  handleChange(e){
    e.preventDefault();
    const {name,value} = e.target;
    this.setState({[name]:value})
  }
  setCurrentOperation(e,currentOperation){
    e.preventDefault();
    this.setState({currentOperation});
  }
  signUp = async (e) =>{
    e.preventDefault();
    const data = {
      "email": this.state.email,
      "password": this.state.password,
      "username": this.state.username
    }
    const newUser = await userCreate(data);
    this.setState({newUser:newUser.data});
    this.state.newUser&&history.push('/login');
    
  }
  logIn = async (e) =>{
    const {username,password,isLoggedIn} = this.state;
    e.preventDefault();
    const data = {
      "username":username,
      "password": password
    }
    const returnedData = await userLogin(data);
    const token = await returnedData.token;
    token&&this.setState({token,isLoggedIn:true});
    token?localStorage.setItem("token",token):alert('Please reenter password');
    token?localStorage.setItem("email",returnedData.email):alert('Please reenter password');
    token&&localStorage.setItem("username",username);
    token&&localStorage.setItem("user_id",returnedData.user_id);
    isLoggedIn&&history.push('/myaccount');
    this.fetchAllOperation();
  }

  handleChangeInput =  (e) => {
    let { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState, 
      ['currentOperation']: { 
        ...prevState['currentOperation'], [name]: value
      }
    }));
  }
  
  render(){
    const {isLoggedIn,currentOperation,EditState,IsExpense} =this.state
    return (
      <div className="App">
        <NavBar 
          handleEditStateCreate={this.handleEditStateCreate}
          handleIsExpenseFalse={this.handleIsExpenseFalse}
          handleIsExpenseTrue={this.handleIsExpenseTrue}
          isLoggedIn={isLoggedIn}
          logOut={this.logOut}
        />
        <main>
          {localStorage.getItem('token')?
          <Switch>
            <Route  exact path='/' component={Home}/>
            <Route path='/login' 
              render={()=>
                <Login 
                  handleChange={this.handleChange} 
                  signUp={this.signUp}
                  logIn={this.logIn}
                />
              }
            />
            <Route path='/signup' 
              render={()=>
                <SignUp 
                  handleChange={this.handleChange} 
                  signUp={this.signUp}
                  logIn={this.logIn}
                />
              }
            />
            <Route path='/operation'  
              render={ ()=>
                <CreateExpenseIncome 
                  handleChangeInput={this.handleChangeInput} 
                  currentOperation={currentOperation} 
                  EditState={EditState} 
                  fetchAllOperation={this.fetchAllOperation}
                  wallets={this.state.allWallets}
                  history={history}
                />
              }
            />
            <Route path='/createwallet' 
              render={()=>
                <AccountPage 
                  history={history}
                  fetchAllOperation={this.fetchAllOperation}
                />
              }
            />
            <Route path='/myaccount' 
              render={()=>
                <MyAccount
                  incomes={this.state.incomes} 
                  expenses={this.state.expenses} 
                  wallets={this.state.allWallets}
                />
              }
            />
            <Route path='/reports' 
              render={()=>
                <Reports 
                  handleChangeInput={this.handleChangeInput} 
                  incomes={this.state.incomes} 
                  expenses={this.state.expenses} 
                  wallets={this.state.allWallets}
                />
              }
            />
            <Route path='/listofoperations' 
              render={()=>
                <ListOfOperation
                  expenses={IsExpense?this.state.expenses:this.state.incomes}
                  handleOnChange={this.handleOnChange}
                  emptyFilter= {this.emptyFilter}
                  searchByName={this.state.searchByName}
                  category={this.state.category}
                  date_of_expense={this.state.date_of_expense}
                  wallet={this.state.wallet}
                  setCurrentOperation={this.setCurrentOperation}
                  handleEditState={this.handleEditState}
                  IsExpense={IsExpense}
                  handleDeleteOperation={this.handleDeleteOperation}
                  fetchAllOperation={this.fetchAllOperation}
                  currentOperation={this.state.currentOperation}
                  wallets = {this.state.allWallets}
                />
              }
            />
          </Switch>:
          <Switch>
            <Route path='/login' 
              render={()=>
                <Login 
                  handleChange={this.handleChange} 
                  signUp={this.signUp}
                  logIn={this.logIn}
                />
              }
            />
            <Route path='/signup' 
              render={()=>
                <SignUp 
                  handleChange={this.handleChange} 
                  signUp={this.signUp}
                  logIn={this.logIn}
                />
              }
            />
            <Route  exact path='/' component={Home}/>
          </Switch> 
        }
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
