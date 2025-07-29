import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #e0f7fa, #fdf2f8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
`;

const FormCard = styled.div`
  background: #fff0f6;
  padding: 2.5rem;
  border-radius: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #7a1f47;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  label {
    font-weight: 500;
    display: block;
    margin-bottom: 0.3rem;
  }
  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 14px;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background: #ffd6ec;
  color: #7a1f47;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: #f7add4;
  }
`;

const AddAddress = () => {
  const navigate = useNavigate();
  const user_email = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_email) return alert("Email not found.");

    try {
      const fullData = { ...formData, user_email };

      // ✅ Store this new address in localStorage
      localStorage.setItem("selected_address", JSON.stringify(fullData));

      // ✅ Save to backend
      await axios.post("http://http://13.60.49.86/:5000/api/save-address", fullData);

      alert("Address saved successfully!");
      navigate("/order"); // go back to order page
    } catch (err) {
      console.error(err);
      alert("Failed to save address.");
    }
  };

  return (
    <Container>
      <FormCard>
        <Title>🏠 Add New Delivery Address</Title>
        <form onSubmit={handleSubmit}>
          {["fullName", "phone", "address", "city", "zip"].map((field) => (
            <InputGroup key={field}>
              <label>{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </InputGroup>
          ))}
          <Button type="submit">Save Address</Button>
        </form>
      </FormCard>
    </Container>
  );
};

export default AddAddress;