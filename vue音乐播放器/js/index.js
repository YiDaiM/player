/*
*  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3:歌曲详情获取
    请求地址：https://autumnfish.cn/song/detail
    请求方法：get
    请求参数：ids(歌曲id）
    响应内容：歌曲详情，包含封面信息
   4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

const app = new Vue({
  el: "#player",
  data: {
    //歌曲名字
    query: "",
    //歌曲列表
    musicList: [],
    //歌曲地址
    musicUrl: "",
    // 歌曲封面
    imgUrl: "",
    // 热门评论
    hotComments: [],
    // 动画播放状态
    isPlaying: false,
  },
  methods: {
    searchMusic() {
      var that = this;
      axios.get("https://autumnfish.cn/search?keywords=" + this.query).then(function (response){
        // console.log(response.data.result.songs);
        that.musicList = response.data.result.songs
      },function (err){
        console.log(err);
      })
    },
    playMusic(musicId) {
      var that = this;
      axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function (response){
        // console.log(response.data.data[0].url);
        that.musicUrl = response.data.data[0].url;
      },function (err){})
      axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(function (response){
        // console.log(response.data.songs[0].al.picUrl);
        that.imgUrl = response.data.songs[0].al.picUrl
      },function (err){
        console.log(err);
      })
      axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(function (response){
        // console.log(response.data.hotComments);
        that.hotComments = response.data.hotComments;
      },function (err){
        console.log(err);
      })

    },
    play() {
      this.isPlaying = true;
    },
    pause() {
      this.isPlaying = false;
    }
  }
})