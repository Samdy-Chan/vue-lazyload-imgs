import { url2base64 } from './utils';

let imgBase64 = await url2base64('https://img.soogif.com/B84eqI5yyJKNYiKJyvqL9SXtgKTmqi1k.gif_jpg');

console.log('imgBase64:', imgBase64);
