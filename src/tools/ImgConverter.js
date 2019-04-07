import html2canvas from 'html2canvas';

export const convertToImage = (targetDOM, linkPNG, linkJPEG) => {
  const svg = document.querySelector(targetDOM);
  svg.viewBox.baseVal.x = -4000;
  svg.viewBox.baseVal.y = -2000;
  const wrapper = document.querySelector('#canvasFrame');

  html2canvas(wrapper).then(canvas => {
    const PNG = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    document.querySelector(linkPNG).setAttribute('href', PNG);
    const JPEG = canvas
      .toDataURL('image/jpeg')
      .replace('image/jpeg', 'image/octet-stream');
    document.querySelector(linkJPEG).setAttribute('href', JPEG);
  });

  // const img = new Image();
  // const canvas = document.querySelector('canvas');
  // const svg = document.querySelector(targetDOM);
  // svg.viewBox.baseVal.x = -4000;
  // svg.viewBox.baseVal.y = -2000;
  // // get svg data
  // const xml = new XMLSerializer().serializeToString(svg);

  // // make it base64
  // const svg64 = btoa(xml);
  // const b64Start = 'data:image/svg+xml;base64,';

  // // prepend a "header"
  // const image64 = b64Start + svg64;

  // img.src = image64;
  // console.log(image64);
  // canvas.getContext('2d').drawImage(img, 0, 0);

  // const dt = canvas.toDataURL('image/png'); // << this fails in IE/Edge...

  // document.querySelector(linkPNG).setAttribute('href', dt);
};

//  var canvas = document.getElementById('myCanvas');
//          var ctx = canvas.getContext('2d');
//          var data = '<svg xmlns="http://www.w3.org/2000/svg" width="300"
//          height="200">' +
//             '<foreignObject width="100%" height="100%">' +
//                '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:50px">' +
//                   'Simply Easy ' +
//                   '<span style="color:blue;">' +
//                   'Learning</span>' +
//                '</div>' +
//             '</foreignObject>' +
//          '</svg>';
//          var DOMURL = window.URL || window.webkitURL || window;
//          var img1 = new Image();
//          var svg = new Blob([data], {type: 'image/svg+xml'});
//          var url = DOMURL.createObjectURL(svg);
//          img1.onload = function() {
//             ctx.drawImage(img1, 25, 70);
//             DOMURL.revokeObjectURL(url);
//          }
//          img1.src = url;

export function triggerDownload(imgURI) {
  var evt = new MouseEvent('click', {
    view: window,
    bubbles: false,
    cancelable: true,
  });

  var a = document.createElement('a');
  a.setAttribute('download', 'MY_COOL_IMAGE.png');
  a.setAttribute('href', imgURI);
  a.setAttribute('target', '_blank');

  a.dispatchEvent(evt);
}
