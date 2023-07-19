import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const LinkComponent = styled(Link)`
  color: ${props => props.theme.colors.gray[400]};
  text-decoration: underline;
  transition: color 0.3s ease;
  font-family: ${props => props.theme.extend.fontFamily.sans};

  &:hover {
    color: ${props => props.theme.colors.gray[200]};
  }
`;