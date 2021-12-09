import chalk from 'chalk'
import cp from 'child_process'
import fs from 'fs'
import inquirer from 'inquirer'
import nunjucks from 'nunjucks'
import path from 'path'

import { deleteFolderRecursive, downloadDeps } from './template-dependencies'

const currentPath = process.cwd()
const binaryFilesRex = /\.(png|jpg|gif|jpeg|webp|ico|mp4)$/
let appType = 'tsx'
let appTemplate = 'vue-vite'

/**
 * 初始化项目信息
 * @param appName
 * @param template
 */
async function templateInit(appName: string, template: string) {
  const rootPath = path.resolve(__dirname, `../../templates/${template}`)
  appTemplate = template
  appType = getCurrentAppType(template)

  const targetDirPath = path.resolve(currentPath, appName)
  await checkDirNameUseful(appName)
  fs.mkdirSync(targetDirPath)
  console.log(chalk.green(`正在创建${template}项目...`))
  createDir(rootPath, appName, targetDirPath)
  createCommonFiles(appName)

  installDependencies(targetDirPath, appName, template)
}

/**
 * 启动文件后缀名确认
 * @param template
 */
function getCurrentAppType(template: any) {
  switch (template) {
    case 'vue-vite':
      return 'ts'
    case 'react-vite':
      return 'tsx'
    default:
      return 'ts'
  }
}

/**
 * 创建文件夹
 * @param sourceDir
 * @param appName
 * @param dirName
 */
function createDir(sourceDir: string, appName: any, dirName: string) {
  const targetDir = fs.readdirSync(sourceDir)

  targetDir.forEach((fileName) => {
    const sourceFilePath = path.join(sourceDir, fileName)
    // 不使用 ts 时忽略公共的 ts 文件及文件夹
    // if (!appTemplate.includes('ts') && /(\.ts$|typings)/.test(fileName)) {
    //   return
    // }

    if (isFile(sourceFilePath)) {
      // 文件
      if (binaryFilesRex.test(fileName)) {
        const fileData = fs.readFileSync(sourceFilePath)
        const data = Buffer.from(fileData)
        createFile(fileName, data, dirName)
      } else {
        const fileData = fs.readFileSync(sourceFilePath).toString()
        const data = /.vue$/.test(fileName)
          ? fileData
          : nunjucks.renderString(fileData, {
              appName,
              appType,
              appTemplate: appTemplate.includes('react') ? 'root' : 'app',
            })
        createFile(fileName, data, dirName)
      }
    } else {
      // 文件夹
      const nextDir = path.join(dirName, fileName)
      const isExist = fs.existsSync(nextDir)
      // 文件夹不存在则新建文件夹
      isExist || fs.mkdirSync(nextDir)
      createDir(sourceFilePath, appName, nextDir)
    }
  })
}

/**
 * 创建文件
 * @param fileName
 * @param data
 * @param dirName
 */
function createFile(
  fileName: string,
  data: string | Buffer | NodeJS.ArrayBufferView,
  dirName: string,
) {
  const filePath = path.join(dirName, getCorrectFileName(fileName))
  try {
    fs.writeFileSync(filePath, data)
    console.log(chalk.green(`创建: ${fileName}`))
  } catch (err) {
    console.log(chalk.red(`创建${fileName}失败：${err}`))
  }
}

function getCorrectFileName(fileName: string) {
  return fileName.includes('gitignore') ? '.gitignore' : fileName
}

/**
 * 判断是否为文件
 * @param dirPath
 */
function isFile(dirPath: number | fs.PathLike) {
  try {
    fs.readFileSync(dirPath)
    return true
  } catch (error) {
    return false
  }
}

/**
 * 生成公共文件
 * @param appName
 */
function createCommonFiles(appName: string) {
  const appPath = path.join(currentPath, appName)
  const commonPath = path.join(__dirname, '../../templates/common')
  createDir(commonPath, appName, appPath)
}

/**
 * 开始下载依赖
 * @param targetDirPath
 * @param appName
 * @param template
 */
function installDependencies(
  targetDirPath: string,
  appName: string,
  template: string,
) {
  const useYarn = isYarnInstalled()
  downloadDeps(useYarn, template, targetDirPath)
  console.log(
    chalk.gray(`
      1.进入文件夹:\t cd ${appName}
      2.运行项目:\t ${useYarn ? 'yarn' : 'npm run'} dev
    `),
  )
}

/** 是否存在 yarn */
function isYarnInstalled() {
  try {
    cp.spawnSync('yarn', ['-v'], { shell: true })
    return true
  } catch (error) {
    console.log(chalk.yellow('未安装yarn，将使用npm下载依赖'))
    return false
  }
}

/**
 * 检查本地是否存在同名文件夹
 * @param appName
 */
async function checkDirNameUseful(appName: string) {
  try {
    const targetDirPath = path.join(currentPath, appName)
    const isExist = fs.existsSync(targetDirPath)
    if (!isExist) return

    const answers = await inquirer.prompt({
      type: 'confirm',
      message: '发现当前目录已存在与项目同名的文件夹，是否覆盖？',
      name: 'cover',
    })
    if (answers.cover) {
      const appPath = path.join(currentPath, appName)
      deleteFolderRecursive(appPath)
    } else {
      process.exit(1)
    }
  } catch (error) {
    process.exit(1)
  }
}

/**
 * 没有设置 template 时手动选择
 * @param name
 */
async function createOptionsHandler(name: string) {
  try {
    await checkDirNameUseful(name)
    const answers = await inquirer.prompt([
      {
        type: 'list',
        message: '请选择需要使用的模板',
        name: 'template',
        choices: ['vue-vite', 'react-vite'],
      },
    ])
    templateInit(name, answers.template)
  } catch (error) {
    console.log(chalk.red(error))
    process.exit(1)
  }
}

export { templateInit, createOptionsHandler }
