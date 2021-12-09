import chalk from 'chalk'
import cp from 'child_process'
import fs from 'fs'

import { commonDeps, reactDeps, vueDeps } from './dependencies'

const cmdConfig = (
  targetDirPath: string,
): cp.SpawnSyncOptionsWithBufferEncoding => ({
  env: process.env,
  cwd: targetDirPath,
  shell: true,
  stdio: 'inherit',
})

/**
 * 删除目标文件夹及下面的所有文件
 * @param path
 */
const deleteFolderRecursive = (path: string) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = path + '/' + file
      if (fs.statSync(curPath).isDirectory()) {
        // 文件夹
        deleteFolderRecursive(curPath)
      } else {
        // 删除文件
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

/**
 * 下载依赖
 * @param useYarn
 * @param template
 * @param appDir
 */
const downloadDeps = (useYarn: boolean, template: string, appDir: string) => {
  const targetDeps = template.includes('vue') ? vueDeps : reactDeps
  const useTypescripts = true
  let npmCmd = 'npm'
  let action = 'install'
  if (useYarn) {
    npmCmd = 'yarn'
    action = 'add'
  }

  let devActions = [action, '-D'].concat(targetDeps.devDeps, commonDeps.devDep)
  let actions = [action].concat(targetDeps.deps, commonDeps.dep)
  const tsRex = /(@types|typescript|vue-tsc)/

  if (!useTypescripts) {
    actions = actions.filter((cmd) => !tsRex.test(cmd))
    devActions = devActions.filter((cmd) => !tsRex.test(cmd))
  }

  try {
    cp.spawnSync(npmCmd, devActions, cmdConfig(appDir))
    cp.spawnSync(npmCmd, actions, cmdConfig(appDir))
    cp.spawnSync('git', ['init'], cmdConfig(appDir))
    cp.spawnSync(npmCmd, ['prepare'], cmdConfig(appDir))
  } catch (error) {
    console.log(chalk.red(error))
    deleteFolderRecursive(appDir)
    process.exit(1)
  }
}

export { commonDeps, deleteFolderRecursive, downloadDeps }
