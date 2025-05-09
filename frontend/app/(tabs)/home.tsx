import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View ,Text} from 'react-native';
import Header from '../(home)/header';
import HealthCard from '../(home)/healthCard'
import ActivitySummary from '../(home)/activitySummary';
import TabS from '../(home)/tabSelector';
export default function Home() {
  // const [username, setUsername]= useState(null);
  // useEffect(()=>{
  //   const fetchUser= async () =>{
  //     try {
  //       const response= await fetch('http://');
  //       const result= await response.json();
  //       setUsername(username)
  //     }
  //     catch(error){
  //       console.error("Lỗi:", error);
  //     }
  //   };
  //   fetchUser();
  // })
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header/>
        <TabS/>
        <HealthCard />
        <ActivitySummary />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC730',
  },
  hello:{
    fontSize:14,
    margin:10
  }
});
