/* global chrome */
import React, { useState, useEffect} from 'react'
import './App.css';
import AddUserInterest from './components/AddUserInterest/AddUserInterest';
import SockJsClient from 'react-stomp';
import ApiService from './service/ApiService';
import {mockUser} from './data/MockUser';
import ManageInterests from './components/ManageInterests/ManageInterests';
import EditUserInterest from './components/EditUserInterest/EditUserInterest'


const SOCKET_URL = 'http://localhost:8080/kafka-chat'

function App() {

  const [route, setRoute] = useState('manage')
  const [userInterest, setUserInterest] = useState({})    // noviot user interest koj bi bil dodaden
  const [user, setUser] = useState(mockUser)
  const [foundAd, setFoundAd] = useState({})
  const [editedUserInterest, setEditedUserInterest] = useState([])

  // chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  //   // Use the token.
  //   // console.log('Jas sum!')
  //   // console.log(token);  
  // });


  // ovaa funkcija bi se koristela posle build na chrome extensionot, go zema mailot od google acc
  // koj e logiran vo browser

  // chrome.identity.getProfileUserInfo((userInfo) => {
  //   console.log('User Info: ');
  //   console.log(userInfo)
  //   ApiService.createUser(userInfo).then(resp => {
  //     setUser(resp.data)

  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }




  // useEffect - demo user mesto rabota so chrome identity
  useEffect(() => {

    const demoUser = {
      email: 'demoEmail@gmail.com',
      id: '7'
    }

    ApiService.createUser(demoUser).then(resp => {
      setUser(resp.data)

    }).catch(err => {
      console.log(err);
    })

  },[])

  const onConnected = () => {
    console.log("Connected!");
  }

  const onMessageReceived = (msg) => {
    console.log("Message Received", msg);

    msg.url = msg.adUrl   // ova go pravime poso od backend preku websocket se vrakja KafkaFoundAdMessage, a ne samo FoundAdvert

    setFoundAd(msg);
    let user2 = {...user}

    user2.userInterests.map(userInt => {

      // console.log(userInt.keywords.mainKeyword)
      // foundAd.id e sekogas null, treba da e vaka:
      console.log(foundAd.userInterestId, userInt.id)

      if(foundAd.id === userInt.id) {   
        userInt.foundAdverts.push(foundAd);
      } else {
        
      }
    });


    setUser(user2);

    console.log(user2);
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


    ApiService.editUserInterests(finalUserInterest, user.id)


    setRoute('manage');
  }

  const onSubmit = (e) => {

    let userInterestRedefined = {...userInterest};

    // dopolnuva user interest
    userInterestRedefined.active = true;

    userInterestRedefined.keywords = {
      mainKeyword: userInterest.keywords,
      otherKeywords: []
    }


    e.preventDefault();
    setRoute('manage');

    // samo radi render
    const user2 = {...user};
    userInterestRedefined.foundAdverts = [];
    user2.userInterests.push(userInterestRedefined);
    setUser(user2);
    // console.log('CREATED USER INT, USER: ', user);

    ApiService.createUserInterest(userInterestRedefined, user.id);
  }

  
  const editInterest = (int) => {
    setRoute('edit');
    setUserInterest({
      keywords: int.keywords.mainKeyword,
      category: int.category,
      region: int.region
    })
    setEditedUserInterest([int.keywords.mainKeyword, int.category, int.region, int.id])
    
  }

  const deleteInterest = (int) => {
    let user2 = {...user};
    const index = user2.userInterests.indexOf(int);
    user2.userInterests.splice(index, 1);
    setUser(user2);

    int.active = false;
    ApiService.editUserInterests(int, user.id)
  }

  const addInterest = () => {
      setRoute('add');
  }

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    
    setUserInterest({...userInterest, [name] : value})

  }

  return (
    <div className="App">


      <SockJsClient 
        url={SOCKET_URL}
        topics={['/topic/group']}
        onConnect={onConnected} 
        onDisconnect={console.log("Disconnected")} 
        onMessage={msg => onMessageReceived(msg)}
        debug={false}
      />

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


      
    

    </div>
  );
}

export default App;
