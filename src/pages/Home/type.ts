/*
 * @Author: lv 1294432739@qq.com
 * @Date: 2023-05-27 18:21:03
 * @LastEditors: lv 1294432739@qq.com
 * @LastEditTime: 2023-05-27 18:32:36
 * @FilePath: \card\Card\src\pages\Home\type.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface ValueType {
  pictureWidth: number;
  pictureHeight: number;
  pictureName: string;
  suffixName: string;
  startColor: string;
  endColor: string;
  title: string;
  titleLocation: 'center' | 'left' | 'right';
  titleTop: number;
  titleBottom: number;
  titleFontSize: number;
  content: string;
  contentFontSize: number;
  contentLeft: number;
  contentRight: number;
  lineHeight: number;
  pictureLayout: Array<'title' | 'content'>;
}
