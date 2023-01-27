import { useState, useEffect } from "react";
import styled from "styled-components";

const DropDown = ({ options, onChange, placeholder, disabled }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [placeholder]);

  return (
    <Select>
      <OptionBtn onClick={(e) => setIsOpen(true)} disabled={disabled}>
        {placeholder} {isOpen ? <>&#9650;</> : <>&#9660;</>}
      </OptionBtn>
      {isOpen && (
        <Options>
          {[...options].map((option: any, i: number) => (
            <Option
              key={i}
              onClick={(e) => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </Option>
          ))}
        </Options>
      )}
    </Select>
  );
};

export default DropDown;

const Select = styled.div`
  border: 2px solid grey;
  margin-right: 10px;
  outline: none;
  border-radius: 5px;
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
`;

const OptionBtn = styled.button`
  flex: auto;
  border: none;
  cursor: pointer;
  background: inherit;
  border-radius: inherit;
  padding: 5px 10px;
`;
const Options = styled.div`
  position: absolute;
  top: 35px;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 34;
  border-radius: 5px;
  border: 2px solid grey;
  background: white;
`;

const Option = styled.button`
  text-align: center;
  border: none;
  cursor: pointer;
  &:last-child {
    border-radius: inherit;
    margin-bottom: 5px;
  }
  margin-top: 5px;
  padding: 5px 10px;
`;
