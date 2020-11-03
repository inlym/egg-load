'use strict'

const typeasy = require('typeasy')

function loadApp(app, packageName, name) {
	try {
		app[name] = require(packageName)
		app.coreLogger.info(`[egg-load] ${packageName} 引入成功，可通过 app.${name} 访问 `)
	} catch (error) {
		throw new Error(`[egg-load] 第三方模块引入异常，可能是该模块未安装。以下是错误原因：\n ${error}`)
	}
}

const errMsg = '[egg-load] 参数配置错误，请参照使用文档进行配置或者将插件关闭。文档地址： https://github.com/inlym/egg-load'

module.exports = (app) => {
	const { load } = app.config
	if (typeasy(load) !== 'object') {
		throw new Error(errMsg)
	}

	const list = load.module
	if (typeasy(list) !== 'array') {
		throw new Error(errMsg)
	}

	list.forEach((e) => {
		if (typeasy(e) === 'string') {
			loadApp(app, e, e)
		} else if (typeasy(e) === 'object') {
			if (e.disabled) {
				app.coreLogger.info(`[egg-load] ${e.package} 由于 disabled 属性为 true，未引入 `)
			} else {
				const name = e.name || e.package
				loadApp(app, e.package, name)
			}
		} else {
			throw new Error(errMsg)
		}
	})
}
