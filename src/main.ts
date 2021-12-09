#!/usr/bin/env node

// 检测 node 版本相关依赖
import chalk from 'chalk'
import program from 'commander'
import semver from 'semver'

// @ts-ignore
import packageJson from '../package.json'
import { createOptionsHandler, templateInit } from './util/template-create'

/**
 * 检测 node 版本函数
 * @param {string} wanted
 * @param {string} id
 */
function checkNodeVersion(wanted: string, id: string) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        `你使用的Node版本号为：${process.version}，但${id}需运行在${wanted}` +
          '\n请升级你的Node版本',
      ),
    )
    process.exit(1)
  }

  if (semver.satisfies(process.version, '10.x')) {
    console.log(
      chalk.red(
        `你使用的Node版本是 ${process.version}.\n` +
          `强烈建议你使用最新LTS版本`,
      ),
    )
  }
}

checkNodeVersion(packageJson.engines.node, 'maria-cli')

// 开始处理命令
program.version(packageJson.version, '-v, --version')

// 创建命令
program
  .command('create <app-name>')
  .description('create a new project')
  .option('--template <presetName>', '使用对应web模板')
  .action((name, cmd) => {
    if (cmd.template) {
      templateInit(name, cmd.template)
    } else {
      createOptionsHandler(name)
    }
  })

program.parse(process.argv)
