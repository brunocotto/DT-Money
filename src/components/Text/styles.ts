import { css, styled } from "styled-components";
import { Slot } from '@radix-ui/react-slot';

export interface TextProps {
    size?: 'sm' | 'md' | 'lg';
    children?: React.ReactNode;
    color?: 'white' | 'gray';
    asChild?: boolean;
}

export const TextComponent = styled.span<TextProps>`
  color: ${props => props.theme.colors.gray[400]};
  font-family: ${props => props.theme.extend.fontFamily.sans};

  ${({ color }) => {
    if (color === 'white') {
      return css`
        color: ${props => props.theme.colors.white};
      `;
    }
    if (color === 'gray') {
      return css`
        color: ${props => props.theme.colors.gray[400]};
      `;
    }
  }};

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
  }};
`;

export const SlotComponent = styled(Slot)<TextProps>`
  color: ${props => props.theme.colors.gray[400]};
  font-family: ${props => props.theme.extend.fontFamily.sans};

  ${({ color }) => {
    if (color === 'white') {
      return css`
        color: ${props => props.theme.colors.white};
      `;
    }
    if (color === 'gray') {
      return css`
        color: ${props => props.theme.colors.gray[400]};
      `;
    }
  }};

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
  }};
`;