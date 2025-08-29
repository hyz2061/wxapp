// 支付结果页面逻辑
Page({
  data: {
    success: false,    // 支付是否成功
    orderNo: '',       // 订单号
    amount: 0,         // 支付金额
    payTime: ''        // 支付时间
  },

  onLoad(options) {
    // 接收支付结果参数
    this.setData({
      success: options.success === 'true',
      orderNo: options.orderNo,
      amount: parseFloat(options.amount)
    });

    // 如果支付成功，记录支付时间
    if (this.data.success) {
      const now = new Date();
      const payTime = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
      this.setData({ payTime });
      
      // 实际项目中，这里应该调用接口更新订单状态
    }
  },

  // 返回订单列表
  goBack() {
    wx.redirectTo({
      url: '/pages/userCenter/userCenter'
    });
  },

  // 查看订单详情或重新支付
  goToDetail() {
    if (this.data.success) {
      // 支付成功，跳转到订单详情
      wx.navigateTo({
        url: `/pages/orderDetail/orderDetail?orderNo=${this.data.orderNo}`
      });
    } else {
      // 支付失败，返回支付页面重新支付
      wx.redirectTo({
        url: `/pages/payment/payment?orderNo=${this.data.orderNo}`
      });
    }
  }
});
