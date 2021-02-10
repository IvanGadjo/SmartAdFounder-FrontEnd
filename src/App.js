/* global chrome */
import React, { useState, useEffect} from 'react'
import './App.css';
import AddUserInterest from './components/AddUserInterest/AddUserInterest';
import SockJsClient from 'react-stomp';
import ApiService from './service/ApiService';
import {mockUser} from './data/MockUser';
import ManageInterests from './components/ManageInterests/ManageInterests';
import EditUserInterest from './components/EditUserInterest/EditUserInterest'


const SOCKET_URL = 'http://localhost:8080/client'

function App() {

  const [addNew, setAddNew] = useState(false)
  const [route, setRoute] = useState('manage')
  const [userInterest, setUserInterest] = useState({})    // noviot user interest koj bi bil dodaden
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
    setRoute('manage')
    //setUser({...user, userInterests: ['m' , 'd']})
    let user2 = {...user};
    user2.userInterests.push(userInterest);
    setUser(user2);
    console.log(user);
    ApiService.createUserInterest(userInterest, user.id);
  }

  
  const editInterest = (int) => {
    setRoute('edit')
    // axios editUserInterest
  }

  const deleteInterest = (int) => {
    let user2 = user;
    console.log(user2)
    const index = user2.userInterests.indexOf(int);
    user2.userInterests.splice(index, 1);
    console.log(user2);
    //setUser(user2);
    // axios editUserInterest
    // active: false prakjam kako argument
  }

  const addInterest = () => {
      setRoute('add')
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
      id: '7'
    }

    ApiService.createUser(demoUser).then(resp => {
      console.log(resp);
      setUser(resp.data)

    }).catch(err => {
      console.log(err);
    })

  },[])




  return (
    <div className="App">
      { () => {if(route === 'add') {
      <AddUserInterest
        onSubmit={onSubmit} 
        handleInputChange={handleInputChange}
        editInt = {editInt}
      /> }
       else if(route === 'manage') {
      <ManageInterests
        editInterest={editInterest}
        deleteInterest={deleteInterest}
        addInterest={addInterest}
        user={user}
      /> }
       else if(route === 'edit') {
        <EditUserInterest
          editInterest={editInterest}
        />
      }}}
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
