import produce from 'immer';

const SET_SVG = 'canvas/SET_SVG';
const CREATE_SVG_POINT = 'pointer/CREATE_SVG_POINT';
const GET_LOCATION_FROM_EVENT = 'pointer/GET_LOCATION_FROM_EVENT';
const SET_PREV_LOC = 'pointer/SET_PREV_LOC';
const POINTER_UP = 'pointer/UP';
const POINTER_DOWN = 'pointer/DOWN';
const POINTER_MOVE = 'pointer/MOVE';

export const setSVG = svg => ({ type: SET_SVG, svg });
export const createSVGPoint = svg => ({ type: CREATE_SVG_POINT, svg });
export const getLocationFromEvent = event => ({
  type: GET_LOCATION_FROM_EVENT,
  event,
});
export const setPrevLoc = location => ({ type: SET_PREV_LOC, location });
export const pointerUp = event => ({ type: POINTER_UP, event });
export const pointerDown = event => ({ type: POINTER_DOWN, event });
export const pointerMove = event => ({ type: POINTER_MOVE, event });

const initialState = {
  svg: null,
  target: { class: null, nodeId: null },
  state: {
    isDown: false,
    isDrag: false,
  },
  currLoc: { x: 0, y: 0 },
  prevLoc: { x: 0, y: 0 },
};

export default function pointer(state = initialState, action) {
  switch (action.type) {
    case SET_SVG:
      return produce(state, draft => {
        draft.svg = action.svg;
      });
    case CREATE_SVG_POINT:
      return produce(state, draft => {
        draft.currLoc = action.svg.createSVGPoint();
      });
    case GET_LOCATION_FROM_EVENT:
      return produce(state, draft => {
        if (action.event.targetTouches) {
          draft.currLoc.x = action.event.targetTouches[0].clientX;
          draft.currLoc.y = action.event.targetTouches[0].clientY;
        } else {
          draft.currLoc.x = action.event.clientX;
          draft.currLoc.y = action.event.clientY;
        }
      });
    case SET_PREV_LOC:
      return produce(state, draft => {
        draft.prevLoc = action.location;
      });
    case POINTER_UP:
      return produce(state, draft => {
        draft.state.isDown = false;
        draft.state.isDrag = false;
      });
    case POINTER_DOWN:
      return produce(state, draft => {
        draft.state.isDown = true;
        draft.target.class =
          action.event.target.className.baseVal &&
          action.event.target.className.baseVal;
        draft.target.nodeId =
          action.event.target.className.baseVal === 'node' &&
          parseInt(action.event.target.id, 10);
      });
    case POINTER_MOVE:
      return produce(state, draft => {
        draft.state.isDrag = state.state.isDown && true;
      });
    default:
      return state;
  }
}
