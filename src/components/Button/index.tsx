import { ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonComponent } from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}


export function Button({ children, ...props }: ButtonProps) {

    return (
        <ButtonComponent {...props}>
            {children}
        </ButtonComponent>
    )
}