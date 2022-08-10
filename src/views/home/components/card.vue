<template>
  <div class="card-main">
    <div class="title flex flex-jcsb">
      <div>
        {{ title }}
        <span>{{ desc }}</span>
      </div>

      <div v-if="group">
        <Tag color="success">{{ group }}</Tag>
        <Tag color="pink">当前在线客服人员{{inline}}人</Tag>
      </div>

    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    desc: {
      type: String,
      default: '描述'
    },
    inline: {
      type: Number,
      default: 0
    },
    group: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang='less'>
.card-main {
  border-radius: 8px;
  background: #fff;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.title {
  color: #060606;
  font-size: 16px;
  padding: 20px 32px;

  span {
    padding-left: 17px;
    font-size: 12px;
    color: #dededf;
  }
}
</style>
