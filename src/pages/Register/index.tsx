import { Button } from "../../components/Button";
import { Link } from "../../components/Link";
import { Text } from "../../components/Text";
import { TextInput } from "../../components/TextInput";
import { Envelope, Lock, User, Phone } from "phosphor-react";
import { ErrorMessage, Footer, FormContainer, Header, RegisterContainer, RegisterContent } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "../../lib/axios";
import { Logo } from "../../components/Logo";

// validação do formulário
const createUserFormSchema = z.object({
    name: z.string()
        .nonempty("O nome é obrigatório.")
        .transform(name => {
            return name.trim().split(' ').map(word => {
                return  word[0].toLocaleUpperCase().concat(word.substring(1))
            }).join(' ')
        }),
    email: z.string()
        .nonempty('O e-mail é obrigatório.')
        .email('Formato de e-mail inválido.')
        .toLowerCase(),
    phone: z.string()
        .nonempty('O telefone é obrigatório.')
        .regex(/^\(\d{2}\) \d{9}$/, 'Formato de telefone inválido. Ex: (XX) XXXXXXXXX'),
    password: z.string()
        .min(6, 'A senha precisa de no mínimo 6 caracteres.'),
    confirm_password: z.string()
        .min(6, 'A senha precisa de no mínimo 6 caracteres.')
})
.refine((data) => data.password === data.confirm_password, {
    message: "As senhas precisam ser iguais.",
    path: ["confirm_password"], // path of error
})

// tipagem do UseForm()
type CreateUserFormData = z.infer<typeof createUserFormSchema>

export function Register() {

    const { 
        handleSubmit,
        register, 
        formState,
        reset,
    } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
    })
    
    const { errors, isSubmitting } = formState;

    async function createUser(data: CreateUserFormData) {
        // Remover o campo 'confirm_password' dos dados antes de definir o estado
        const { confirm_password, ...formData } = data;
        try {
            await api.post("/users", formData)

            reset()  
          } catch (error) {
            console.error("Erro ao enviar os dados:", error);
          }
    }

    return (
        <RegisterContainer>
            <RegisterContent>
                <Logo />
                <Header>
                    <Text size="lg" color="white"> 
                    Crie sua conta
                    </Text>
                </Header>

                <FormContainer
                    onSubmit={handleSubmit(createUser)}
                >
                    <TextInput.Root>
                        <TextInput.Icon>
                            <User />
                        </TextInput.Icon>
                  
                        <TextInput.Input
                            type='text'
                            placeholder='Seu nome'
                            {...register('name')}
                        />
                    </TextInput.Root>
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}  

                    <TextInput.Root>
                        <TextInput.Icon>
                            <Envelope />
                        </TextInput.Icon>
                        <TextInput.Input
                            type='email'
                            placeholder='Seu email'
                            {...register('email')}
                        />
                    </TextInput.Root>
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                    <TextInput.Root>
                        <TextInput.Icon>
                            <Phone />
                        </TextInput.Icon>
                        <TextInput.Input
                            type="tel"
                            placeholder='Seu telefone'
                            {...register('phone')}
                        />
                    </TextInput.Root>
                    {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}  

                    <TextInput.Root>
                        <TextInput.Icon>
                            <Lock />
                        </TextInput.Icon>
                        <TextInput.Input
                            type='password'
                            placeholder='Sua senha'
                            {...register('password')}
                        />
                    </TextInput.Root>
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                    <TextInput.Root>
                        <TextInput.Icon>
                            <Lock />
                        </TextInput.Icon>
                        <TextInput.Input
                            type='password'
                            placeholder='Confirme sua senha'
                            {...register('confirm_password')}
                        />
                    </TextInput.Root>
                    {errors.confirm_password && <ErrorMessage>{errors.confirm_password.message}</ErrorMessage>}
                    
                    <Button 
                        type="submit"
                        disabled={isSubmitting}
                    >
                    Cadastrar
                    </Button>
                </FormContainer>
                <Footer> 
                    <Text asChild size="sm">
                        <Link to="/sessions">Retornar para tela de login</Link>
                    </Text>              
                </Footer>
            </RegisterContent>
        </RegisterContainer>
    )
}