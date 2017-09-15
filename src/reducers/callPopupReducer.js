export const callPopupSubscribe = (state = {}, action) => {
  switch(action.type) {
    case 'CALL_POPUP':
      return {
        ...state,
        fields: action.info
      };
    default:
      return state;
  }
}