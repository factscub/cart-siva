import { useState } from "react";
import { useCart } from "react-use-cart";
import cart from "../../assets/cart.png";
import styled from "styled-components";

const Buy = ({ product }: any) => {
  const [quantity, setQuantity] = useState(1);
  const { inCart, addItem, removeItem, updateItemQuantity, items } = useCart();
  return (
    <Wrapper>
      <InputNumber
        type="number"
        min={1}
        value={
          inCart(product.id)
            ? items.find((item) => item.id === product.id)?.quantity
            : quantity
        }
        onChange={(e) => {
          const quantity = !!e.target.value ? parseInt(e.target.value) : 1;
          setQuantity(quantity);
          if (inCart(product.id)) {
            updateItemQuantity(product.id, quantity);
          }
        }}
      />
      <Image>
        <img src={cart} alt="buy" />
      </Image>
      <InputCheckBox
        type="checkbox"
        value={product.id}
        checked={inCart(product.id)}
        onChange={(e) => {
          if (e.target.checked) {
            addItem(product, quantity);
          } else {
            removeItem(product.id);
          }
        }}
      />
    </Wrapper>
  );
};
export default Buy;

const Wrapper = styled.div`
  display: flex;
  height: 25px;
  background: rgb(233, 229, 229);
  padding: 10px 15px;
  border-radius: 5px;
`;
const Image = styled.span`
  display: inline-flex;
  width: 30px;
  align-items: center;
  margin: 0 10px;
  justify-content: center;
  img {
    max-height: 80%;
  }
`;
const InputNumber = styled.input`
  border-radius: 5px;
  border: none;
  width: 50px;

  &:focus {
    outline: none;
  }
`;

const InputCheckBox = styled.input`
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: grey;
  border: 0.15em solid grey;
  border-radius: 5px;

  width: 25px;
  display: grid;
  place-content: center;
  &::before {
    content: "";
    width: 15px;
    height: 15px;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em grey;
    background-color: grey;
  }
  &:checked::before {
    transform: scale(1);
  }
  &:focus {
    outline: max(2px, 0.15em) solid grey;
    outline-offset: max(2px, 0.15em);
  }
`;
