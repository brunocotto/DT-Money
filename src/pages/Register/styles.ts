import { styled } from "styled-components";

export const RegisterContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.colors.gray[900]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RegisterContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 1120px;
`;

export const Header = styled.header`
  display: flex;
`;

export const FormContainer = styled.form`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 400px;
  margin-top: 10px;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

export const PreCom = styled.pre`
  color: ${props => props.theme.colors.white};
`;

export const ErrorMessage = styled.span`
  color: ${props => props.theme.colors.red};
  font-family: ${props => props.theme.extend.fontFamily.sans};
  font-size: ${props => props.theme.fontSize.xs}px;
`;