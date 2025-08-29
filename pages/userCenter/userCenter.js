Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1, // 当前选中的标签索引
    orders: [], // 订单列表数据
    loading: false, // 加载状态
    userName: '', // 微信用户名
    showDeleteModal: false, // 删除弹窗显示状态
    currentOrderNo: '' // 当前要删除的订单号
  },
  apiRequest(url, method = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
      // 从本地缓存获取token
      const token = wx.getStorageSync('token');
      
      wx.request({
        url: 'http://localhost:3000/api/orders', 
        method: method,
        data: data,
        header: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败: ${res.statusCode}`));
          }
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 页面加载时获取微信用户信息
    this.getUserInfo();
    // 获取全部订单
    this.getOrdersByType(0);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // 页面显示时刷新用户信息（防止未登录状态切换）
    this.getUserInfo();
  },

  /**
   * 获取微信用户信息
   */
  getUserInfo() {
    const that = this;
    // 调用微信登录接口获取用户信息
    wx.getUserProfile({
      desc: '用于展示用户信息', // 声明获取用户信息的用途
      success(res) {
        // 保存用户名到数据中
        that.setData({
          userName: res.userInfo.nickName
        });
        // 可将用户信息存入本地缓存
        wx.setStorageSync('userInfo', res.userInfo);
      },
      fail() {
        // 若用户未授权，显示"点击登录"
        that.setData({
          userName: ''
        });
      }
    });
  },

  /**
   * 跳转到用户详情页
   */
  goToUserDetail() {
    // 若未登录，先触发登录
    if (!this.data.userName) {
      this.getUserInfo();
      return;
    }
    // 跳转至用户详情页（需提前创建该页面）
    wx.navigateTo({
      url: '/pages/userDetail/userDetail'
    });
  },

  /**
   * 切换标签（保持不变）
   */
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.currentTab !== index) {
      this.setData({
        currentTab: index
      });
      this.getOrdersByType(index);
    }
  },

  /**
   * 根据类型获取订单列表（保持不变）
   */
  getOrdersByType(type) {
    this.setData({ loading: true });

    let url = '';
    switch (type) {
      case 0:
        url = '/api/orders';
        break;
      case 1:
        url = '/api/products';
        break;
      case 2:
        url = '/api/orders/completed';
        break;
    }

    this.apiRequest(url).then(res => {
      this.setData({
        orders: res.data,
        loading: false
      });
    }).catch(err => {
      console.error('获取订单失败:', err);
      this.setData({
        loading: false,
        orders: []
      });
      wx.showToast({
        title: '获取订单失败',
        icon: 'none'
      });
    });
  },

  /**
   * 模拟接口请求（保持不变）
   */
 

  /**
   * 跳转到支付页面（保持不变）
   */
  goToPayment(e) {
    const orderNo = e.currentTarget.dataset.orderNo;
    wx.navigateTo({
      url: `/pages/payment/payment?orderNo=${orderNo}`
    });
  },

  /**
   * 显示删除确认弹窗（调整逻辑）
   */
  showDeleteConfirm(e) {
    const orderNo = e.currentTarget.dataset.orderNo;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这条订单吗？',
      success: (res) => {
        if (res.confirm) {
          console.log('用户确认删除，订单号：', orderNo);
          this.deleteOrder(orderNo);
        } else if (res.cancel) {
          console.log('用户取消删除');
        }
      }
    });
  },

  /**
   * 执行删除订单操作
   */
  deleteOrder(orderNo) {
    this.setData({ loading: true });
    // 调用模拟删除接口
    this.mockDeleteApi(orderNo)
      .then(() => {
        // 接口删除成功后，更新本地订单列表（过滤掉已删除的订单）
        const newOrders = this.data.orders.filter(item => item.orderNo !== orderNo);
        this.setData({
          orders: newOrders,
          loading: false
        });
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        });
      })
      .catch(() => {
        // 接口删除失败
        this.setData({ loading: false });
        wx.showToast({
          title: '删除失败',
          icon: 'none',
          duration: 2000
        });
      });
  },

  /**
   * 模拟删除接口
   */
  mockDeleteApi(orderNo) {
    return new Promise((resolve, reject) => {
      // 模拟接口延迟（0.5秒）
      setTimeout(() => {
        // 模拟删除成功（实际项目中替换为真实接口调用）
        resolve({ code: 0 });
        // 若需模拟失败，可使用：reject(new Error('删除失败'));
      }, 500);
    });
  }
});