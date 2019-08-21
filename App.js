/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList
} from 'react-native';
import Modal from 'react-native-modal'
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Constants from './Constants'

const data = [
  {todo: 'My job 1'},
  {todo: 'My job 2'},
  {todo: 'My job 3'},
  {todo: 'My job 4'},
  {todo: 'My job 5'},
  {todo: 'My job 6'},
  {todo: 'My job 7'},
  {todo: 'My job 8'},
  {todo: 'My job 9'}
]

const App = () => {
  const [input, setInput] = useState('')
  const [list, setList] = useState(data)
  const [listBackup, setListBackup] = useState(list)
  const [completedList, setCompletedList] = useState([])
  const [modalAddShow, setModalAddShow] = useState(false)
  const [addInput, setAddInput] = useState('')

  const onSearchTextChange = text => {
    setInput(text)
    const newData = listBackup.filter(x => x.todo.includes(text))
    setList(newData)
  }

  const hideModalEditNote = () => {
    setAddInput('')
    setModalAddShow(false)
  }

  const addListItem = () => {
    const newList = [...list, {todo: addInput}]
    setList(newList)
    setListBackup(newList)
    hideModalEditNote()
  }

  const renderItem = (item, index, completed = false) => {
    const removeItem = item => {
      const newList = list.filter(x => x.todo != item.todo)
      setList(newList)
      setListBackup(newList)
    }

    return (
      <View style={{
        borderRadius: 4,
        marginBottom: 10,
        padding: 7,
        paddingHorizontal: 10,
        backgroundColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Text>{item.todo}</Text>
        <View style={{flexDirection: 'row'}}>
          {!completed &&
            <TouchableOpacity style={{marginRight: 7}} onPress={() => {
              removeItem(item)
              setCompletedList([...completedList, item])
            }}>
              <Image source={Constants.iconCheck}/>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => {
            removeItem(item)
          }}>
            <Image source={Constants.iconCancel}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderListFooter = () => {
    return (
      <Fragment>
        <Text style={{marginVertical: 10}}>{'Complete list'}</Text>
        <FlatList
          data={completedList}
          keyboardShouldPersistTaps={'handled'}
          renderItem={({item, index}) => renderItem(item, index, true)}
          keyExtractor={(item, index) => index.toString()}
        />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.appTitle}>{'Todo App'}</Text>

        <View style={styles.searchContainer}>
          <Image source={Constants.iconSearch} style={styles.searchIcon}/>
          <TextInput
            style={styles.searchInput}
            placeholder={'Search...'}
            onChangeText={onSearchTextChange}
            value={input}
          />
        </View>

        <TouchableOpacity
          style={styles.addItemButton}
          onPress={() => setModalAddShow(true)}
        >
          <Image source={Constants.iconAdd} style={styles.addItemImage}/>
          <Text>{'Add item'}</Text>
        </TouchableOpacity>

        <FlatList
          data={list}
          keyboardShouldPersistTaps={'handled'}
          renderItem={({item, index}) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={renderListFooter}
        />
        <Modal
          isVisible={modalAddShow}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          onBackButtonPress={hideModalEditNote}
          onBackdropPress={hideModalEditNote}
          backdropTransitionOutTiming={0}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text>{'Add Item'}</Text>
              <TouchableOpacity onPress={hideModalEditNote}>
                <Image source={Constants.iconClose} style={{tintColor: 'black'}}/>
              </TouchableOpacity>
            </View>
            <TextInput
              placeholder={'Insert todo...'}
              style={styles.modalAddInput}
              value={addInput}
              onChangeText={text => setAddInput(text)}
            />
            <TouchableOpacity onPress={addListItem} style={styles.modalAddButton}>
              <Text style={{color: 'white'}}>{'Add'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10
  },
  appTitle: {
    textAlign: 'center',
    fontSize: 25,
    padding: 40,
    marginBottom: 15,
    backgroundColor: Colors.lighter
  },
  searchContainer: {
    borderRadius: 4,
    marginBottom: 15,
    padding: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'grey',
    alignItems:'center'
  },
  searchIcon: {
    tintColor: 'grey',
    marginLeft: 3, 
    marginRight: 6
  },
  searchInput: {
    flex: 1,
    paddingVertical: 3
  },
  addItemButton: {
    flexDirection: 'row', 
    margin: 10, 
    marginBottom: 15
  },
  addItemImage: {
    tintColor: 'grey',
    marginRight: 5
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 4
  },
  modalHeader: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  modalAddInput: {
    padding: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  modalAddButton: {
    backgroundColor: '#1365AF',
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 4,
    alignSelf: 'center',
    marginBottom: 20
  }
});

export default App;
