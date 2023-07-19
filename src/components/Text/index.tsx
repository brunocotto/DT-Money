import { SlotComponent, TextComponent, TextProps } from "./styles";

export function Text({ size, children, color = 'gray', asChild }:TextProps) {

    return (
      <div>
        {asChild ?
          <SlotComponent size={size} color={color}>
            {children}
          </SlotComponent> :
          <TextComponent size={size} color={color}>
            {children}
          </TextComponent>
        }
      </div>
    )
}