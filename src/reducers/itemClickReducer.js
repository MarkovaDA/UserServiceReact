export const itemClickSubscribe = (state = {id:1}, action) => {

  switch(action.type) {
    case 'CLICK_ITEM':
      return {
        ...state,
        id: action.id
      };
    default:
      return state;
  }
};