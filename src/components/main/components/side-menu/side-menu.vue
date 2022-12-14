<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      :accordion="accordion"
      :active-name="activeName"
      :open-names="openedNames"
      :theme="theme"
      @on-select="handleSelect"
      ref="menu"
      v-show="!collapsed"
      width="auto"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item :key="`menu-${item.name}`" :parent-item="item.children[0]"
                          v-if="item.children[0].children && item.children[0].children.length > 0 "></side-menu-item>
          <menu-item
            :key="`menu-${item.children[0].name}`"
            :name="getNameOrHref(item, true)"
            v-else
          >
            <common-icon :type="item.children[0].icon || ''"/>
            <span>{{ showTitle(item.children[0]) }} </span>
          </menu-item>
        </template>
        <template v-else>
          <side-menu-item :key="`menu-${item.name}`" :parent-item="item"
                          v-if="item.children && item.children.length > 0"></side-menu-item>
          <menu-item :key="`menu-${item.name}`" :name="getNameOrHref(item)" v-else>
            <common-icon :type="item.icon || ''"/>
            <span>{{ showTitle(item) }} </span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-if="showShop && !collapsed">
      <div v-for="(item,index) in shopList" :key="index">
        <div class="shop-item flex " @click="handleSeleShop(item)">
          <div class="flex flex-row">
            <div v-if="noConnList.includes(item.id)">
                          <span>
                            <img :src="noconnect" style="width: 20px;height: 20px" class="m-r-5">
                          </span>
              <span class="shop-item-name" style="color: #d81e06;">
 {{ item.store_name }}
          </span>
            </div>
            <div class="flex flex-ver" v-else>
                            <span>
                                      <img :src="connected" style="width: 20px;height: 20px" class="m-r-5">
                                    </span>
              <span class="shop-item-name" style="color: #1afa29">
                            {{ item.store_name }}
                          </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :list="menuList" class="menu-collapsed" v-show="collapsed">
      <template v-for="item in menuList">
        <CollapsedMenu
          :icon-size="iconSize"
          :key="`drop-menu-${item.name}`"
          :parent-item="item"
          :root-icon-size="rootIconSize"
          :theme="theme"
          @on-click="handleSelect"
          hide-title
          v-if="item.children && item.children.length > 1"
        ></CollapsedMenu>
        <Tooltip
          :content="showTitle(item.children && item.children[0] ? item.children[0] : item)"
          :key="`drop-menu-${item.name}`"
          placement="right"
          transfer
          v-else
        >
          <a
            :style="{textAlign: 'center'}"
            @click="handleSelect(getNameOrHref(item, true))"
            class="drop-menu-a"
          >
            <CommonIcon
              :color="textColor"
              :size="rootIconSize"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue';
import CollapsedMenu from './collapsed-menu.vue';
import { getUnion } from '@/lib/util';
import mixin from './mixin';
import noconnect from '@/assets/images/icons/no-conn.png';
import connected from '@/assets/images/icons/connected.png';

export default {
  name: 'SideMenu',
  mixins: [mixin],
  components: {
    SideMenuItem,
    CollapsedMenu
  },
  props: {
    // ??????path??????
    menuNameMatchedMap: {
      type: Map,
      default () {
        return new Map();
      }
    },
    // ????????????
    menuList: {
      type: Array,
      default () {
        return [];
      }
    },
    //????????????
    shopList: {
      type: Array,
      default () {
        return [];
      }
    },
    //????????????
    showShop: {
      type: Boolean,
      default: false
    },
    // ???????????? ?????????????????????????????????
    collapsed: {
      type: Boolean
    },
    // ??????
    theme: {
      type: String,
      default: 'dark'
    },
    // ???????????????
    rootIconSize: {
      type: Number,
      default: 16
    },
    // ????????????
    iconSize: {
      type: Number,
      default: 16
    },
    // ????????????????????????????????????????????????????????????????????????
    accordion: {
      type: Boolean,
      require: false
    },
    // ??????????????? name ???
    activeName: {
      type: String,
      default: ''
    },
    // ????????? Submenu ??? name ??????
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      connected,
      noconnect,
      openedNames: []
    };
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060';
    },
    noConnList () {
      return this.$store.state.shop.disconnectShop;
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) {
        this.openedNames = this.getOpenedNamesByActiveName(name);
      } else {
        this.openedNames = getUnion(
          this.openedNames,
          this.getOpenedNamesByActiveName(name)
        );
      }
    },
    openNames (newNames) {
      this.openedNames = newNames;
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    }
  },
  mounted () {
    this.openedNames = getUnion(
      this.openedNames,
      this.getOpenedNamesByActiveName(name)
    );
  },
  methods: {
    handleSeleShop (item) {
      this.$emit('select-shop', item);
    },
    updateActiveName (name) {
      this.updateOpenName(name);
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName(name);
      });
    },
    handleSelect (name) {
      this.$emit('on-select', name);
    },
    // ????????????????????????????????????????????????
    getOpenedNamesByActiveName (name) {
      let array = this.menuNameMatchedMap.get(name);
      if (array) {
        return array;
      } else {
        return [];
      }
    },
    updateOpenName (name) {
      this.openedNames = this.menuNameMatchedMap.get(name);
    }
  }
};
</script>
<style lang="less">
@import './side-menu.less';
</style>
