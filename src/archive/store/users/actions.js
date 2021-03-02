export const DATA_FETCH_START = 'DATA_FETCH_START';
export const DATA_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS';
export const DATA_FETCH_ERROR = 'DATA_FETCH_ERROR';

const TOKEN = '602bf81030ba720017222796';
const URL = 'https://' + TOKEN + '.mockapi.io';

export const fetchStart = () => ({
  type: DATA_FETCH_START
});

export const fetchError = () => ({
  type: DATA_FETCH_ERROR
})

export const fetchSuccess = (users) => ({
  users,
  type: DATA_FETCH_SUCCESS
})

export function getAll() {
  return async dispatch => {
    dispatch(fetchStart());
    try {
      const response = await fetch(URL + '/users');
      const users = await response.json();
      const action = fetchSuccess(users);
      dispatch(action)
    } catch (error) {
      dispatch(fetchError())
    }
  }
};

export function fetchDeleteItem(id) {
  return async dispatch => {
    try {
      await fetch(URL + '/users/' + id, {
        method: 'DELETE'
      });
      dispatch(fetchData());
    } catch (error) {
      dispatch(fetchError())
    }
  }
};

export function fetchUpdateItem(user) {
  return async dispatch => {
    try {
      await fetch(URL + '/users/' + user.id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(fetchData());
    } catch (error) {
      dispatch(fetchError())
    }
  }
};

export function fetchInsertItem(user) {
  return async dispatch => {
    try {
      await fetch(URL + '/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(fetchData());
    } catch (error) {
      dispatch(fetchError())
    }
  }
};