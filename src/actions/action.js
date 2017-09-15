
export const ItemClickAction = (id) => {
  return {
    type: 'CLICK_ITEM',
    id: id
  }
};

export const CallPopupAction = (userInfo) => {
  return {
    type: 'CALL_POPUP',
    info: userInfo
  }
};
