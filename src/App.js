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

  const [route, setRoute] = useState('manage')
  const [userInterest, setUserInterest] = useState({})    // noviot user interest koj bi bil dodaden
  const [user, setUser] = useState(mockUser)
  const [foundAd, setFoundAd] = useState({})
  const [editedUserInterest, setEditedUserInterest] = useState([])

  const onConnected = () => {
    console.log("Connected!");
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

  // useEffect - demo user mesto rabota so chrome identity
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





  const onMessageReceived = (msg) => {
    setFoundAd(msg);
    user.userInterests.map(userInt => {
       if(foundAd.id === userInt.id) { 
       //setUser({...user, userInterests: userInt.foundAdverts.push(msg)}) 
      }}
      );
    console.log("Message Received", msg);
  }

  const submitEdit = (e) => {
    e.preventDefault();

    let user2 = {...user};

    let id = editedUserInterest[3];

    let userIntId = null;

    user2.userInterests.map(ui => {
      if(ui.id === id){
        userIntId = ui.id;
        ui.keywords.mainKeyword = userInterest.keywords;
        ui.region = userInterest.region;
        ui.category = userInterest.category;
      } 
    });

    setUser(user2);



    let finalUserInterest = {...userInterest};
    
    finalUserInterest.id = userIntId;
    finalUserInterest.active = true;

    finalUserInterest.keywords = {
    
        mainKeyword: userInterest.keywords,
        otherKeywords: []  
      
    }


    console.log(finalUserInterest)

    ApiService.editUserInterests(finalUserInterest, user.id)


    setRoute('manage');
  }

  const onSubmit = (e) => {
    console.log(userInterest)

    let userInterestRedefined = {...userInterest};

    userInterestRedefined.keywords = {
      mainKeyword: userInterest.keywords,
      otherKeywords: []
    }

    console.log(userInterestRedefined)

    e.preventDefault();
    setRoute('manage');
    //setUser({...user, userInterests: ['m' , 'd']})

    // samo radi render
    let user2 = {...user};
    user2.userInterests.push(userInterest);
    setUser(user2);
    // console.log(user);

    ApiService.createUserInterest(userInterestRedefined, user.id);
  }

  
  const editInterest = (int) => {
    setRoute('edit');
    console.log(int)
    setUserInterest({
      keywords: int.keywords.mainKeyword,
      category: int.category,
      region: int.region
    })
    setEditedUserInterest([int.keywords.mainKeyword, int.category, int.region, int.id])
    // axios editUserInterest

    
  }

  const deleteInterest = (int) => {
    let user2 = {...user};
    // console.log(user2)
    const index = user2.userInterests.indexOf(int);
    user2.userInterests.splice(index, 1);
    console.log(user2);
    setUser(user2);
    // axios editUserInterest

    int.active = false;
    ApiService.editUserInterests(int, user.id)
    // active: false prakjam kako argument
  }

  const addInterest = () => {
      setRoute('add');
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    setUserInterest({...userInterest, [name] : value})
    console.log(userInterest)

  }





  return (
    <div className="App">

      { 
        (route === 'add') ?
          <AddUserInterest
            onSubmit={onSubmit} 
            handleInputChange={handleInputChange}
          /> 
        : (
        route === 'manage' ?
          <ManageInterests
            editInterest={editInterest}
            deleteInterest={deleteInterest}
            addInterest={addInterest}
            user={user}
        /> 
        : 
        <EditUserInterest
          editedUserInterest={editedUserInterest}
          handleInputChange={handleInputChange}
          submitEdit={submitEdit}
        />
          
        )
        
        }







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
