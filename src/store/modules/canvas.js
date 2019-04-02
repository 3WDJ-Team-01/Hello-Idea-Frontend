import produce from 'immer';

// global actions
const SET_VIEWBOX_BASEVAL = 'canvas/SET_VIEWBOX_BASEVAL';
const SET_VIEWBOX_LOCATION = 'canvas/SET_VIEWBOX_LOCATION';

// context actions
const TOGGLE_CONTEXT_MENU = 'canvas/TOGGLE_CONTEXT_MENU';
const TOGGLE_STYLE_MENU = 'canvas/TOGGLE_STYLE_MENU';

export const setViewBoxBaseVal = svg => ({ type: SET_VIEWBOX_BASEVAL, svg });
export const setViewBoxLocation = distance => ({
  type: SET_VIEWBOX_LOCATION,
  distance,
});
export const toggleContextMenu = event => ({
  type: TOGGLE_CONTEXT_MENU,
  event,
});
export const toggleStyleMenu = () => ({
  type: TOGGLE_STYLE_MENU,
});

const initialState = {
  viewBox: 0,
  display: {
    width: 5760,
    height: 3240,
    zoom: 1,
  },
  contextMenu: {
    mode: null,
  },
};

export default function canvas(state = initialState, action) {
  switch (action.type) {
    case SET_VIEWBOX_BASEVAL:
      return produce(state, draft => {
        draft.viewBox = action.svg.viewBox.baseVal;
      });
    case SET_VIEWBOX_LOCATION:
      return produce(state, draft => {
        draft.viewBox.x -= action.distance.x;
        draft.viewBox.y -= action.distance.y;
      });
    case TOGGLE_CONTEXT_MENU:
      return produce(state, draft => {
        if (action.event.button === 0) draft.contextMenu.mode = null;
        else if (action.event.button === 2)
          draft.contextMenu.mode =
            action.event.target.className.baseVal &&
            action.event.target.className.baseVal;
      });
    case TOGGLE_STYLE_MENU:
      return produce(state, draft => {
        draft.contextMenu.mode = 'style';
      });
    default:
      return state;
  }
}
