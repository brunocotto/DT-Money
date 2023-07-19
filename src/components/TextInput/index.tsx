import { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { InputComponent, SlotComponent, Wrapper } from './styles';

export interface TextInputRootProps {
    children: ReactNode
}

TextInputRoot.displayName = 'TextInput.Root'

function TextInputRoot(props: TextInputRootProps) {
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    )
}

export interface TextInputProps {
    children: ReactNode
}

TextInputIcon.displayName = 'TextInput.Icon'

function TextInputIcon(props: TextInputProps) {
    return (
        <SlotComponent>
            {props.children}
        </SlotComponent>
    )
}

export type TextInputInputProps = InputHTMLAttributes<HTMLInputElement>

const TextInputInput = forwardRef<HTMLInputElement, TextInputInputProps>(
    (props, ref) => {
      return <InputComponent {...props} ref={ref} />;
    }
);

TextInputInput.displayName = 'TextInput.Input'

export const TextInput = {
    Root: TextInputRoot,
    Input: TextInputInput,
    Icon: TextInputIcon,
}