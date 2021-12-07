import chalk from 'chalk'
import spawn from 'cross-spawn'

/**
 * 安装规则
 */

interface InstallArgs {
  useYarn: boolean // 使用yarn 安装
  isOnline: boolean // 是否联网
  devDependencies?: boolean // 依赖是否为开发依赖
}

export const install = (
  root: string,
  dependencies: string[] | null,
  { useYarn, isOnline, devDependencies }: InstallArgs,
): Promise<void> => {
  const npmFlags: string[] = []
  const yarnFlags: string[] = []

  return new Promise((resolve, reject) => {
    let args: string[]
    let command: string = useYarn ? 'yarn' : 'npm'

    if (dependencies?.length) {
      if (useYarn) {
        // --exact或-E参数将安装指定版本的包。
        // --offline 离线安装
        args = ['add', '--exact']
        if (!isOnline) args.push('--offline')
        args.push('--cwd', root)
        if (devDependencies) args.push('--dev')
        args.push(...dependencies)
      } else {
        args = ['install', '--save-exact']
        args.push(devDependencies ? '--save-dev' : '--save')
      }
    } else {
      args = ['install']
      if (useYarn) {
        if (!isOnline) {
          console.log(chalk.yellow('you appear to be offline'))
          console.log(chalk.yellow('falling back to the yarn local cache'))
          console.log()
          args.push('--offline')
        }
      } else {
        if (!isOnline) {
          console.log(chalk.yellow('you appear to be offline'))
          console.log()
        }
      }
    }

    if (useYarn) {
      args.push(...yarnFlags)
    } else {
      args.push(...npmFlags)
    }

    const child = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, ADBLOCK: '1', DISABLE_OPENCOLLECTIVE: '1' },
    })

    child.on('close', (code) => {
      if (code !== 0) {
        reject({ command: `${command} ${args.join(' ')}` })
        return
      }
      resolve()
    })
  })
}
