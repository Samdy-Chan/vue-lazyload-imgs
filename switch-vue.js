import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

(async function () {
  // console.log(process.argv);

  // 先设置中文不乱码环境
  const execRes = execSync('chcp 65001');

  // 获取要切换的 vue 版本号
  const version = process.argv[2];

  if (!version) return console.error('Error: Please provide the version to switch.');

  // 获取操作系统平台 win32/darwin(MacOS)/linux
  const platform = os.platform();

  let cmd = '';

  // 判断只能生成如执行 switch-vue.js 3 这样的提供后面的如 3 参数的 vue 版本的 node_modules 目录链接
  if (['3', '2', '2.7'].includes(version)) {
    cmd = makeLinkCmd(platform, version);
  } else {
    return console.error(
      `Error: The switched Vue version only supports 3 or 2, or 2.7, but you provided ${version}.`
    );
  }

  // 创建 ./node_modules => ./${version}/node_modules 目录的链接
  try {
    const linkRes = execSync(cmd, { encoding: 'utf8' }); // 默认 encoding 为 buffer
    // console.log('linkRes:', linkRes.toString()); // 如果 encoding 为 buffer，要转换为字符串
    if (linkRes?.startsWith('Error:')) return console.error(linkRes);
  } catch (e) {
    return console.error(`Error: ${e.toString()}`);
  }

  // 如果 node_modules 目录链接成功，执行 vue-demi 的 vue-demi-switch ver_number 命令切换 vue 版本
  const switchCmd = resolve('./node_modules/.bin/vue-demi-switch' + (platform === 'win32' ? '.cmd' : ''));
  // console.log('switchCmd:', switchCmd);
  const switchRes = execFileSync(switchCmd, [version], { encoding: 'utf8' });
  console.log(switchRes); // [vue-demi] Switched for Vue 3 (entry: "vue")

  // 读取及修改 tsconfig.json 文件内容，使用正则表达式替换修改，可以保留 json 文件原注释内容，
  // 否则，如果使用 JSON.parse 转为对象修改，会删除原注释内容；
  // 并判断如果是切换到 Vue2 环境，需加入 "vueCompilerOptions":{"target":2} 配置项，
  // 予支持执行 yarn build/npm run build 打包 Vue2 环境或组件；如果是切换到 Vue3 环境，还需要删除该配置项
  if (version.startsWith('2')) {
    await modifyJsonFile(
      // 要修改的文件，位置相对于当前脚本文件 switch-vue.js 而言
      'tsconfig.json',
      // 原内容（要替换为内容）
      `"./tsconfig.node.json" }
  ]`,
      // 替换后的内容
      `"./tsconfig.node.json" }
  ],
  // Configure for run build of Vue2
  "vueCompilerOptions": {
    "target": 2
  }`
    );
  } else {
    await modifyJsonFile(
      'tsconfig.json',

      `,
  // Configure for run build of Vue2
  "vueCompilerOptions": {
    "target": 2
  }`,

      '',
      'm' // 'm' 为修改模式，缺省为追加内容模式 'a'
    );
  }

  // 根据提供的平台和Vue版本号生成对应的 cmd 命令
  function makeLinkCmd(platform, version) {
    version = version === '3' ? 'vue3' : version === '2' ? 'vue2' : version === '2.7' ? 'vue2.7' : '';

    const link = resolve('./node_modules');
    const target = resolve(`./${version}/node_modules`);

    // 如果要链接的目标目录不存在，抛出错误提示
    if (!fs.existsSync(target)) {
      /* throw new Error(
        `The ${target} directory does not exist. Please confirm that you have installed ${version}.`
      ); */

      return `Error: The ${target} directory does not exist. Please confirm that you have installed ${version}.`;
    }

    // 如果链接库已存在，则先删除
    if (fs.existsSync(link)) fs.unlinkSync(link);

    if (platform === 'win32') {
      cmd = `mklink /j ${link} ${target}`;
    } else if (['linux', 'darwin'].includes(platform)) {
      cmd = `ln -s ${link} ${target}`;
    } else {
      return 'Error: The <npm run switch> or <yarn switch> command only supports execution on the Windows or Linux or MacOS platform.';
    }

    // 返回生成的 cmd 命令字符串
    return cmd;
  }

  // 自封装 path.resolve 函数
  function resolve(url) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.resolve(__dirname, url);
  }

  // 读取及修改 tsconfig.json 文件内容的函数：使用正则表达式替换修改，可以保留 json 文件原注释内容，
  // 否则，如果使用 JSON.parse 转为对象修改，会删除原注释内容；
  // 并判断如果是切换到 Vue2 环境，需加入 "vueCompilerOptions":{"target":2} 配置项，
  // 予支持执行 yarn build/npm run build 打包 Vue2 环境或组件；如果是切换到 Vue3 环境，还需要删除该配置项。
  // // type: 'm' 为修改模式，缺省为追加内容模式 'a'
  async function modifyJsonFile(fname, origContent, targetContent, type = 'a') {
    // 获取 json 文件带协议的绝对路径名，如（file:///E:/wwwroot/test.json），以上定义的 resolve 函数返回的是不带协议的路径
    /* const absFileName = path.dirname(import.meta.url) + '/' + fname;
    const jsonObj = await import(absFileName, { with: { type: 'json' } }); // 导入 json 文件，需加 with.type 选项
    // 可以用 jsonObj.default.vueCompilerOptions 判断选项是否存在，本例不用这个，读取文件内容用正则匹配判断
    console.log('jsonObj:', jsonObj.default);
     */

    try {
      // 读取 json 文件内容
      let jsonContent = fs.readFileSync(resolve(fname), { encoding: 'utf8' });
      // console.log('jsonContent:', jsonContent);

      // 如果是新增配置项
      if (type === 'a') {
        // matchRes[3] 就是匹配到的正则括号内的内容，如 vueCompilerOptions，先匹配总的（不管有没括号分组），
        // 然后再按左括号从左到右进行分组匹配进数组
        let matchRes = targetContent.match(/,\s*((\/\/|\/\*)\s*.*\s*)*"(\w*)":/);
        // console.log('matchRes:', matchRes);

        // 如果已经匹配到不作处理
        let reg = new RegExp(`"${matchRes[3]}"`);
        if (jsonContent.match(reg)) {
          return;
        }
      }

      // 如果是修改配置项（type = 'm'），或没有匹配到，都进行替换修改
      jsonContent = jsonContent.replace(origContent, targetContent);
      // 修改后写入 json 文件，如下第三个对象参数除 flush 外，其它的配置项都是默认值，
      // flush 为 true 表示同步立即将写入缓存区的内容刷写到磁盘，防止断电或故障丢失数据
      fs.writeFileSync(resolve(fname), jsonContent, {
        encoding: 'utf8',
        mode: 0o666,
        flag: 'w',
        flush: true,
      });
    } catch (e) {
      throw new Error(`操作文件 ${fname} 失败：${e}`);
    }
  }
})();
