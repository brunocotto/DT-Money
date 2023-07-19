import { Text } from "../../components/Text";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
}

export function Profile() {

  return (
    <Text>rota de perfil do usuário</Text>
  )
}