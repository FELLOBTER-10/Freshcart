import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export function WishListContextPorvider({ children }) {
  let [whislist, setWhishlist] = useState([]);

  function postWishListProudect(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    let body = {
      productId: id,
    };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      body,
      option
    );
  }

  async function getMyWishList(token) {
    let option = {
      headers: {
        token,
      },
    };
    try {
      let req = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        option
      );
      setWhishlist(req.data.data)
    } catch (Error) {
      console.log(Error);
    }

  }

  function DeletItemWhishList(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      option
    );
  }

  return (
    <WishListContext.Provider
      value={{
        postWishListProudect,
        getMyWishList,
        DeletItemWhishList,
        whislist,
        setWhishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
