const baseUrl = "http://localhost:3000"

const http = {
  // GET请求
  get(url, header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: "GET",
        header: {
          'content-type': 'application/json',
          ...header
        },
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败, 状态码: ${res.statusCode}`));
          }
        },
        fail: error => {
          console.error('请求失败:', error);
          reject(error);
        }
      });
    });
  },

  // POST请求
  post(url, data = {}, header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: "POST",
        data: data,
        header: {
          'content-type': 'application/json',
          ...header
        },
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败, 状态码: ${res.statusCode}`));
          }
        },
        fail: error => {
          console.error('请求失败:', error);
          reject(error);
        }
      });
    });
  },

  // PATCH请求
  patch(url, data = {}, header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: "PATCH",
        data: data,
        header: {
          'content-type': 'application/json',
          ...header
        },
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败, 状态码: ${res.statusCode}`));
          }
        },
        fail: error => {
          console.error('请求失败:', error);
          reject(error);
        }
      });
    });
  },

  // DELETE请求
  delete(url, header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: baseUrl + url,
        method: "DELETE",
        header: {
          'content-type': 'application/json',
          ...header
        },
        success: res => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败, 状态码: ${res.statusCode}`));
          }
        },
        fail: error => {
          console.error('请求失败:', error);
          reject(error);
        }
      });
    });
  },
};

export default http;
