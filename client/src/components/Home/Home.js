import React, { Component } from 'react';
import { Button, Grid, Header, Segment, Modal, Image } from 'semantic-ui-react'


class Home extends Component {
  constructor(props){
    super(props)
  }
  triggerModal(){

  }
  render() {
    return (
      <Segment  inverted color='black' style={{width:'100vw', height:'85vh'}} placeholder>
        <Grid  divided inverted padded columns={1}  textAlign='center'>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column >
              <Header as='h1' icon color='white' style={{color:'white',important:true }}>
               Budget App
              </Header>
              <Modal trigger={<Button>Instructions</Button>}>
                <Modal.Header>Budgeting App</Modal.Header>
                <Modal.Content image>
                  <Image wrapped size='medium' src='https://www.cpacanada.ca/-/media/site/operational/ec-education-certification/images/g10266-ec.jpg' />
                  <Modal.Description>
                    <Header>Instructions:</Header>
                    <ol>
                      <li>Login or Sign Up in the rigth corner</li>
                      <li>Create your wallets/accounts</li>
                      <li>Create your income/expense in create operation</li>
                      <li>See reports in reports or in All incomes/All expenses</li>
                      <li>Coming soon...</li>
                    </ol>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default Home;