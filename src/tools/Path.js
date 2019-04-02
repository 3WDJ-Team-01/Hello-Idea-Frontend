/* eslint-disable vars-on-top */
/* eslint-disable no-var */

// Options:
// - startNodeLocation: location of start node
// - endNodeLocation: location of end node
// - endNodeSize: size of end node
// return path mode, end point location
export function getPathEndPoint(
  startNodeLocation,
  endNodeLocation,
  endNodeSize,
) {
  var endPoint = { mode: '', position: '', x: null, y: null };
  if (!startNodeLocation) return endPoint;

  var dx = startNodeLocation.x - endNodeLocation.x;
  var dy = startNodeLocation.y - endNodeLocation.y;
  var degree = Math.atan2(dy, dx) * (180 / Math.PI);

  if (degree > -45 && degree <= 45) {
    // right point
    endPoint.mode = 'horizontal';
    endPoint.position = 'right';
  } else if (degree > 45 && degree <= 135) {
    // bottom point
    endPoint.mode = 'vertical';
    endPoint.position = 'bottom';
  } else if (degree > 135 || degree <= -135) {
    // left point
    endPoint.mode = 'horizontal';
    endPoint.position = 'left';
  } else if (degree > -135 && degree <= -45) {
    // top point
    endPoint.mode = 'vertical';
    endPoint.position = 'top';
  }
  return endPoint;
}
