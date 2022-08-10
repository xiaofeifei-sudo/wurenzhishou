import Main from '@/components/main';
// 接口文档
export const live = [
  {
    path: '/live',
    name: 'Live',
    component: Main,
    meta: {
      title: '视频监控',
      icon: 'icon iconfont iconxitongjiankong'
    },
    children: [
      {
        path: '/live/shopLive',
        name: 'shopLive',
        meta: {
          title: '门店监控'
        },
        component: () => import('@/views/shop/live/shopLive.vue')
      }
    ]
  }
];
