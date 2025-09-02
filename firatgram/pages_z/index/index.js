Page({
  data: {
    swiperImages: [
      '/images/activity-image1.png',
      '/images/activity-image2.png'
    ],
    swiperImages2: [
      '/images/activity-image3.png',
      '/images/activity-image4.png'
    ]
  },
  onSearchInput(e) {
    console.log('搜索内容：', e.detail.value);
  },
  goProfile() {
    wx.navigateTo({
      url: '/pages/my/my'
    });
  }
});
