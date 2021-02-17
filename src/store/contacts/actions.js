export const CONTACTS_FETCH = 'DATA_FETCH_START';
export const CONTACTS_FETCH_SUCCESS = 'DATA_FETCH_SUCCESS';
export const CONTACTS_FETCH_ERROR = 'DATA_FETCH_ERROR';

const TOKEN = '602bf81030ba720017222796';
const URL = 'https://' + TOKEN + '.mockapi.io';

export const fetchStart = () => ({
  type: CONTACTS_FETCH
});

export const fetchError = () => ({
  type: CONTACTS_FETCH_ERROR
})

export const fetchSuccess = (contacts) => ({
  contacts,
  type: CONTACTS_FETCH_SUCCESS
})

export function fetchData() {
  return async dispatch => {
    dispatch(fetchStart());
    try {
      const response = await fetch(URL + '/contacts');
      const data = await response.json();
      const action = fetchSuccess(data);
      dispatch(action)
    } catch (error) {
      dispatch(fetchError())
    }
  }
};

export function fetchDeleteItem(id) {
  return async dispatch => {
    try {
      await fetch(URL + '/contacts/' + id, {
        method: 'DELETE'
      });
      dispatch(fetchData());
    } catch (error) {
      dispatch(fetchError())
    }
  }
};

export function fetchUpdateItem(contact) {
  return async dispatch => {
    try {
      await fetch(URL + '/contacts/' + contact.id, {
        method: 'PUT',
        body: JSON.stringify(contact),
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

export function fetchInsertItem(contact) {
  return async dispatch => {
    try {
      await fetch(URL + '/contacts', {
        method: 'POST',
        body: JSON.stringify(contact),
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