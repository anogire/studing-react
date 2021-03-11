import { RestService } from './service';

class UsersAPI extends RestService {
  itemKey = 'users';
}

export default new UsersAPI();