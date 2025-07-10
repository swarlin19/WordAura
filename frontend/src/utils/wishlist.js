// utils/wishlist.js

export const getWishlist = () => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (item) => {
  const wishlist = getWishlist();
  const exists = wishlist.find((i) => i.id === item.id);
  if (!exists) {
    wishlist.push(item);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const removeFromWishlist = (id) => {
  const wishlist = getWishlist().filter((item) => item.id !== id);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
