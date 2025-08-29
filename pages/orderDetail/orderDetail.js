// pages/orderDetail/orderDetail.js
Page({
  data: {
    orderNo: '', // 订单号（从上个页面传递）
    loading: true, // 加载状态
    // 订单详情数据
    orderStatus: '', // 订单状态：unpaid/shipped/completed
    orderStatusText: '', // 状态文本
    statusStyle: '', // 状态样式类
    payExpireTime: '', // 支付过期时间
    logisticsNo: '', // 物流单号
    createTime: '', // 创建时间
    payMethod: '', // 支付方式
    goodsList: [], // 商品列表
    recipientName: '', // 收货人
    recipientPhone: '', // 电话
    recipientAddress: '', // 地址
    goodsTotal: 0, // 商品总价
    freight: 0, // 运费
    payAmount: 0 // 实付金额
  },

  onLoad(options) {
    // 获取上个页面传递的订单号
    this.setData({ orderNo: options.orderNo });
    // 加载订单详情
    this.getOrderDetail();
  },

  /**
   * 获取订单详情接口
   */
  getOrderDetail() {
    this.setData({ loading: true });
    const { orderNo } = this.data;

    // 调用接口获取订单详情（实际项目替换为真实接口）
    wx.request({
      url: `/api/orders/${orderNo}/detail`,
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + wx.getStorageSync('token')
      },
      success: (res) => {
        if (res.data.code === 0) {
          const order = res.data.data;
          // 格式化订单状态
          const statusMap = {
            'unpaid': { text: '待支付', style: 'status-unpaid' },
            'shipped': { text: '已发货', style: 'status-shipped' },
            'completed': { text: '已完成', style: 'status-completed' }
          };
          // 更新数据
          this.setData({
            orderStatus: order.status,
            orderStatusText: statusMap[order.status].text,
            statusStyle: statusMap[order.status].style,
            payExpireTime: order.payExpireTime || '',
            logisticsNo: order.logisticsNo || '',
            createTime: order.createTime,
            payMethod: order.payMethod,
            goodsList: order.goodsList,
            recipientName: order.recipientName,
            recipientPhone: order.recipientPhone,
            recipientAddress: order.recipientAddress,
            goodsTotal: order.goodsTotal,
            freight: order.freight,
            payAmount: order.payAmount,
            loading: false
          });
        } else {
          wx.showToast({ title: res.data.msg || '获取订单失败', icon: 'none' });
          this.setData({ loading: false });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络错误', icon: 'none' });
        this.setData({ loading: false });
      }
    });
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack();
  },

  /**
   * 去支付
   */
  goToPayment() {
    wx.navigateTo({
      url: `/pages/payment/payment?orderNo=${this.data.orderNo}`
    });
  },

  /**
   * 取消订单
   */
  cancelOrder() {
    wx.showModal({
      title: '确认取消',
      content: '确定要取消订单吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ loading: true });
          // 调用取消订单接口
          wx.request({
            url: `/api/orders/${this.data.orderNo}/cancel`,
            method: 'POST',
            header: {
              'Authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            success: (res) => {
              if (res.data.code === 0) {
                wx.showToast({ title: '取消成功', icon: 'success' });
                // 返回上一页并刷新列表
                setTimeout(() => {
                  wx.navigateBack();
                }, 1500);
              } else {
                wx.showToast({ title: res.data.msg || '取消失败', icon: 'none' });
                this.setData({ loading: false });
              }
            },
            fail: () => {
              wx.showToast({ title: '网络错误', icon: 'none' });
              this.setData({ loading: false });
            }
          });
        }
      }
    });
  },

  /**
   * 确认收货
   */
  confirmReceipt() {
    wx.showModal({
      title: '确认收货',
      content: '请确认已收到商品',
      success: (res) => {
        if (res.confirm) {
          this.setData({ loading: true });
          // 调用确认收货接口
          wx.request({
            url: `/api/orders/${this.data.orderNo}/confirm`,
            method: 'POST',
            header: {
              'Authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            success: (res) => {
              if (res.data.code === 0) {
                wx.showToast({ title: '确认成功', icon: 'success' });
                // 刷新订单详情
                this.getOrderDetail();
              } else {
                wx.showToast({ title: res.data.msg || '确认失败', icon: 'none' });
                this.setData({ loading: false });
              }
            },
            fail: () => {
              wx.showToast({ title: '网络错误', icon: 'none' });
              this.setData({ loading: false });
            }
          });
        }
      }
    });
  },

  /**
   * 查看物流
   */
  viewLogistics() {
    wx.navigateTo({
      url: `/pages/logistics/logistics?logisticsNo=${this.data.logisticsNo}`
    });
  },

  /**
   * 删除订单
   */
  deleteOrder() {
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该订单吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ loading: true });
          // 调用删除订单接口
          wx.request({
            url: `/api/orders/${this.data.orderNo}`,
            method: 'DELETE',
            header: {
              'Authorization': 'Bearer ' + wx.getStorageSync('token')
            },
            success: (res) => {
              if (res.data.code === 0) {
                wx.showToast({ title: '删除成功', icon: 'success' });
                // 返回订单列表页
                setTimeout(() => {
                  wx.navigateBack({ delta: 1 });
                }, 1500);
              } else {
                wx.showToast({ title: res.data.msg || '删除失败', icon: 'none' });
                this.setData({ loading: false });
              }
            },
            fail: () => {
              wx.showToast({ title: '网络错误', icon: 'none' });
              this.setData({ loading: false });
            }
          });
        }
      }
    });
  }
});