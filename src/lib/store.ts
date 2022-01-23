import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from '@redux-saga/core';
import {put, takeEvery} from 'redux-saga/effects';
import {SingleItemType} from './api';
import {getGrocery, createGrocery, updateGrocery, deleteGrocery} from './api';

function* getGroceriesAction() {
  const groceryList: SingleItemType[] = yield getGrocery();
  yield put({type: 'GROCERY_FETCH_SUCCEEDED', payload: groceryList});
}

function* createGroceriesAction({
  payload,
}: {
  type: 'CREATE_GROCERY_REQUESTED';
  payload: string;
}) {
  yield createGrocery(payload);
  yield put({type: 'GROCERY_FETCH_REQUESTED'});
}

function* updateGroceryAction({
  payload,
}: {
  type: 'UPDATE_GROCERY_REQUESTED';
  payload: {id: number; operation: string};
}) {
  yield updateGrocery(payload);
  yield put({type: 'GROCERY_FETCH_REQUESTED'});
}

function* deleteGroceryAction({
  payload,
}: {
  type: 'DELETE_GROCERY_REQUESTED';
  payload: number;
}) {
  yield deleteGrocery(payload);
  yield put({type: 'GROCERY_FETCH_REQUESTED'});
}

function* rootSaga() {
  yield takeEvery('GROCERY_FETCH_REQUESTED', getGroceriesAction);
  yield takeEvery('UPDATE_GROCERY_REQUESTED', updateGroceryAction);
  yield takeEvery('DELETE_GROCERY_REQUESTED', deleteGroceryAction);
  yield takeEvery('CREATE_GROCERY_REQUESTED', createGroceriesAction);
}

const reducer = (
  state: SingleItemType[] = [],
  action: {type: 'GROCERY_FETCH_SUCCEEDED'; payload: SingleItemType[]},
) => {
  switch (action.type) {
    case 'GROCERY_FETCH_SUCCEEDED':
      return action.payload;
    default:
      return state;
  }
};

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
