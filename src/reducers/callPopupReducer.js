export const callPopupSubscribe = (state = {}, action) => {
  switch(action.type) {
    case 'CALL_POPUP':
      return {
        ...state,
        fields: action.userInfo
      };
    default:
      return state;
  }
}