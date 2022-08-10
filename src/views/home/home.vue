<template>
  <div>
    <Row>
      <Col>
        <HomeCard desc="The store managed by your current team" :title="'您当前所属团队管理的门店'"
                  :group="workBenchData ? workBenchData.teamName : ''"
                  :inline="workBenchData ? workBenchData.teamCount : 0">
          <ActivePlate :infoList="shopListData"/>
        </HomeCard>
      </Col>
    </Row>
    <Row :gutter="20">
      <i-col :lg="6" :md="24">
        <HomeCard desc="User from" title="用户来源">
          <ChartPie :value="pieData"/>
        </HomeCard>
      </i-col>
      <i-col :lg="18" :md="24">
        <HomeCard desc="User active" title="每周用户活跃量">
          <ChartLine :value="lineData"/>
        </HomeCard>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :lg="18" :md="24">
        <HomeCard desc="User from" title="柱状图">
          <ChartBar :value="lineData"/>
        </HomeCard>
      </i-col>
      <i-col :lg="6" :md="24">
        <HomeCard desc="complete" title="完成率">
          <ChartGauge/>
        </HomeCard>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :lg="12" :md="24">
        <HomeCard desc="progress" title="进度条">
          <HomeProgress :value="pieData"/>
        </HomeCard>
      </i-col>
      <i-col :lg="6" :md="24">
        <HomeCard desc="progress" title="目标完成度">
          <Home-circle/>
        </HomeCard>
      </i-col>
      <i-col :lg="6" :md="24">
        <HomeCard desc="progress" title="漏斗图">
          <ChartFunnel :value="pieData"/>
        </HomeCard>
      </i-col>
    </Row>

    <!--    <Modal-->
    <!--      v-model="adModal" width="800">-->
    <!--      <Ad/>-->
    <!--    </Modal>-->

  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import ActivePlate from '_c/active-plate/active-plate';
import CountTo from '_c/count-to';
import HomeCard from './components/card';
import ChartPie from './components/chart-pie';
import ChartLine from './components/chart-line';
import ChartGauge from './components/chart-gauge';
import ChartBar from './components/chart-bar';
import HomeCircle from './components/home-circle';
import HomeProgress from './components/home-progress';
import ChartFunnel from './components/chart-funnel';
import Ad from '@/components/smart-admin-ad';

export default {
  name: 'Home',
  components: {
    HomeCard,
    ActivePlate,
    CountTo,
    ChartPie,
    ChartFunnel,
    ChartLine,
    HomeCircle,
    ChartGauge,
    ChartBar,
    HomeProgress,
    Ad
  },
  props: {},
  data () {
    return {
      adModal: true,
      pieData: [
        { value: 335, name: '直接访问', color: '#3AA1FF' },
        { value: 310, name: '邮件营销', color: '#36CBCB' },
        { value: 234, name: '联盟广告', color: '#4ECB73' },
        { value: 135, name: '视频广告', color: '#F47F92' },
        { value: 1548, name: '搜索引擎', color: '#FBD437' }
      ],
      lineData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    };
  },
  computed: {
    shopListData () {
      return this.$store.state.shop.shopList;
    },
    workBenchData () {
      return this.$store.state.shop.workBench;
    }
  },
  watch: {},
  filters: {},
  created () {
  },
  mounted () {
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
  },
  destroyed () {
  },
  activated () {
  },
  methods: {}
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
