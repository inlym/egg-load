# egg-load

[![npm version](https://img.shields.io/npm/v/egg-load)](https://www.npmjs.com/package/egg-load)  [![MIT](https://img.shields.io/npm/l/egg-load)](https://github.com/inlym/egg-load/blob/master/LICENSE)  [![npm](https://img.shields.io/npm/dw/egg-load)](https://www.npmjs.com/package/egg-load)

![egg-load-image](https://img.inlym.com/1843460a76f544f384bc276bed6da9e8.png)


自动挂载第三方模块至 Egg.js 框架上


## 目录

-   [介绍](#介绍)
-   [安装](#安装)
-   [使用](#使用)
    -   [启用插件](#启用插件)
    -   [配置方式](#配置方式)
    -   [使用说明](#使用说明)
-   [示例](#示例)
-   [相关](#相关)
-   [作者](#作者)
-   [参与](#参与)
-   [许可证](#许可证)





## 介绍

在项目开发中，需要用到一些第三方模块（module），一般情况下使用 `require` 就可以将模块引入使用了。但是如果多个文件中用到同一个模块，在每个文件中都需要 `require` 引入，显得有些麻烦，同时也不利于项目工程化管理。

本插件就是为了解决这个问题而诞生的，能够将指定的第三方模块挂载到 Egg.js 框架的 `app` 属性上，以便调用。


本插件完美适配 **Egg.js** 框架，只需要按照框架要求启用插件，根据文档要求进行配置使用即可。



## 安装

按照通用的方式使用 npm 下载安装到你的项目下即可，无需全局安装。

安装命令：

```shell
npm i egg-load
```



## 使用

在使用前，请确保你已经阅读 Egg.js 框架关于**插件**的 [文档](https://eggjs.org/zh-cn/basics/plugin.html) 。

下面说明如何配置以及使用插件。



### 启用插件

在 `config/plugin.js` 文件中声明启用插件：

```js
exports.load = {
  /** 是否启用插件，true 为启用，false 为禁用 */
  enable: true,

  /** 指定插件使用的包，请填写 'egg-load' */
  package: 'egg-load',
};
```



### 配置方式


在 `config/config.${env}.js`文件配置插件：

```js
exports.load = {
  /** 需要挂载的模块列表 */
  module: [
    /** 列表项支持对象（object）和字符串（string）两种形式 */
    {
      /** 需要挂载的 npm 包的包名，例如 axios，必填 */
      package: 'pkg1-name',

      /** 挂载的属性名，例如填 abc，该模块可以通过 app.abc 进行访问，默认为包名，选填 */
      name: 'abc',

      /** 是否禁用，默认为否，选填 */
      disabled: false,
    },

  /** 使用字符串形式只需要输入包名即可，其他属性按照默认属性自动设置 */
    'pkg2-name',
  ],

  /** 是否挂载到 app 上，默认开启 */
  app: true,

  /** 是否挂载到 agent 上，默认关闭 */
  agent: false,
}
```

各配置项的含义是：

|  属性  |       类型       | 默认值 | 是否必填 |                             说明                             |
| :----: | :--------------: | :----: | :------: | :----------------------------------------------------------: |
| module | object \| string |   无   |    否    | 需要挂载的模块列表，列表项支持对象（object）和字符串（string）两种形式 |
|  app   |      string      |  true  |    否    |                 是否挂载到 app 上，默认开启                  |
| agent  |     boolean      | false  |    否    |                是否挂载到 agent 上，默认关闭                 |



### 使用说明

按照上述方式配置后，第三方模块将自动挂载到了 `app` 上，可以通过指定的属性名进行访问。



另外一点需要说明的是，配置引入的第三方模块，需要自行下载安装，本插件并不会帮助你自动下载。



## 示例

我们模拟以下这个使用场景，来演示如何配置和使用本插件：

>   发现 axios 和 only 两个模块的使用率非常高，于是准备将这两个模块挂载到框架上。



在 `config/plugin.js` 文件中声明启用插件：

```js
exports.load = {
  enable: true,
  package: 'egg-load',
};
```



在 `config/config.${env}.js`文件配置插件（示例是一个典型的配置方式）：

```js
exports.load = {
  module: [
    {
      package: 'axios',
      name: 'req',
    },
    'only',
  ],
}
```



通过上述示例方式配置后，可以通过 `app.res` 访问 axios 模块，以及通过 `app.only` 访问 only 模块。



## 相关

以下是作者开发的 Egg.js 框架的插件系列，已用于作者的生产项目中，推荐使用。
-   [egg-apigw-tracer](https://github.com/inlym/egg-apigw-tracer) - ⚡ 适配 API 网关的 HTTP 请求示踪器，用于 Egg.js 框架
-   [egg-aliyun-tablestore](https://github.com/inlym/egg-aliyun-tablestore) - 🚚 阿里云表格存储（Tablestore）插件，用于 Egg.js 框架
-   [egg-load](https://github.com/inlym/egg-load) - 🚀 自动挂载第三方模块至 Egg.js 框架上




## 作者

我是 [inlym](https://www.inlym.com) ，一个产品经理和全栈开发者。



如果你有任何问题或者建议，欢迎联系我，以下是我的联系方式：

-   邮箱：inlym@qq.com
-   主页：[www.inlym.com](https://www.inlym.com)



## 参与

非常欢迎你能够参与这个项目的开发和维护。

你可以通过以下几种方式参与到项目中：

1.  提建议和需求。对于几句话就能说清楚的建议和需求，你可以直接 提一个 [New Issue](https://github.com/inlym/egg-load/issues/new) 。
2.  Fork 项目，修改代码，然后提交 Pull requests 。（提交前请检查务必通过 ESLint 检查）



## 许可证

本插件使用 [MIT](LICENSE) 许可证。
