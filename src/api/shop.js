import { postAxios, getAxios } from '@/lib/http';

export const shopApi = {
  // 获取工作台内容
  getWorkBench: data => {
    return getAxios('?app=customer&act=customerWorkbench', data);
  },

  // 获取门店设备列表
  getDeviceList: data => {
    return getAxios('?app=equipment&act=shopEquipmentList', data);
  },

  // 获取AccessToken
  getAccessToken: data => {
    return getAxios('?app=customer&act=getHkToken', data);
  },
  // 获取H5实时预览
  getH5PlayLive: data => {
    return getAxios('?app=store_shop&act=equipmentVideoPreview', data);
  },
  // 获取断链设备
  getLostConn: data => {
    return getAxios('?app=equipment&act=deviceCameraList', data);
  }
};
