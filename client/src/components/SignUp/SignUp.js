import React from 'react';
import {viewOfSegment} from '../style';
import './SignUp.css';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

function SignUp(props) {
  return(
    <Segment style={viewOfSegment} inverted color='black' placeholder>
      <Grid columns={2} relaxed='very' stackable>
        <Grid.Column>
          <h1>Sign Up</h1>
          <Form onSubmit={props.signUp} className='signUp'>
            <Form.Input onChange={props.handleChange} type='text' name='username' icon='user' iconPosition='left' label='Username' placeholder='Username' />
            <Form.Input onChange={props.handleChange} name='email' icon='mail' iconPosition='left' label='Email' type='email' placeholder='Email'/>
            <Form.Input onChange={props.handleChange} name='password' icon='lock' iconPosition='left' label='Password' type='password' />
            <Button type='submit' name='submit' content='Sign up' primary />
          </Form>
        </Grid.Column>
        <Grid.Column verticalAlign='middle'>
          <Link to='/login'>
            <Button type='submit' name='submit' value='log in' content='Log in' icon='sign in' size='big' />
          </Link>
        </Grid.Column>
      </Grid>
      <Divider className='dividerColorWhite' vertical>Or</Divider>
    </Segment>
  )
}
 
 export default SignUp;