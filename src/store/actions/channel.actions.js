import { channelConstant } from "../constants";

export const setCurrentChannel = channel => dispatch => {
    dispatch({
        type: channelConstant.SET_CURRENT_CHANNEL,
        payload: {
            currentChannel: channel
        }
    });
};

export const setPrivateChannel = isPrivateChannel => dispatch => {
    dispatch({
        type: channelConstant.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    })
}

export const setUserPosts = userPosts => dispatch => {
    dispatch({
        type: channelConstant.SET_USER_POSTS,
        payload: {
            userPosts
        }
    })
}