import { createAction, createPayloadAction, createErrorAction } from './createAction';

export function createRequestAction(type, handler, separator = '.') {

  actionCreator.START = type + separator + 'START';
  actionCreator.SUCCESS = type + separator + 'SUCCESS';
  actionCreator.FAILURE = type + separator + 'FAILURE';

  const start = createAction(actionCreator.START);
  const success = createPayloadAction(actionCreator.SUCCESS);
  const failure = createErrorAction(actionCreator.FAILURE);

  function actionCreator(params) {
    return async dispatch => {

      const startAction = start();
      dispatch(startAction);

      try {
        const result = await handler(params);
        const resultAction = success(result);
        dispatch(resultAction);
      } catch (error) {
        const errorAction = failure(error);
        dispatch(errorAction);
      }
    };
  }


  return actionCreator;
}