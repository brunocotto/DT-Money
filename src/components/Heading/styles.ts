import { css, styled } from "styled-components";

export interface HeadingProps {
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const HeadingComponent = styled.h2<HeadingProps>`
  color: #ffffff;
  font-weight: bold;
  font-family: sans-serif;

  ${({ size }) => {
    if (size === 'sm') {
      return css`
        font-size: ${props => props.theme.fontSize.sm}px;
      `;
    }
    if (size === 'md') {
      return css`
        font-size: ${props => props.theme.fontSize.md}px;
      `;
    }
    if (size === 'lg') {
      return css`
        font-size: ${props => props.theme.fontSize.lg}px;
      `;
    }
  }}
`;
