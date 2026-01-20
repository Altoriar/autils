## webpack 和 vite 的区别
1. 核心思想不同
   1. webpack是预构建型 Bundler
   2. vite是即时服务型 Dev Server
Webpack 是以 bundle 为中心的构建工具，开发时需要整体打包，所以启动慢、热更新慢，但生态成熟、适合复杂构建。
Vite 利用浏览器原生 ESM，在开发环境不打包，按需编译，基于 esbuild，启动极快、HMR 极佳；生产使用 rollup。
总结：Vite 开发体验强，Webpack 可定制能力强。

## boe 和 ppe 是如何区分环境


## react hook为什么只能在组件顶层使用
只能在顶层调用，主要是因为 React 需要依赖稳定，可预测的调用顺序，来正确的为每个hook分配状态。
如果我们在循环或者条件判断等逻辑中调用的话，会产生不确定性，
```js
// 假设现在有三个hook

useState(1)
if(flag){
    useState(2)
}
useState(3)

```
当flag为 true 时，React会分配三个状态，当flag为false时，会分配两个状态，导致react内部状态错乱。
而如果在顶层调用，满足如下条件
条件1:每次执行都会渲染
条件2:执行顺序不会发生变化


## 前端如何处理大文件上传
核心思想：将大文件拆分成若干个小块（chunk），逐块上传，失败重传，最后合并
```js
function creatChunk(file, size = 1 * 1024 * 1024) {
  const chunks = [];
  let offset = 0;

  while(offset < file.size) {
    const blob = file.slice(offset, offset + size);
    offset += size;
  }

  return  chunks;
}
```

使用
```js
const chunks = createChunks(file, 2 * 1024 * 1024)

const requests = chunk.map((chunk, index) => {
  return fetch('xxxx', {hash: fileHash, index, chunk})
})

await Promise.all(requests)
```

## 说说px rem em的区别 / 功能
px像素：绝对单位，不会随着窗口的变化而发生改变
em：相对单位，相对于父元素的值，当父元素大小发生改变时，其子元素跟随改变
rem：相对单位，相对于根元素html的值，当其html发生改变则所有使用rem单位的元素发生改变，不受父元素影响，常用语响应式布局，移动端适配

## 如何使用dpr解决dpi屏幕高像素导致图片模糊问题
dpi:屏幕物理像素
dpr：css像素映射规则
dpi（1x）屏幕规则为 100 css px = 100 物理 px
dpi（2x）屏幕规则为 100 css px = 200 物理 px

方案一: 使用img标签的srcset，浏览器会根据dpr选择最佳的尺寸
```html
<img 
  src="logo.png"
  srcset="logo@2x.png 2x, logo@3x.png 3x"
  width="100"
  height="100"
/>
```
方案二：backgroud-imgage + media query
```css
.logo{
    width: 100px;
    height: 100px;
    background-image: url(logo.png);
    background-size: 100px 100px;

}

@media(-webkit-min-device-pixel-ratio: 2){
    .logo{
        background-image: url(logo2x.png);
    }
}

@media(-webkit-min-device-pixel-ratio: 3) {
    .logo{
        background-image: url(logo3x.png)
    }
}
```

## 谈谈对闭包的理解
闭包是指函数可以访问其外部作用域变量的特性，即使外部函数已经执行完毕。
可以使用闭包实现函数柯理化
```js
function muliply(a) {
    return function(b) {
        return a * b;
    }
}
const double = muliply(2);
console.log(double(5)) // 10
```

## 解释函数柯理化
是指将多参数函数，拆成多个单参数函数逐步传参，并最终返回结果的技术
优势是可以固定某些参数
```js
function log(type) {
    return function(message) {
        console.log(`[${type}]: ${message}`);
    }
}

const errorLog = log('ERROR');
const infoLog = log('INFO');
errorLog('something went wrong');
infoLog('a great day');
```

## react中diff算法理解
尽可能高效的更新真实dom，减少dom操作带来的性能开销
react会先用虚拟dom表示UI，当状态发生变化的时候，react会生成新的虚拟dom，diff算法对比新旧dom树，只更新必要的部分
渲染流程：
state变化 → render() → new VDOM
           ↘ diff → 生成最小 patch → 更新真实 DOM

1. 不同类型直接替换
```html
<div /> → <span />

```
2. 相同元素类型，对比属性和子节点
```html
<div className="a" /> → <div className="b" />
```
3. 列表diff
```jsx
{items.map(item => <li key={item.id}>{item.text}</li>)}

// items 改变顺序时，如果没有 key，会造成全部重新渲染
```

## useCallback造成性能恶化的情况
依赖频繁变化
```js
const handleClick = useCallback(() => {
    console.log(count);
}, [count])

// 推荐
const handleClick = () => {
    console.log(count)
}
```

## 小程序如何实现分包
小程序分包是为了降低首屏加载提及、提升启动速度、改善用户体验的一种包提及管理机制
核心思想：把小程序代码按页面模块产分成多个包，首包只包含必要内容，其它包在访问时再动态下载

分包类型
1. 普通分包
2. 独立分包：子包的内容不依赖主包，像活动页、广告页可以考虑使用独立分包
```js
{
  "root": "pkgA",
  "pages": ["pages/index"],
  "independent": true
}
```
分包预下载：进入页面时更快，无白屏
```js
{
  "preloadRule": {
    "pages/index/index": {
      "network": "wifi",
      "packages": ["subpkg1","subpkg2"]
    }
  }
}
```

## 移动端 1px 问题解决方案
为什么会有移动端1px问题？
因为移动端设备大多是高dpi/高dpr屏幕
比如dpr=1
1 css px = 2 物理 px
视觉上看起来比1px粗，于是出现了写1px，显示2px/3px的情况，
解决方案1: 0.5px（最简单）
解决方案2: transform scale
```css
.border {
  position: relative;
}

.border::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  height: 1px;
  width: 100%;
  background-color: #ccc;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}
```
解决方案3: 媒体查询
```css
.border {
  border-bottom: 1px solid #ccc;
}

@media (-webkit-min-device-pixel-ratio: 2) {
  .border {
    border-bottom: 0.5px solid #ccc;
  }
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .border {
    border-bottom: 0.333px solid #ccc;
  }
}

```
| 屏幕      | 最好方案            |
| ------- | --------------- |
| iOS     | 0.5px           |
| Android | transform scale |
| 混合      | scale + 伪元素     |
| 大项目     | rem+viewport 适配 |

taro的解决方案
小程序内部将1px 转换为 1rpx
1rpx = 屏幕宽度 / 750 * 1，与设备的dpr无关，在任何设备上都呈现1物理像素的线

h5端动态缩放
原始代码
```css
.border {
  border-bottom: 1px solid #eee;
}
```
编译代码
```css
.border {
  border-bottom: 0.5rem solid #eee;
}
```

## Taro如何实现跨平台适配
源码 (React + Taro API)
    ↓
AST 编译器
    ↓
平台适配层
    ↓
目标代码（小程序/H5/RN/快应用/DingTalk/...）













