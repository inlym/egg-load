# egg-load

（推荐）自动装载第三方模块至 Egg.js 框架上

## 介绍

在项目开发中，需要用到一些第三方模块（module），一般情况下使用 `require` 就可以将模块引入使用了。但是如果多个文件中用到同一个模块，每个文件中都需要 `require` 一下，显得有些麻烦，同时也不利于项目工程化管理。本插件就是为了解决这个问题而诞生的，能够将指定的第三方模块挂载到 Egg.js 框架的 `app` 属性上，方便调用。


## 安装

```bash
$ npm i egg-load
```


## 配置

通过 `config/plugin.js` 配置启动 `egg-load` 插件:

```js
exports.load = {
  enable: true,
  package: 'egg-load',
}
```

在 `config/config.${env}.js` 配置各个环境的信息，以下是使用示例：

```js
exports.load = {
  /** 需要挂载的模块列表 */
  module: [
    /** 列表项支持对象（object）和字符串（string）两种形式 */
    {
      /** 需要挂载的 npm 包的包名，例如 axios，必填 */
      package: 'pkg1-name',

      /** 挂载的属性名，例如填 abc，该模块可以通过 app.abc 进行访问，默认为包名（package），选填 */
      name: 'abc',

      /** 是否禁用，默认为否，选填 */
      disabled: false,
    },

	/** 使用字符串形式只需要输入包名即可，其他属性按照默认属性自动设置 */
    'pkg2-name',
  ],

  /** 是否加载到 app 上，默认开启 */
  app: true,

  /** 是否加载到 agent 上，默认关闭 */
  agent: false,
}
```


## 使用

所有引入的第三方模块将自动挂载到 `app` 上，直接访问设定的属性名即可。例如：

插件配置：

```js
// config/plugin.js
exports.load = {
  enable: true,
  package: 'egg-load',
}

```

配置信息 Demo：

```js
exports.load = {
  module: [
    {
      package: 'axios',
      name: 'req',
      disabled: false,
    },
    'only',
  ],

  app: true,
  agent: false,
}
```

在能够访问 `app` 的地方，你可以通过 `app.req` 和 `app.only` 访问以上两个包。
