import { colorConstant } from "../constant";

const initialState = {
    primaryColor: "#4c3c4c",
    secondaryColor: "#eee"
};

export const colorsReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case colorConstant.SET_COLORS:
            return {
                primaryColor: payload.primaryColor,
                secondaryColor: payload.secondaryColor
            };
        default: {
            return state;
        }
    }
};
