
import Main from '@/components/main';

import { employee } from './employee';
import { order } from './file';
import { userLog } from './user-log';
import { systemSetting } from './system-setting';

// 业务
export const order = [
  {
    path: '/system',
    name: 'System',
    component: Main,
    meta: {
      title: '系统设置',
      topMenu: true,
      icon: 'icon iconfont iconxitongshezhi'
    },
    children: [
      ...employee,
      ...order,
      ...userLog,
      ...systemSetting
    ]
  }
];
