Page({
  data: {
    pet: {}, // 宠物基本信息
    healthRecords: [], // 健康记录列表
    collections: [], // 收藏商品列表
    notificationIsOpen: true, // 消息通知开关状态
  },
  onLoad() {
    // 页面加载时获取数据
    this.getPetInfo();
    this.getHealthRecords();
    this.getCollections();
  },
  // 获取宠物基本信息
  getPetInfo() {
    wx.request({
      url: 'https://your-backend-api.com/pet/info', // 替换为实际后端接口
      method: 'GET',
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            pet: res.data.data,
          });
        }
      },
    });
  },
  // 获取健康记录
  getHealthRecords() {
    wx.request({
      url: 'https://your-backend-api.com/health/records', // 替换为实际后端接口
      method: 'GET',
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            healthRecords: res.data.data,
          });
        }
      },
    });
  },
  // 添加健康记录
  addHealthRecord() {
    wx.navigateTo({
      url: '/pages/addHealthRecord/addHealthRecord', // 跳转到添加健康记录页面
    });
  },
  // 获取收藏列表
  getCollections() {
    wx.request({
      url: 'https://your-backend-api.com/collection/list', // 替换为实际后端接口
      method: 'GET',
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            collections: res.data.data,
          });
        }
      },
    });
  },
  // 删除单个收藏
  deleteCollection(e) {
    const id = e.currentTarget.dataset.id;
    wx.request({
      url: 'https://your-backend-api.com/collection/delete', // 替换为实际后端接口
      method: 'POST',
      data: { id },
      success: (res) => {
        if (res.data.code === 200) {
          wx.showToast({ title: '删除成功' });
          this.getCollections();
        }
      },
    });
  },
  // 批量删除收藏
  batchDeleteCollection() {
    // 这里简化处理，实际可选择多个收藏后调用后端批量删除接口
    wx.showModal({
      title: '提示',
      content: '确定批量删除所有收藏？',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: 'https://your-backend-api.com/collection/batchDelete', // 替换为实际后端接口
            method: 'POST',
            success: (res) => {
              if (res.data.code === 200) {
                wx.showToast({ title: '批量删除成功' });
                this.getCollections();
              }
            },
          });
        }
      },
    });
  },
  // 切换消息通知开关
  toggleNotification(e) {
    const isOpen = e.detail.value;
    wx.request({
      url: 'https://your-backend-api.com/setting/notification', // 替换为实际后端接口
      method: 'POST',
      data: { isOpen },
      success: (res) => {
        if (res.data.code === 200) {
          this.setData({
            notificationIsOpen: isOpen,
          });
        }
      },
    });
  },
});