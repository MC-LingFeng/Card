/*
 * @Author: lv 1294432739@qq.com
 * @Date: 2023-05-27 16:43:17
 * @LastEditors: lv 1294432739@qq.com
 * @LastEditTime: 2023-05-27 18:38:44
 * @FilePath: \card\Card\.umirc.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '卡片生成系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '标题+文本',
      path: '/home',
      component: './Home',
    },
  ],
  npmClient: 'pnpm',
});
