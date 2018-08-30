// pages/newlishi/index.js
var api=require("../../api/api.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: [],
    array:[
      [
        {
          id: 0,
          name: '语文'
        },
        {
          id: 2,
          name: '数学'
        },
        {
          id: 3,
          name: '英语'
        },
        {
          id: 4,
          name: '物理'
        },
        {
          id: 5,
          name: '化学'
        },
        {
          id: 6,
          name: '政治'
        },
        {
          id: 7,
          name: '历史'
        },
        {
          id: 8,
          name: '地理'
        }
      ], [
        {
          id: 0,
          name: '小学'
        },
        {
          id: 1,
          name: '初中'
        },
        {
          id: 2,
          name: '高中'
        },
        {
          id: 3,
          name: '考研'
        }
      ],[
        {
          id: 0,
          name: '书童'
        },
        {
          id: 1,
          name: '童生'
        },
        {
          id: 2,
          name: '秀才'
        },
        {
          id: 3,
          name: '案首'
        },
        {
          id: 4,
          name: '举人'
        },
        {
          id: 5,
          name: '解元'
        },
        {
          id: 6,
          name: '亚元'
        },
        {
          id: 7,
          name: '贡生'
        },
        {
          id: 8,
          name: '经元'
        },
        {
          id: 9,
          name: '会元'
        },
        {
          id: 10,
          name: '同进士出身'
        },
        {
          id: 11,
          name: '进士出身'
        },
        {
          id: 12,
          name: '探花'
        },
        {
          id: 13,
          name: '榜眼'
        },
        {
          id: 14,
          name: '状元'
        },
        {
          id: 15,
          name: '连中三元'
        },
        {
          id: 16,
          name: '翰林供奉'
        },
        {
          id: 17,
          name: '翰林学士'
        }
      ]
    ],
    multiIndex2: [0, 0, 0],
  },
  lower() {
    var currentPage = this.data.currentPage;
    var totalPage = this.data.totalPage;
    if (parseInt(currentPage) + 1 <= totalPage) {
      wx.showLoading({
        title: '正在加载...',
      })
      var that = this;
      wx.request({
        url: api.getLianList(),
        data: { type: "selectAll", page: parseInt(currentPage) + 1, limit: 10 },
        success: function (data) {
          var oldList = that.data.res;
          var newList = data.data.list;
          var finalList = oldList.concat(newList);
          that.setData({
            res: finalList,
            totalPage: data.data.page.totalPage,
            currentPage: data.data.page.currentPage,
          });
          setTimeout(function () {
            wx.hideLoading();
          }, 1000);
        }
      })
    } else {
      wx.showToast({
        title: '已经到底了',
        icon: '',
        duration: 1000
      })
    }
  },
  bindPickerChange: function (e) {
    wx.showToast({
      title: '确定了',
      icon: '',
      duration: 1000
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var allKeMu = wx.getStorageSync("allKeMu");
    console.log(allKeMu);
    for(var i=0; i<allKeMu.length; i++){
      var kemu = allKeMu[i].lessionname;
      console.log(kemu);
      var arrnianji = allKeMu[i].children;
      for(var e=0;e<arrnianji.length; e++){
        var nianji = arrnianji[e].lessionname;
        console.log(nianji);
      }      
    }
    console.log(this.data.array);
    var that=this;
    var userOpen=wx.getStorageSync("userOpen");
    wx.request({
      url: api.getLianList(),
      data: { openid: userOpen.openid},
      success:function(data){
        var arr=data.data;
        for(var i=0; i<arr.length;i++){
          var oddmath=arr[i].math;
          var newmath = (oddmath*100.00).toFixed(2)+"%";
          arr[i].math=newmath;
        }
        that.setData({     
          res: data.data,
        });
       // console.log(data);
      }
    });
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})