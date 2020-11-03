'use strict'

const typeasy = require('typeasy')

module.exports = (app) => {
	//
	const { load } = app.config
	if (typeasy(load) !== 'object') {
		throw new Error('参数配置错误，未配置 load 参数，详情请阅读文档。https://github.com/inlym/egg-load')
	}

	const list = load.module
	if (typeasy(list) !== 'array') {
		throw new Error('参数配置错误，未配置 load.module 参数，详情请阅读文档。https://github.com/inlym/egg-load ')
	}

	list.forEach((e) => {
		if (typeasy(e) === 'string') {
			try {
				app[e] = require(e)
			} catch (error) {
				throw new Error(`第三方模块引入异常，可能是该模块未安装。以下是错误原因：\n ${error}`)
			}
		} else if (typeasy(e) === 'object') {
			if (e.disabled) {
				app.coreLogger.info(`[egg-load] ${e.package} 由于 disabled 属性为 true，未引入 `)
			} else {
				if (e.package !== 'string') {
					throw new Error(
						'部分 package 包名为空或其他异常，请查看文档说明进行配置。https://github.com/inlym/egg-load '
					)
				}

				const name = e.name || e.package

				try {
					app[name] = require(e.package)
					app.coreLogger.info(`[egg-load] ${e.package} 引入成功，可通过 app.${name} 访问 `)
				} catch (error) {
					throw new Error(`第三方模块引入异常，可能是该模块未安装。以下是错误原因：\n ${error}`)
				}
			}
		}
	})
}
