/* global chrome */
import React, { useState, useEffect} from 'react'
import './App.css';
import AddUserInterest from './components/AddUserInterest/AddUserInterest';
import SockJsClient from 'react-stomp';
import ApiService from './service/ApiService';
import {mockUser} from './data/MockUser';

const SOCKET_URL = 'http://localhost:8080/client'

function App() {

  // classs App
  // constructor() {
  //   super();
  //   this.state = {
  //     isSignedIn: false,
  //     keyword: '',
  //     category: '',
  //     region: '',
  //     foundAdvert: {},
  //     user: {},
  //     userInterests: []
  //   }
  // }

  const [addNew, setAddNew] = useState(false)
  const [userInterest, setUserInterest] = useState({})
  const [user, setUser] = useState(mockUser)
  const [foundAd, setFoundAd] = useState({})

  const onConnected = () => {
    console.log("Connected!");
  }

  const onMessageReceived = (msg) => {
    //this.setState({foundAdvert: msg});
    setFoundAd(msg);
    setUserInterest({...userInterest, foundAd: [...foundAd, msg]});
    console.log("Message Received", msg);
  }

  const onSubmit = (e) => {
    
    // ovde treba da se submitne nov userInterest
    // da se dodade vo listata i da se prenasoci 
    // userot na ManageInterest komponentata
    // treba da se prati do bazata deka userot
    // dobil nov interest
    // axios createUserInterest
    e.preventDefault();

    setAddNew(false);
  }

  
  const editInterest = () => {
    // axios editUserInterest
  }

  const deleteInterest = () => {
    // axios editUserInterest
    // active: false prakjam kako argument
  }

  const addInterest = () => {
      setAddNew(true);
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

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    // this.setState({
    //   [name] : value
    // })
    setUserInterest({...userInterest, [name] : value})
    console.log(userInterest)

  }

  // chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  //   // Use the token.
    
    
  // });
  
  return (
    <div className="App">
      <AddUserInterest
        onSubmit={onSubmit} 
        handleInputChange={handleInputChange}
      />
      {/* <SockJsClient 
        url={SOCKET_URL}
        topics={['/topic/group']}
        onConnect={onConnected} 
        onDisconnect={console.log("Disconnected")} 
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      /> */}
    </div>
  );
}

export default App;
