import html2canvas from 'html2canvas';

export const convertToImage = (targetDOM, linkPNG, linkJPEG) => {
  // const input = document.querySelector(targetDOM);

  // html2canvas(input).then(canvas => {
  //   const PNG = canvas
  //     .toDataURL('image/png')
  //     .replace('image/png', 'image/octet-stream');
  //   document.querySelector(linkPNG).setAttribute('href', PNG);
  //   const JPEG = canvas
  //     .toDataURL('image/jpeg')
  //     .replace('image/jpeg', 'image/octet-stream');
  //   document.querySelector(linkJPEG).setAttribute('href', JPEG);
  // });

  const svgString = new XMLSerializer().serializeToString(
    document.querySelector(targetDOM),
  );

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  const svg = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
};
