import { TYPE_CHANGE_VALUE, TYPE_TOGGLE_FORM, TYPE_EDIT_CONTACT, TYPE_ADD_CONTACT } from './actions';

const defaultState = {
  id: '',
  name: '',
  surName: '',
  phone: '',
  isShow: false,
  isNew: true
}

export function reducer(state = defaultState, action) {
  switch (action.type) {
    case TYPE_CHANGE_VALUE:
      return {
        ...state,
        [action.field]: action.value
      }
    case TYPE_TOGGLE_FORM:
      return {
        ...state,
        isShow: action.isShow
      }
    case TYPE_EDIT_CONTACT:
      return {
        ...state,
        id: action.contact.id,
        name: action.contact.name,
        surName: action.contact.surName,
        phone: action.contact.phone,
        isNew: false
      }
    case TYPE_ADD_CONTACT:
      return {
        ...state,
        id: '',
        name: '',
        surName: '',
        phone: '',
        isNew: true
      }
    default:
      return state;
  }
}