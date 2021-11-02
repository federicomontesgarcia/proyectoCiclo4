const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://nodpapaya.herokuapp.com'
});

class Client {
  static async retrieveAll(services) {
    try {
      return await axiosInstance.get('/api/v1/general/' + services);
    } catch (e) {
      console.log(e);
    }
  }

  static async retrieveOne(services, id, withComments) {
    try {
      if (withComments) {
        return await axiosInstance.get('/api/v1/general/' + services + '/' + id + '?withComments=yes');
      } else {
        return await axiosInstance.get('/api/v1/general/' + services + '/' + id);
      }
    } catch (e) {
      console.log(e);
    }
  }

  static async deleteOne(services, data) {
    try {
      return await axiosInstance.delete('/api/v1/general/' + services + '/' + data._id);
    } catch (e) {
      console.log(e);
    }
  }

  static async saveOne(services, data) {
    try {
      return await axiosInstance.post('/api/v1/general/' + services, data);
    } catch (e) {
      throw e;
    }
  }

  static async editOne(services, data) {
    try {
      return await axiosInstance.patch('/api/v1/general/' + services, data);
    } catch (e) {
      throw e;
    }
  }

  static async getUser(email, password) {
    try {
      return await axiosInstance.post('/api/v1/auth/', {
        email: email,
        password: password
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async saveComment(idPlace, comment, user) {
    try {
      delete user.token;
      return await axiosInstance.post('/api/v1/comments', {
        idPlace,
        comment,
        user
      });
    } catch (e) {
      console.log(e);
    }
  }
  static async getComments(idPlace) {
    try {
      return await axiosInstance.get('/api/v1/comments/' + idPlace);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Client;