import Main from '@/components/main';

// import { peony } from './peony';
// import { emailSetting } from './email';
// import { keepAlive } from './keep-alive';
// import { notice } from './notice';
// import { threeRouter } from './three-router';
import { live } from './shop';

// 业务
export const shop = [
  {
    path: '/shop',
    name: 'Shop',
    component: Main,
    meta: {
      title: '门店管理',
      topMenu: true,
      icon: 'icon iconfont iconxitongjiankong'
    },
    children: [
      // ...peony,
      // ...emailSetting,
      // ...keepAlive,
      // ...notice,
      // ...threeRouter
      ...live
    ]
  }
];
