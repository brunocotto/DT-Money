import { Logo } from "../../components/Logo";
import { Footer, FormContainer, Header, Label, LoginContainer, LoginContent } from "./styles";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import { Envelope, Lock } from "phosphor-react";
import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessageLogin } from "../../components/ErrorMessageLogin";
import { useAuth } from "../../contexts/AuthProvider/useAuth";
import { ErrorMessage } from "../Register/styles";

// validação do formulário
const createAuthFormSchema = z.object({
    email: z.string()
        .email('Formato de e-mail inválido.')
        .nonempty('E-mail é obrigatório.')
        .toLowerCase(),
    password: z.string()
        .nonempty('Senha é obrigatória.'),
})

// tipagem do UseForm()
type CreateAuthFormData = z.infer<typeof createAuthFormSchema>

export function Login() {
    const { 
        handleSubmit,
        register,
        formState,
    } = useForm<CreateAuthFormData>({
        resolver: zodResolver(createAuthFormSchema),
    })

    const auth = useAuth()
    const navigate = useNavigate()
    const { errors, isSubmitting } = formState;
    const [errorMessage, setErrorMessage] = useState('');

    async function authUser(data: CreateAuthFormData) {
        try {
            // hook de autenticação
            await auth.authenticate(data.email, data.password)

            navigate('/transactions/history');
      
          } catch (error) {
            console.error('Invalid email or password.');
            setErrorMessage('E-mail ou senha inválidos.');
          }
    }

    return (
        <LoginContainer>
            {errorMessage && <ErrorMessageLogin message={errorMessage} />}
            <LoginContent>
                <Header>
                    <Logo />

                    <Heading size="lg">
                        DT Money
                    </Heading>

                    <Text size="lg" color="gray"> 
                    Faça login para acessar a plataforma.
                    </Text>
                </Header>

                <FormContainer
                    onSubmit={handleSubmit(authUser)}
                >
                    <Label htmlFor='email'/>
                    <Text size="sm" color="white">Seu email</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                            <Envelope />
                        </TextInput.Icon>
                        <TextInput.Input
                            type='email'
                            placeholder='johndoe@example.com'
                            {...register('email')}
                        />
                    </TextInput.Root>
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                    <Label htmlFor='password'/>
                    <Text size="sm" color="white">Sua senha</Text>
                    <TextInput.Root>
                        <TextInput.Icon>
                            <Lock />
                        </TextInput.Icon>
                        <TextInput.Input
                            type='password'
                            placeholder='***********'
                            {...register('password')}
                        />
                    </TextInput.Root>
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                    >
                        Entrar na plataforma
                    </Button>
                </FormContainer>

                <Footer> 
                    <Text asChild size="sm">
                        <Link to="/forgot_password">Esqueceu sua senha?</Link>
                    </Text>
                    <Text asChild size="sm">
                        <Link to="/users">Não pussui uma conta? Registre-se</Link>
                    </Text>                
                </Footer>
            </LoginContent>
        </LoginContainer>
    )
}