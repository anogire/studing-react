
import { USERS } from '../api-connect/api_consts';
import usersAPI from '../api-connect/usersAPI';
import { createRestApiActions } from '../common';

const usersActions = createRestApiActions(USERS, usersAPI);

export const usersFetch = usersActions.getAll;
export const userCreate = usersActions.create;
export const userUpdate = usersActions.update;
export const userDelete = usersActions.delete;
