import { ADD_TO_NOTICE, SET_NOTICE, REMOVE_FROM_NOTICE } from "./Constans";

const initialState = [];

const NoticeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_NOTICE:
      const isExist = state.filter(
        (noticeItem) => noticeItem._id === payload._id
      ).length;
      let newNotice = [];
      if (isExist) {
        newNotice = state.map((noticeItem) => {
          if (noticeItem._id === payload._id)
            return { ...noticeItem, qty: noticeItem.qty + 1 };
          return noticeItem;
        });
      } else {
        newNotice = [...state, payload];
      }

      localStorage.setItem("notice", JSON.stringify(newNotice));
      return newNotice;

    case REMOVE_FROM_NOTICE:
      const notices = state
        .map((noticeItem) => {
          if (noticeItem._id === payload._id) {
            return { ...noticeItem, qty: noticeItem.qty - 1 };
          }
          return noticeItem;
        })
        .filter((noticeItem) => noticeItem.qty > 0);
      localStorage.setItem("notice", JSON.stringify(notices));
      return notices;
    case SET_NOTICE:
      const newPayload = payload?.map(item => ({
        ...item,
        qty: item.qty?item.qty:1
      }))
      console.log(newPayload)
      return newPayload;
    default:
      return state;
  }
};
export default NoticeReducer;
