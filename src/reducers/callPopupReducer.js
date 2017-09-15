export const callPopupSubscribe = (state = {data:{info:[]}}, action) => {
  switch(action.type) {
    case 'CALL_POPUP':
      return {
        data: {info: action.info }
      };
    default:
      return state;
  }
}