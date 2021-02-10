/* global chrome */
import React, { useState, useEffect} from 'react'
import './App.css';
import AddUserInterest from './components/AddUserInterest/AddUserInterest';
import SockJsClient from 'react-stomp';
import ApiService from './service/ApiService';
import {mockUser} from './data/MockUser';
import ManageInterests from './components/ManageInterests/ManageInterests';


const SOCKET_URL = 'http://localhost:8080/client'

function App() {

  const [addNew, setAddNew] = useState(false)
  const [userInterest, setUserInterest] = useState({})
  const [user, setUser] = useState(mockUser)
  const [foundAd, setFoundAd] = useState({})
  const [editInt, setEditInt] = useState({})

  const onConnected = () => {
    console.log("Connected!");
  }

  const onMessageReceived = (msg) => {
    setFoundAd(msg);
    user.userInterests.map(userInt => {
       if(foundAd.id === userInt.id) { 
       //setUser({...user, userInterests: userInt.foundAdverts.push(msg)}) 
      }}
      );
    console.log("Message Received", msg);
  }

  const onSubmit = (e) => {
    console.log(userInterest)
    e.preventDefault();
    setAddNew(false);
    //setUser({...user, userInterests: ['m' , 'd']})
    let user2 = {...user};
    user2.userInterests.push(userInterest);
    setUser(user2);
    console.log(user);
    ApiService.createUserInterest(userInterest, user.id);
  }

  
  const editInterest = () => {
    //setAddNew(true)    
    // axios editUserInterest
  }

  const deleteInterest = () => {
    // axios editUserInterest
    // active: false prakjam kako argument
  }

  const addInterest = () => {
      setAddNew(true);
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    setUserInterest({...userInterest, [name] : value})
    console.log(userInterest)

  }

  // chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  //   // Use the token.
  //   // console.log('Jas sum!')
  //   // console.log(token);
    
  // });

  // chrome.identity.getProfileUserInfo((userInfo) => {
  //   console.log('User Info: ');
  //   console.log(userInfo)
  // Ova samo zaradi testiranje so npm start

  // tuka useEffect
  useEffect(() => {

    console.log('--USE_EFFECT--')

    const demoUser = {
      email: 'demoEmail@gmail.com',
      id: '123'
    }

    ApiService.createUser(demoUser).then(resp => {
      console.log(resp);
    }).catch(err => {
      console.log(err);
    })

  },[])

  return (
    <div className="App">
      { addNew ?
      <AddUserInterest
        onSubmit={onSubmit} 
        handleInputChange={handleInputChange}
        editInt = {editInt}
      /> :
      <ManageInterests
        editInterest={editInterest}
        deleteInterest={deleteInterest}
        addInterest={addInterest}
        user={user}
      />}
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
