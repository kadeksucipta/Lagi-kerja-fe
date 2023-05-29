import { ADD_TO_NOTICE, REMOVE_FROM_NOTICE, SET_NOTICE } from "./Constans";

export const addToNotice = (payload) => {
  return { type: ADD_TO_NOTICE, payload };
};
export const removeFromNotice = (payload) => {
  return { type: REMOVE_FROM_NOTICE, payload };
};
export const setNotice = (payload) => {
  return { type: SET_NOTICE, payload };
};

// export const fetchAPI = () => (dispatch) => {
//   const token = localStorage.getItem("token");
//   const userData = localStorage.getItem("userData");
//   fetch(`http://localhost:8000/api/carts`, {
//     method: "PUT",
//     body: JSON.stringify({
//       user: JSON.parse(userData),
//       items: cart,
//     }),

//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   })
//     .then((result) => {
//       const payload = result.map((item) => ({
//         _id: item.product._id,
//         name: item.name,
//         price: item.price,
//         image_url: item.image_url,
//         qty: item.qty,
//       }));
//       dispatch(setCart(payload));
//       localStorage.setItem("cart", JSON.stringify(payload));
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
