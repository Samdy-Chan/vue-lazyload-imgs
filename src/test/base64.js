export async function url2base64(url, imgType = 'image/jpeg') {
  let base64 = '';
  
  const blob = await window
    .fetch(url, {
      headers: {
        'Content-Type': imgType,
      },
    })
    .then((res) => res.blob());
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  reader.onload = (e) => {
    
    const buffer = new Uint8Array(e.target.result);
    const byteCode = buffer.reduce((prevByte, byte) => {
      prevByte += String.fromCharCode(byte);
      return prevByte;
    }, '');
    return (base64 = window.btoa(byteCode));
    
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(base64);
    }, 10);
  });
}
