import React from 'react';
import './Login.css';
import {viewOfSegment} from '../style';
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
function Login(props){
  const showPassword  = true;
  return(
    <div>
      <Segment style={viewOfSegment} inverted color='black' placeholder>
        <Grid columns={2} relaxed='very' stackable>
          <Grid.Column>
            <h1>Log In</h1>
            <Form onSubmit={props.logIn} className='login'>
              <Form.Input onChange={props.handleChange} type='text' name='username' icon='user' iconPosition='left' label='Username' placeholder='Username' />
              <Form.Input onChange={props.handleChange} type='password' name='password' icon='lock' iconPosition='left' label='Password' type='password' />
              <Button type='submit' name='submit' content='Login' primary />
            </Form>
          </Grid.Column>
          <Grid.Column verticalAlign='middle'>
            <Link to='signup'>
              <Button content='Sign up' icon='signup' size='big' />
            </Link>
          </Grid.Column>
        </Grid>
        <Divider className='dividerColorWhite' vertical>Or</Divider>
      </Segment>
    </div>
  )
}

export default Login