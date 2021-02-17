export function selectFormContact(state) {
  return {
    id: state.data.id,
    name: state.data.name,
    surName: state.data.surName,
    phone: state.data.phone
  }
}

export function selectFormIsShow(state) {
  return state.data.isShow;
}

export function selectFormIsNew(state) {
  return state.data.isNew;
}