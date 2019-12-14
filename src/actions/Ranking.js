import fetchJsonp from 'fetch-jsonp';
import qs from 'qs';
import{ replace } from 'react-router-redux';


const API_URL = process.env.REACT_APP_API_URL;
const API_ID = process.env.REACT_APP_API_ID;

// リクエスト開始
const startRequest = category => ({
  type: 'START_REQUEST',
  payload: { category }
});

// レスポンス受信
const receiveData = (category, error, response) => ({
  type: 'RECEIVE_DATA',
  payload: { category, error, response }
});

// リクエスト完了
const finishRequest = category => ({
  type: 'FINISH_REQUEST',
  payload: { category }
});

// ランキングを取得する
export const fetchRanking = categoryId => {
  // redux-thunkを使った非同期処理
  return async (dispatch, getState) => {
    const categories = getState().shopping.categories;
    const category = categories.find(category => (category.id === categoryId));
    if(typeof category === 'undefined') {
      dispatch(replace('/'));
      return;
    }

    dispatch(startRequest(category));

    const queryString = qs.stringify({
      appid: API_ID,
      category_id: categoryId
    });

    try {
      const responce = await fetchJsonp(`${API_URL}?${queryString}`);
      const data = await responce.json();
      dispatch(receiveData(category, null, data));
    } catch(err) {
      dispatch(receiveData(category, err));
    }
    dispatch(finishRequest(category));
  }
}
