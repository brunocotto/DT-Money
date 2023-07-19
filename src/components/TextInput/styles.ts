import { styled } from "styled-components";
import { Slot } from '@radix-ui/react-slot';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    height: 3rem;
    padding: 1rem;
    border-radius: 0.25rem;
    background-color: ${props => props.theme.colors.gray[800]};
    width: 100%;

  &:focus-within {
    box-shadow: 0 0 0 0.125rem ${props => props.theme["green-500"]};
  }
`;

export const SlotComponent = styled(Slot)`
    width: 1.5rem;
    height: 1.5rem;
    color: ${props => props.theme.colors.gray[400]};
`;

export const InputComponent = styled.input`
  border: 1px solid transparent;
  color: ${props => props.theme.colors.gray[100]};
  font-family: ${props => props.theme.extend.fontFamily.sans};
  background-color: ${props => props.theme.colors.transparent};
  flex: 1;
  outline: none;
  font-size: ${props => props.theme.fontSize.sm}px;

  ::placeholder {
      color: ${props => props.theme.colors.gray[400]};
  }

  &:focus-within {
    box-shadow: 0 0 0 0.125rem ${props => props.theme.colors.transparent};
  }
`;