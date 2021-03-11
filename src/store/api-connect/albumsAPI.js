import { RestService } from './service';
import { baseAPI } from "./http-common";

class AlbumsAPI extends RestService {
  itemKey = 'albums';

  // не используется
  async getAlbumsByUserId(userId) {
    const response = await baseAPI.get(`${this.itemKey}/?userId=${userId}`);
    return response.data.filter(album => album.userId === userId);
  }

  async deleteAlbumsByUserId(albums) {
    albums.sort((a, b) => a.id > b.id ? 1 : -1);
    let res = [];
    try {
      res = await Promise.all(
        albums.map(async (album) => {
          const response = await baseAPI.delete(`${this.itemKey}/${album.id}`);
          return response.data;
        }))
    } catch (e) {
      console.log(e);
    }
    return res;
  }
}

export default new AlbumsAPI();