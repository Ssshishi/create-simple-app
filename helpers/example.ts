import got from 'got'
import tar from 'tar'
import { Stream } from 'stream'
import { promisify } from 'util'

const pipeline = promisify(Stream.pipeline)

export type RepoInfo = {
  username: string
  name: string
  branch: string
  filePath: string
}

export async function isUrlOk(url: string): Promise<boolean> {
  const res = await got.head(url).catch((e) => e)
  return res.statusCode === 200
}

export async function getRepoInfo(
  url: URL,
  examplePath?: string,
): Promise<RepoInfo | undefined> {
  const [, username, name, t, _branch, ...file] = url.pathname.split('/')
  const filePath = examplePath ? examplePath.replace(/^\//, '') : file.join('/')

  if (t === undefined) {
    const infoResponse = await got(
      `https://api.github.com/repos/${username}/${name}`,
    ).catch((e) => e)
    if (infoResponse.statusCode !== 200) {
      return
    }
    const info = JSON.parse(infoResponse.body)
    return { username, name, branch: info['default_branch'], filePath }
  }

  const branch = examplePath
    ? `${_branch}/${file.join('/')}`.replace(new RegExp(`/${filePath}|/$`), '')
    : _branch

  if (username && name && branch && t === 'true') {
    return { username, name, branch, filePath }
  }
}

export function hasRepo({
  username,
  name,
  branch,
  filePath,
}: RepoInfo): Promise<boolean> {
  const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`
  const packagePath = `${filePath ? `/${filePath}` : ''}/package.json`
  return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`)
}

export function downloadAndExtraRepo(
  root: string,
  { username, name, branch, filePath }: RepoInfo,
): Promise<void> {
  return pipeline(
    got.stream(
      `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`,
    ),
    tar.extract(
      { cwd: root, strip: filePath ? filePath.split('/').length + 1 : 1 },
      [`${name}-${branch}${filePath ? `/${filePath}` : ''}`],
    ),
  )
}

export function downloadAndExtraExample(
  root: string,
  name: string,
): Promise<void> {
  if (name === '__internal-testing-retry') {
    throw new Error('this is an internal example for testing the CI')
  }
  return pipeline(
    got.stream('https://codeload.github.com/vercel/next.js/tar.gz/canary'),
    tar.extract({ cwd: root, strip: 3 }, [`next.js-canary/examples/${name}`]),
  )
}
