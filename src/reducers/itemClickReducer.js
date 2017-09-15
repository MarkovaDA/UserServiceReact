export const itemClickSubscribe = (state = {info:{id:1}}, action) => {
  switch(action.type) {
    case 'CLICK_ITEM':
      return {
        info: {id: action.id }
      };
    default:
      return state;
  }
}