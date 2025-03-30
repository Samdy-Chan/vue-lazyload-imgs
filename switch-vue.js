import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

(async function () {
  const platform = os.platform();
  try {
    if (platform === 'win32') {
      execSync('chcp 65001', { stdio: 'ignore' });
    }
  } catch (e) {
    return console.error(`Error: ${e.toString()}`);
  }
  const version = process.argv[2];

  if (!version) return console.error('Error: Please provide the version to switch.');

  let cmd = '';
  if (['3', '2', '2.7'].includes(version)) {
    cmd = makeLinkCmd(platform, version);
  } else {
    return console.error(
      `Error: The switched Vue version only supports 3 or 2, or 2.7, but you provided ${version}.`
    );
  }
  try {
    const linkRes = execSync(cmd, { encoding: 'utf8' }); 
    
    if (linkRes?.startsWith('Error:')) return console.error(linkRes);
  } catch (e) {
    return console.error(`Error: ${e.toString()}`);
  }
  const switchCmd = resolve('./node_modules/.bin/vue-demi-switch' + (platform === 'win32' ? '.cmd' : ''));
  
  const switchRes = execFileSync(switchCmd, [version], { encoding: 'utf8' });
  console.log(switchRes); 
  if (version.startsWith('2')) {
    await modifyJsonFile(
      
      'tsconfig.json',
      
      `"./tsconfig.node.json" }
  ]`,
      
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
      'm' 
    );
  }
  if (version === '2.7') {
    await modifyJsonFile(
      'tsconfig.app.json',

      `"removeComments": true,`,

      `"removeComments": true,
    // Vue2.7 需要引入 node_modules/vue/types 该类型，否则打包时，报 export default defineComponent 返回类型错误
    "types": ["node", "vue/types"],`
    );
  } else {
    await modifyJsonFile(
      'tsconfig.app.json',

      `
    // Vue2.7 需要引入 node_modules/vue/types 该类型，否则打包时，报 export default defineComponent 返回类型错误
    "types": ["node", "vue/types"],`,

      '',
      'm' 
    );
  }
  function makeLinkCmd(platform, version) {
    version = version === '3' ? 'vue3' : version === '2' ? 'vue2' : version === '2.7' ? 'vue2.7' : '';

    const link = resolve('./node_modules');
    const target = resolve(`./${version}/node_modules`);
    if (!fs.existsSync(target)) {
      return `Error: The ${target} directory does not exist. Please confirm that you have installed ${version}.`;
    }
    if (fs.existsSync(link)) fs.unlinkSync(link);

    if (platform === 'win32') {
      cmd = `mklink /j ${link} ${target}`;
    } else if (['linux', 'darwin'].includes(platform)) {
      cmd = `ln -s ${target} ${link}`;
    } else {
      return 'Error: The <npm run switch> or <yarn switch> command only supports execution on the Windows or Linux or MacOS platform.';
    }
    return cmd;
  }
  function resolve(url) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    return path.resolve(__dirname, url);
  }
  async function modifyJsonFile(fname, origContent, targetContent, type = 'a') {
    try {
      
      let jsonContent = fs.readFileSync(resolve(fname), { encoding: 'utf8' });
      if (type === 'a') {
        let matchRes = targetContent.match(/,\s*((\/\/|\/\*)\s*.*\s*)*"(\w*)":/);
        let reg = new RegExp(`"${matchRes[3]}"`);
        if (jsonContent.match(reg)) {
          return;
        }
      }
      jsonContent = jsonContent.replace(origContent, targetContent);
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
