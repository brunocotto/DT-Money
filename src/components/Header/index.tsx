import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import * as Dialog from '@radix-ui/react-dialog';
import logoImg from "../../assets/Logo.svg";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root>
          {/* asChild => Trigger é um button, então dizemos para utilizar o button do NewTransactionButton*/}
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>
          
          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}