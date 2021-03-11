import { RestService } from './service';
import { baseAPI } from "./http-common";

class PhotosAPI extends RestService {
  itemKey = 'photos';


  async deletePhotosByAlbumId(photos) {
    //  photos.sort((a, b) => a.id > b.id ? 1 : -1);

    let res = [];
    try {
      res = await Promise.all(
        photos.map(async (photo) => {
          const response = await baseAPI.delete(`${this.itemKey}/${photo.id}`);
          return response.data;
        }))
    } catch (e) {
      console.log(e);
    }
    return res;
  }
}

export default new PhotosAPI();