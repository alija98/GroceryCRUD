import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';

type SingleItemPropsType = {
  id: number;
  name: string;
  quantity: number;
  changeQuantity: (index: number, operation: string) => void;
  deleteItem: (index: number) => void;
};

const SingleItem = (item: SingleItemPropsType) => {
  const {name, changeQuantity, id, deleteItem} = item;
  const quantity = item.quantity < 1 ? 1 : item.quantity;
  return (
    <View style={styles.container}>
      <View style={{flex: 3, paddingVertical: 5}}>
        <Text style={{fontSize: 15}}>{name}</Text>
      </View>
      <View style={styles.rightContainer}>
        <TouchableOpacity onPress={() => changeQuantity(id, 'plus')}>
          <Text style={styles.touchable}>+</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 15}}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            if (quantity <= 1) {
              deleteItem(id);
            } else {
              changeQuantity(id, 'minus');
            }
          }}>
          <Text style={styles.touchable}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(SingleItem);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#108fd0',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 8,
    // borderWidth: 3,
    borderRadius: 7,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  rightContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  touchable: {
    fontWeight: '800',
    fontSize: 18,
  },
});
