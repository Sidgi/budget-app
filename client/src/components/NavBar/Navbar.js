import React from 'react';
import {Button, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
function NavBar(props){
  return(
    <div>
      <Segment style={{display:'flex',justifyContent:'flex-end'}} inverted>
        {localStorage.getItem('token')?
          <div>
            <Link to='/'>
              <Button basic inverted color='grey'>
                Home
              </Button>
            </Link>
            <Link to='/myaccount'>
              <Button basic inverted color='grey'>
                My profile
              </Button>
            </Link>
            <Link to='/reports'>
              <Button basic inverted color='grey'>
                My Reports
              </Button>
            </Link>
            <Link to='/listofoperations' onClick={props.handleIsExpenseFalse}>
              <Button basic inverted color='grey'>
                All incomes
              </Button>
            </Link>
            <Link to='/listofoperations' onClick={props.handleIsExpenseTrue}>
              <Button basic inverted color='grey'>
                All expences
              </Button>
            </Link>
            <Link to='/createwallet'>
              <Button basic inverted color='grey'>
                Create Account/Wallet
              </Button>
            </Link>
            <Link to='/operation'>
              <Button content='Create Operation' onClick={props.handleEditStateCreate} basic inverted color='grey'/>
            </Link>
            <Link to='/'>
              <Button onClick={props.logOut} basic inverted color='grey'>
                Log Out
              </Button>
            </Link>
          </div>
          :<div>
            <Link to='/login'>
              <Button basic inverted color='grey'>
                Log In
              </Button>
            </Link>
            <Link to='/signup'>
              <Button basic inverted color='grey'>
                Sign Up
              </Button>
            </Link>
          </div>
        }
      </Segment>
    </div>
  )
}

export default NavBar