<template>
  <div class="active-plate-main">
    <Row type="flex" :gutter="20">
      <Col class="plate-box flex flex-center" span="4" v-for="(item,index) in infoList" :key="index">
        <div class="plate-item flex flex-col ">
          <div class="flex">
            <div>
              <img :src="item.shop_portrait" class="plate-item-img">
            </div>
            <div class="flex flex-col">
              <span class="font-weight">{{ item.store_name || '门店名称' }}</span>
              <span class="flex flex-row m-t-5" v-if="item.trusteeship == '1'">
                    <img :src="trusteeshiping" class="routeRight_ani"
                         style="width: 20px;height: 20px;margin-right: 10px;">
                    <span style="color: #1afa29">托管中</span>
                  </span>
              <span class="flex flex-row m-t-5" v-else>
                    <img :src="notrusteeship" class="routeLeft_ani" style="width: 20px;height: 20px;margin-right: 10px">
                    <span style="color: #d81e06">未托管</span>
                  </span>
            </div>
          </div>

          <div style="font-size: 14px;letter-spacing:2px;" class="m-t-5">
            当前<span style="color: #1afa29;">{{ item.user_number }}</span>人进入，
            {{ item.service_name ? `${item.service_name}服务中` : `暂无客服服务` }}
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import CountTo from '_c/count-to';
import notrusteeship from '@/assets/images/icons/notrusteeship.png';
import trusteeshiping from '@/assets/images/icons/trusteeshiping.png';

export default {
  name: 'activePlate',
  data () {
    return {
      notrusteeship,
      trusteeshiping
    };
  },
  components: {
    CountTo
  },
  props: {
    // 需要展示的数据集合
    infoList: {
      type: Array,
      require: true
    }
  }
};
</script>

<style lang="less">
.active-plate-main {
  width: 100%;

  .active-list {
    display: flex;
    list-style: none;
    padding-top: 15px;
  }
}

.plate-box {
  padding: 0 20px;
}

.plate-item {
  width: 100%;
  margin: 10px 10px;
  padding: 8px;
  border-radius: 10px;
  border: 2px solid #07C160;
  overflow: hidden;

  &-img {
    margin-right: 10px;
    width: 60px;
    height: 60px;
    border-radius: 5px;
  }
}
</style>
