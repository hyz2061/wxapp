// 支付页面逻辑
Page({
  data: {
    orderNo: '',        // 订单号
    amount: 0,          // 支付金额
    createTime: '',     // 订单创建时间
    selectedMethod: 'wechat'  // 默认选择微信支付
  },

  onLoad(options) {
    // 接收从用户中心传递的订单号
    if (options.orderNo) {
      this.setData({
        orderNo: options.orderNo
      });
      // 获取订单详情（实际项目中调用真实接口）
      this.getOrderDetail(options.orderNo);
    }
  },

  // 获取订单详情
  getOrderDetail(orderNo) {
    // 模拟接口请求
    setTimeout(() => {
      // 模拟订单数据（实际从接口获取）
      this.setData({
        amount: 99.99,  // 支付金额
        createTime: '2023-08-10 14:30:25'  // 订单创建时间
      });
    }, 500);
  },

  // 选择支付方式
  selectMethod(e) {
    const method = e.currentTarget.dataset.method;
    this.setData({
      selectedMethod: method
    });
  },

  // 确认支付
  confirmPayment() {
    wx.showLoading({
      title: '处理中...',
      mask: true
    });

    // 模拟支付接口请求
    setTimeout(() => {
      wx.hideLoading();
      
      // 模拟支付结果（实际根据接口返回判断）
      const paySuccess = Math.random() > 0.3; // 70%概率支付成功
      
      // 跳转到支付结果页面
      wx.redirectTo({
        url: `/pages/paymentResult/paymentResult?success=${paySuccess}&orderNo=${this.data.orderNo}&amount=${this.data.amount}`
      });
    }, 1500);
  },

  // 返回上一页
  goBack() {
    wx.navigateBack();
  }
});
