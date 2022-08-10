<template>
  <div>
    <Card class="warp-card" dis-hover>
      <Row>
        <Col span="6" v-for="(item,index) in channelNum" :key="index" ref="videoContainer">
          <div :id="'video-container_'+index" class="video-container"></div>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import config from '@/config';
import EZUIKit from 'ezuikit-js';
import { shopApi } from '@/api/shop.js';
import { getParams } from '@/lib/util.js';

const baseUrl = config.baseUrl.apiUrl;
export default {
  name: 'SendMail',
  components: {},
  props: {},
  data () {
    let baseUrl = process.env.VUE_APP_URL;
    return {
      channelNum: 0,
      deviceList: [],
      accessToken: '',// accessToken
      status: 0,// 0 加载中 1 加载完成 2设备为空
      liveUrl: '',// 预览地址
      playBackUrl: '',// 回访地址
      shopId: null,
      playerList: [],
      playType: 1,
    };
  },
  computed: {},
  watch: {
    $route () {
      console.log('监控页面路由更新了');
      this.initLive();
    },
    status: {
      immediate: true,
      handler (newVal, oldVal) {
        switch (newVal) {
          case 0:
            // this.$Spin.show();
            break;
        }
      }
    }
  },
  filters: {},
  created () {
  },
  mounted () {
    this.initLive();
  },
  beforeCreate () {
  },
  beforeMount () {
  },
  beforeUpdate () {

  },
  updated () {
  },
  beforeDestroy () {
    let that = this;
    that.destoryPlayer();
  },
  destroyed () {
  },
  activated () {
  },
  methods: {
    destoryPlayer () {
      let that = this;
      that.playerList.forEach((item) => {
        item.stop();
      });
      that.playerList = [];
    },
    // 后退
    goBack () {
      this.$router.closeCurrentPage();
    },
    async initLive () {
      this.shopId = this.$route.query.shopId;
      await this.getDeviceList();
      // await this.getAccessToken();

      await this.getLiveUrl();
      this.initVideoContainer();
    },
    async getAccessToken () {
      let that = this;
      return new Promise((resolve) => {
        shopApi.getAccessToken().then((res) => {
          if (res.status == 0) {
            that.accessToken = res.data;
            console.log('accessToken为', res.data);
            resolve(true);
          } else {
            that.$Message.error('海康服务器维护中，请稍后再试！');
          }
        });
      });
    },
    async getLiveUrl () {
      let that = this;
      return new Promise((resolve) => {
        shopApi.getH5PlayLive({
          deviceSerial: that.deviceList[0].deviceid,
          audio: 1,
          autoPlay: 0,
          toolBar: 1,
          videoLevel: 1,
          recordType: 1,
          channelNo: 0,
          deviceid: that.deviceList[0].deviceid
        }).then((res) => {
          // console.log('预览url', res.data.previewUrl);
          if (res.status == 0) {
            let paramsObj = getParams(res.data.previewUrl);
            if (paramsObj.accessToken) {
              that.accessToken = paramsObj.accessToken;
              resolve(true);
            } else {
              that.$Message.error('获取萤石云AccessToken失败，请重试');
            }
          } else {
            that.$Message.error(res.msg);
          }
        });
      });
    },

    async getDeviceList () {
      let that = this;
      return new Promise((resolve) => {
        shopApi.getDeviceList({
          type: 'Video',
          shop_id: that.shopId
        }).then((res) => {
          console.log(res, '设备列表');
          if (res.status == 0) {
            that.deviceList = res.data;
            if (res.data.length > 0) {
              that.channelNum = res.data[0].passageway;
            } else {
              that.$Message.error('当前门店暂无监控设备!');
            }
          } else {
            that.$Message.error(res.msg);
          }

          resolve(true);
        });
      });
    },
    initVideoContainer () {
      console.log('初始化videoContainer');
      let videoContainerWidth = 0;
      let that = this;
      // this.$nextTick(() => {
      // console.log(this.$refs.videoContainer[0].$el.clientWidth);
      videoContainerWidth = Number(this.$refs.videoContainer[0].$el.clientWidth) - 20;
      // });
      for (let i = 0; i < this.channelNum; i++) {
        // if (that.playerList.length > 0) {
        // eslint-disable-next-line valid-typeof
        console.log(typeof (that.playerList[i]));
        if (typeof (that.playerList[i]) == 'undefined') {
          that.playerList.push(new EZUIKit.EZUIKitPlayer({
            id: 'video-container_' + i, // 视频容器ID
            accessToken: that.accessToken,
            url: `ezopen://open.ys7.com/${that.deviceList[0].deviceid}/${i + 1}.live`,
            template: 'pcLive',
            plugin: ['talk'],
            width: videoContainerWidth,
            height: 280
          }));
        } else {
          let options = {
            type: 'live',
            accessToken: that.accessToken,
            channelNo: i + 1,
            hd: false,
            validCode: that.deviceList[0].veri_code,
            deviceSerial: that.deviceList[0].deviceid
          };
          that.playerList[i].changePlayUrl(options);
        }
        // }

      }
    }
  }
}
;
</script>
<style lang="less" scoped>
@import './shopLive.less';

.addressWidth {
  width: 350px;
}

.marginTop20 {
  margin-top: 20px;
}

.marginBottom20 {
  margin-bottom: 20px;
}
</style>
