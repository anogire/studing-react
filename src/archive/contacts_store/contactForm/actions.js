export const TYPE_CHANGE_VALUE = 'CHANGE_VALUE';
export const TYPE_TOGGLE_FORM = 'TOGGLE_FORM';
export const TYPE_EDIT_CONTACT = 'EDIT_CONTACT';
export const TYPE_ADD_CONTACT = 'ADD_CONTACT';

export const changeValue = (field, value) => ({
  field,
  value,
  type: TYPE_CHANGE_VALUE
});

export const toggleContactForm = (isShow) => ({
  isShow,
  type: TYPE_TOGGLE_FORM
});

export const editContact = (contact) => ({
  contact,
  type: TYPE_EDIT_CONTACT
});

export const addContact = () => ({
  type: TYPE_ADD_CONTACT
});

