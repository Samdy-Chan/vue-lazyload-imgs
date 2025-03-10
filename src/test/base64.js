export async function url2base64(url, imgType = 'image/jpeg') {
  let base64 = '';
  // url 转 blob
  const blob = await window
    .fetch(url, {
      headers: {
        'Content-Type': imgType,
      },
    })
    .then((res) => res.blob());
  // console.log('blob:', blob);

  // 读取 blob 和转换
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  reader.onload = (e) => {
    // blob 转 buffer
    const buffer = new Uint8Array(e.target.result);
    // console.log('buffer:', buffer);

    // buffer 转字节码
    const byteCode = buffer.reduce((prevByte, byte) => {
      prevByte += String.fromCharCode(byte);
      return prevByte;
    }, '');
    // console.log('byteCode:', byteCode);

    // 字节码转 base64
    return (base64 = window.btoa(byteCode));
    // console.log('base64:', base64);
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(base64);
    }, 10);
  });
}
