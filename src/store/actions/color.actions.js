import { colorConstant } from "../constant/color.constants";

export const setColors = (primaryColor, secondaryColor) => dispatch => {
  dispatch({
    type: colorConstant.SET_COLORS,
    payload: {
      primaryColor,
      secondaryColor
    }
  });
};
