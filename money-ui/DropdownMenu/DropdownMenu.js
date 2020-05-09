import React, {useState} from "react";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/all";

import { Color } from "../../styles";

const DropdownMenu = (props) => {
    const hasValue = props.value !== undefined && props.value !== null;
    const [value, setValue] = useState(hasValue ? value : "placeholder");

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        props.onChange && props.onChange(newValue);
    };

    return (
        <Container>
            <Select
                value={value}
                {...props}
                onChange={handleChange}
            >
                <option
                    value="placeholder"
                    disabled={true}
                >
                    {props.placeholder || "Select"}
                </option>
                {props.options && props.options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </Select>
            <DownArrow/>
        </Container>
    );
};

const Container = styled.div`
  position: relative;
`;

const Select = styled.select`
  height: 35px;
  width: ${(props) => props.fullWidth ? "100%" : `${props.width || 300}px`};
  font-size: 16px;
  background: ${Color.White};
  color: ${(props) => props.value !== "placeholder" ? Color.ShipGrey : Color.SilverChalice};
  border: none;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 3px 5px ${Color.Alto};
  box-sizing: border-box;
  outline: none;
  -webkit-appearance: none;
  
  &:focus {
    box-shadow: 0 0 5px 3px ${Color.Portage};
  }
`;

const DownArrow = styled(IoIosArrowDown)`
  position: absolute;
  top: 8px;
  right: 11px;
  color: ${Color.ShipGrey};
  pointer-events: none;
`;

export default DropdownMenu;
