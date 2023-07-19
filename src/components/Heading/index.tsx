import { HeadingComponent, HeadingProps } from "./styles";

export function Heading({ size, children}: HeadingProps) {

    return (
      <HeadingComponent size={size}>
        {children}
      </HeadingComponent>
    )
}