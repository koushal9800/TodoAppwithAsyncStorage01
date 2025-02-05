import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
// import { FlatList } from 'react-native-gesture-handler'

const App = () => {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex,setEditIndex] = useState(null)

useEffect(()=>{
  loadTask()
},[])
  const saveTask = async(tasks) =>{
    try{
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
    } catch (error) {
      console.log("Error saving tasks:", error);
    }
  }

  const loadTask = async ()=>{
    try{
    const storedTask = await AsyncStorage.getItem("tasks")
    if(storedTask){
      setTasks(JSON.parse(storedTask))
    }
  }catch (error) {
    console.log("Error saving tasks:", error);
  }
  }

  const addText = () => {
    if (text.trim()) {
      const newTasks = [...tasks];
      if(editIndex !== null){
        newTasks[editIndex] = text
        setEditIndex(null)
      } else{
        newTasks.push(text)
      }
      setTasks(newTasks);
      saveTask(newTasks)
      setText('');
    }
  };

  const removeTask = (index)=>{
    const newTasks = tasks.filter((_,item)=>item !== index)
    setTasks(newTasks)
    saveTask(newTasks)
  }

  const editTask =(index)=>{
setText(tasks[index])
setEditIndex(index)
  }

  return (
    <View>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter Todo"
        style={{borderWidth: 1}}
      />
      <TouchableOpacity
        onPress={addText}
        style={{
          backgroundColor: 'red',
          padding: 12,
          width: 50,
          marginTop: 12,
          alignSelf: 'center',
        }}>
        <Text style={{color: 'white'}}>Add</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        renderItem={({item, index}) => (
          <View
            style={{
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems:'center'
            }}>
            <Text>{item}</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={()=>editTask(index)}
                style={{
                  backgroundColor: 'green',
                  padding: 12,
                  width: 50,
                  alignSelf: 'center',
                }}>
                <Text style={{color: 'white'}}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={()=>removeTask(index)}
                style={{
                  backgroundColor: 'red',
                  padding: 12,
                  alignSelf: 'center',
                }}>
                <Text style={{color: 'white'}}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default App;
