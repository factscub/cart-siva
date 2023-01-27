import { useMemo } from "react";
import { useCart } from "react-use-cart";
import styled from "styled-components";
import Table from "../../components/Table";
import { cartTable } from "../../constant/columns";
import { Link } from "react-router-dom";

const Cart = () => {
  const columns = useMemo(cartTable, [cartTable]);
  const { items, removeItem, updateItemQuantity, cartTotal, totalItems } =
    useCart();

  const updateQuantity = (item: any, v: number) => {
    const value: number = item.quantity + v;
    if (v === -1) {
      updateItemQuantity(item.id, value);
    } else if (v === 1) {
      updateItemQuantity(item.id, value);
    }
  };
  return (
    <Wrapper>
      {!!items.length && (
        <Table columns={columns}>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>
                  <Button onClick={() => removeItem(item.id)}>X</Button>
                </td>
                <td>
                  <Image>
                    <img src={item.thumbnail} alt="img" />
                  </Image>
                </td>
                <td
                  className="title"
                  style={{ fontWeight: 700, textAlign: "left" }}
                >
                  {item.title}
                </td>
                <td>${item.price}</td>
                <td>
                  <ButtonsWrapper>
                    <Button onClick={() => updateQuantity(item, -1)}>-</Button>
                    <Button>{item.quantity}</Button>
                    <Button onClick={() => updateQuantity(item, 1)}>+</Button>
                  </ButtonsWrapper>
                </td>
                <td style={{ color: "rgb(71, 73, 221)", fontWeight: 700 }}>
                  ${item.itemTotal}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <CartSummary style={{ flex: totalItems > 0 ? 0.7 : 0.3 }}>
        <CartHeading>Cart totals</CartHeading>
        <SubTotalContainer>
          <span>subtotal</span>
          <span className="price">${cartTotal}</span>
        </SubTotalContainer>
        <TotalContainer>
          <span>Total</span>
          <span className="price">${cartTotal}</span>
        </TotalContainer>
        <CartButton>
          <Link to={"/thankyou"}>proceed to checkout</Link>
        </CartButton>
      </CartSummary>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px 10px;
  justify-content: center;
  align-items: start;
`;
const ButtonsWrapper = styled.div`
  border-radius: 20px;
  border: 1px solid grey;
  padding: 10px;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  &:nth-child(2) {
    cursor: default;
    min-width: 40px;
  }
`;

const CartSummary = styled.div`
  border: 1px solid grey;
  position: sticky;
  top: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  margin-left: 20px;
`;
const CartHeading = styled.p`
  font-size: 20px;
`;

const dummyDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 13px;
`;
const TotalContainer = styled(dummyDiv)`
  border: none;
  font-weight: 600;
`;

const SubTotalContainer = styled(dummyDiv)`
  border-bottom: 1px solid grey;
`;

const CartButton = styled.p`
  text-align: center;
  padding: 15px 20px;
  background: rgb(71, 73, 221);
  margin-top: 10px;
  font-size: 12px;
  border-radius: 20px;
  font-weight: 700;
  a {
    text-transform: uppercase;
  }
`;
const Image = styled.span`
  img {
    max-width: 100px;
    max-height: 60px;
    border-radius: 5px;
  }
`;
