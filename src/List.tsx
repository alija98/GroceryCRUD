import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import React, {useState, useEffect, useCallback, memo} from 'react';
import SingleItem from './SingleItem';
import {useSelector, useDispatch} from 'react-redux';
import {SingleItemType} from './lib/api';

const List = () => {
  const data = useSelector(state => state);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const changeQuantity = (index: number, operation: string) => {
    dispatch({
      type: 'UPDATE_GROCERY_REQUESTED',
      payload: {
        index,
        operation,
      },
    });
  };
  const renderSingleItem = useCallback(
    ({item, index}: {item: SingleItemType; index: number}) => (
      <SingleItem
        id={item.id}
        name={item.name}
        quantity={item.quantity}
        changeQuantity={changeQuantity}
        deleteItem={deleteItem}
      />
    ),
    [],
  );

  const deleteItem = (index: number) => {
    dispatch({
      type: 'DELETE_GROCERY_REQUESTED',
      payload: index,
    });
  };
  useEffect(() => {
    dispatch({type: 'GROCERY_FETCH_REQUESTED'});
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Grocery List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add grocery"
          onChangeText={newText => setText(newText)}
          defaultValue={text}
        />
        <TouchableOpacity
          style={styles.addItem}
          disabled={text.length < 3 ? true : false}
          onPress={() => {
            dispatch({type: 'CREATE_GROCERY_REQUESTED', payload: text});
            setText('');
          }}>
          <Text style={{color: 'white'}}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        renderItem={renderSingleItem}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default memo(List);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  heading: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 22,
  },
  input: {
    height: 40,
    width: '55%',
    borderBottomWidth: 2,
    marginHorizontal: 10,
    paddingHorizontal: 2,
  },
  addItem: {
    backgroundColor: 'blue',
    marginRight: 10,
    height: 40,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
});
