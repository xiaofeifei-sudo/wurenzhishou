import Axios from 'axios';
import config from '@/config';
import Md52 from './md52.js';
import qs from 'qs'; // 序列化请求参数 形式  a&&b
import { Message, Spin } from 'view-design';
import cookie from '@/lib/cookie';
// 之所以封装这个axios，是因为在一些请求中，无法上传信息，很尴尬，估计原因是继承的有问题，无法携带headers
export const baseUrl = config.baseUrl.apiUrl;
export const socketBaseUrl = config.baseUrl.webSocketUrl;

let axios = Axios.create({
  baseURL: baseUrl,
  // 超时30秒的时间
  timeout: 30000,
  headers: {
    // 'Content-Type': 'application/json; charset=utf-8' 久版本未修改前
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
});
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';

axios.interceptors.request.use(
  function (configuration) {
    // 在发送请求之前做些什么 //未配置前
    // if (cookie.getToken()) {
    //   config.headers['x-access-token'] = cookie.getToken();
    // }

    // if (config.url.indexOf('/newapi/index.php') !== -1) {
    configuration.headers['storeid'] = config.tenantId;
    // }

    return configuration;
  },
  function (error) {
    // 对请求错误做些什么
    Spin.hide();
    console.log('发送请求出现错误了', error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.config.responseType === 'blob') {
      let isReturnJson = res.headers && res.headers['content-type'] && res.headers['content-type'].indexOf('json') > -1;
      // 后端返回错误信息
      if (isReturnJson) {
        let reader = new FileReader();
        reader.onload = function (event) {
          let content = reader.result;
          let parseRes = JSON.parse(content); // 错误信息
          return validateResponseCode({
            data: parseRes
          });
        };
        reader.readAsText(res.data);
        return true;
      } else {
        // 下载文件
        download(res);
      }
    } else {
      // 正常json请求
      return validateResponseCode(res);
    }
  },
  error => {
    Spin.hide();
    Message.error('服务内部错误');
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

function validateResponseCode (res) {
  let { data } = res;
  // if (data && data.code && data.code !== 1) {
  //   if (data.code === 1001) {
  //     cookie.clearToken();
  //     localStorage.clear();
  //     window.location.href = window.location.pathname + '#/login';
  //     Message.error('未登录，或登录失效，请登录');
  //     return;
  //   } else if (data.code === 502) {
  //     window.location.href = window.location.pathname + '#/500';
  //     return;
  //   } else {
  //     Spin.hide();
  //     Message.error(data.msg);
  //     return Promise.reject(res);
  //   }
  // }
  let resulet;
  if (data.resulet) {
    resulet = JSON.parse(data.resulet);
  }
  return Promise.resolve(resulet);
}

function getAppKey () {
  return config.tenantId;
}

function toQueryString (obj) {
  return obj
    ? Object.keys(obj)
      .sort()
      .map(function (key) {
        let val = obj[key];
        if (Array.isArray(val)) {
          return val
            .sort()
            .map(function (val2) {
              return (
                encodeURIComponent(key) + '=' + encodeURIComponent(val2)
              );
            })
            .join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      })
      .join('&')
    : '';
}

// 接口列表
function getAPP () {
  return 'pc_ecduo_api/';
}

// 接口版本
function getAppVersion () {
  return 'v1.0/';
}

function md5Data (data) {
  let signKey2 = getNewKey(); // 加密关键字
  // let signKey2 = wx.getStorageSync('md5_key');
  let str = '';
  for (let i in data) {
    if (
      i != 'user_name' &&
      i != 'nickname' &&
      i != 'app' &&
      i != 'act' &&
      i != 'image_file_'
    ) {
      str = str + i + data[i];
    }
  }
  let str2 = signKey2 + str;
  // console.log(str2, signKey2, "加密参数1");
  return Md52.md5(str2);
}

function getStoreId () {
  return config.tenantId; // 线上站点

  // return 265331 //测试站点

  // 286020 对应 app_id:wx1ea68e97a0933a21  后台: http://guangcai.xyd.qushiyun.com/manager/index.php  线上

  // 254451 对应 app_id:wx8d3d1dca615bfee1  后台: yanfa2.test.qushiyun.com/manager
  // 265331 对应 app_id:wxf045bfaea29a8dbd  后台: yanfa3.test.qushiyun.com/manager
  // 276931 对应 app_id:wxa743f32549ecff73  后台: yanfa5.test.qushiyun.com/manager
  // 265347 对应 app_id:wx5f6362baf0e07d65  后台: yanfa.test.qushiyun.com/manager
}

function getNewKey () {
  let storeId = getStoreId();
  let key = Md52.md5(storeId * 2 + 1 + '');
  let md5Key = Md52.md5(key + 'qsy');
  return md5Key;
}

function getNewDatas (data) {
  let newDatas = {};
  data['t'] = Date.parse(new Date());
  data['store_id'] = getStoreId();
  data['newSas'] = 1;
  let md5sign = md5Data(data);
  data['sign'] = md5sign;
  for (let keyName in data) {
    newDatas[keyName] = data[keyName];
  }
  return newDatas;
}

function blobToText (blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsText(blob);
    fileReader.onload = function () {
      try {
        const result = JSON.parse(this.result);
        if (result && result['resultCode'] === 'fail') {
          resolve(result);
        } else {
          reject();
        }
      } catch (e) {
        // TODO handle the exception
        reject();
      }
    };
  });
}

export const postAxios = (url, data, ...args) => {
  const pStr = Object.prototype.toString.call(data);
  data['newSas'] = 1;
  data['t'] = Date.parse(new Date());
  // console.log('传递过来的data', data);
  let md5sign = md5Data(data);
  md5sign = md5sign.toUpperCase();
  data['sign'] = md5sign;

  // console.log('当前需要加密的参数', JSON.stringify(data));

  return new Promise((resolve, reject) => {
    axios.post(url, pStr === '[object FormData]' ? data : qs.stringify(data)).then((res) => {
      resolve(res);
    });
  });
};

export const postFileUploadAxios = (url, data) => {
  return axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export const getDownloadAxios = (url) => {
  return axios.get(url, { responseType: 'blob' });
};

export const postDownloadAxios = (url, data) => {
  return axios.post(url, data, { responseType: 'blob' });
};

export const getAxios = (url, data) => {
  return axios.get(url, {
    params: data
  });
};

function download (res) {
  let reader = new FileReader();
  let data = res.data;
  reader.onload = e => {
    if (e.target.result.indexOf('Result') != -1 && JSON.parse(e.target.result).Result == false) {
      // 进行错误处理
    } else {
      let fileName = 'download';
      let contentDisposition = res.headers['Content-Disposition'];
      contentDisposition = contentDisposition || res.headers['content-disposition'];
      if (contentDisposition) {
        fileName = window.decodeURI(contentDisposition.split('=')[1], 'UTF-8');
      }
      executeDownload(data, fileName);
    }
  };
  reader.readAsText(data);
}

//  模拟点击a 标签进行下载
function executeDownload (data, fileName) {
  if (!data) {
    return;
  }
  let url = window.URL.createObjectURL(new Blob([data]));
  let link = document.createElement('a');
  link.style.display = 'none';
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
