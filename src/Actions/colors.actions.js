import { colorsConstatns } from "../Constants";

export const setColors = (primaryColor, secondaryColor) => dispatch => {
  dispatch({
    type: colorsConstatns.SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor
    }
  });
};
