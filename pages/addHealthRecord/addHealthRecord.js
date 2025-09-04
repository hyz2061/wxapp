Page({
  data: {
    types: ['体检', '疫苗', '生病'], // 记录类型选项
    index: 0, // 默认选中第一个类型
    time: '' // 选中的日期
  },

  onLoad() {
    // 初始化默认时间为当前日期
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，补0
    const day = today.getDate().toString().padStart(2, '0');
    this.setData({
      time: `${year}-${month}-${day}`
    });
  },

  // 类型选择器变化时触发
  bindTypeChange(e) {
    this.setData({
      index: e.detail.value
    });
  },

  // 日期选择器变化时触发
  bindDateChange(e) {
    this.setData({
      time: e.detail.value
    });
  },

  // 表单提交
  formSubmit(e) {
    const { type, time } = e.detail.value; // 获取表单数据
    // 调用后端接口保存记录（替换为实际接口地址）
    wx.request({
      url: 'https://your-backend-api.com/health/add',
      method: 'POST',
      data: {
        type: type, // 记录类型（体检/疫苗/生病）
        time: time, // 记录日期
        petId: 1 // 宠物ID（实际应从上个页面传递过来）
      },
      success: (res) => {
        if (res.data.code === 200) {
          wx.showToast({ title: '记录添加成功' });
          // 返回上一页（宠物档案页）
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        } else {
          wx.showToast({ title: '添加失败', icon: 'none' });
        }
      },
      fail: () => {
        wx.showToast({ title: '网络错误', icon: 'none' });
      }
    });
  }
});