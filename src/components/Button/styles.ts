import { styled } from "styled-components";

export const ButtonComponent = styled.button`
    margin-top: 1rem;
    border: ${props => props.theme.colors.transparent};
    font-family: ${props => props.theme.extend.fontFamily.sans};
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    padding-left: 1rem;
    padding-right: 1rem;
    background-color: ${props => props.theme["green-500"]};
    border-radius: 0.25rem;
    font-weight: 600;
    color: ${props => props.theme.colors.black};
    font-size: 0.875rem;
    width: 100%;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
    background-color: ${props => props.theme["green-300"]};
    }
`;