// src/components/AddToWishlistButton.jsx
import React from 'react';
import styled from 'styled-components';
import { Heart } from 'lucide-react';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #d45c9c;
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-top: 8px;

  &:hover {
    color: #e03e89;
  }

  svg {
    margin-right: 6px;
  }
`;

const AddToWishlistButton = ({ item }) => {
  const handleAdd = () => {
    const stored = JSON.parse(localStorage.getItem('wishlist')) || [];

    const alreadyAdded = stored.find(i => i.id === item.id);
    if (!alreadyAdded) {
      const updated = [...stored, item];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      alert(`${item.title} added to wishlist!`);
    } else {
      alert(`${item.title} is already in wishlist.`);
    }
  };

  return (
    <Button onClick={handleAdd}>
      <Heart size={18} /> Add to Wishlist
    </Button>
  );
};

export default AddToWishlistButton;