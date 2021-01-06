/* global chrome */
import React, { Component} from 'react'
import './App.css';
import AddUserInterest from './components/AddUserInterest/AddUserInterest';
import SockJsClient from 'react-stomp';
import ApiService from './service/ApiService';

const SOCKET_URL = 'http://localhost:8080/client'

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      keyword: '',
      category: '',
      region: '',
      foundAdvert: {}
    }
  }

  onConnected = () => {
    console.log("Connected!");
  }

  onMessageReceived = (msg) => {
    this.setState({foundAdvert: msg});
    console.log("Message Received", msg);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  }

  // onSearchInput = (event) => {
  //   this.setState({searchInput: event.target.value});
  //   console.log(event.target.value);
  // }

  // onCatSelect = (event) => {
  //   this.setState({catSelect: event.target.value});
  //   console.log(event.target.value);
  // }

  // onRegionSelect = (event) => {
  //   this.setState({regionSelect: event.target.value});
  //   console.log(event.target.value);
  // }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name] : value
    })
  }

  // chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  //   // Use the token.
  //   console.log(token);
  //   this.setState({isSignedIn: true});
    
  // });
  
  render(){
  return (
    <div className="App">
      <AddUserInterest
        onSubmit={this.onSubmit} 
        handleInputChange={this.handleInputChange}
      />
      <SockJsClient 
        url={SOCKET_URL}
        topics={['/topic/group']}
        onConnect={this.onConnected} 
        onDisconnect={console.log("Disconnected")} 
        onMessage={msg => this.onMessageReceived(msg)}
        debug={false}
      />
    </div>
  );
  }
}

export default App;
