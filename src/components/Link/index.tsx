import { ReactNode } from 'react';
import { LinkComponent } from "./styles";

interface LinkProps {
    to: string,
    children: ReactNode
}

export function Link({ to, children}: LinkProps) {
    return (
        <LinkComponent to={to}>{children}</LinkComponent>
    )
}