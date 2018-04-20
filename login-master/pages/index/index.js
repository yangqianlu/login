
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '登录',
    userInfo: {},
    userName:'',
    userPassword:'',
    id_token:'',
    responseData:'',
    boo:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  userNameInput:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput:function(e){
    this.setData({
      userPassword: e.detail.value
    })
    console.log(e.detail.value)
  },
  logIn:function(){
    var that = this
    wx.request({
      url: 'http://flgzs.imwork.net/admin/ywkj.asp?action=login',
      data: {
        username: this.data.userName,
        password: this.data.userPassword,
        btnLogin:true
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          responseData:res.data.result[0].body
        });
        wx.setStorage({
            key:"responseData",
             data:that.data.responseData
        });
        try {
          wx.setStorageSync('id_token', res.data.id_token)
        } catch (e) {
          console.log('there is no id_token')
        }
      
        wx.navigateTo({
          url: "/pages/project/project"
        })
        console.log(res.data);
      },
      fail: function (res) {
        wx.showToast({
          title: '用户名或密码错误',
          duration: 2000
        })
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShow: function(){
      console.log('index is show')
  },
  shuaxin:function(){
    wx.redirectTo({
      url: '../index/index'
    })
  },
  onReady:function(){
    console.log('indx is on ready')
  },
  onHide:function(){
    console.log('index is on hide')
  },
  onUnload:function(){
    console.log('indx is on unload')
  },
  boo:function(){
    this.setData({
      boo:!this.data.boo
    });
  }
  

})