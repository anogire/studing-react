export function createAction(type) {
  return () => ({ type });
}

export function createPayloadAction(type) {
  return (payload) => ({ type, payload });
}

export function createErrorAction(type) {
  return (error) => ({ type, error });
}