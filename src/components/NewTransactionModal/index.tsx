import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";
import * as z from "zod"
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {

  const { 
    control,
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 4000))

    console.log(data);
  }
    
  return (
  // Portal =>  Capacidade de renderizar um elemento filho em outro lugar na DOM*/}
  <Dialog.Portal>
    <Overlay />

    <Content>
      <Dialog.Title>Nova Transação</Dialog.Title>

      <CloseButton>
        <X size={24}/>
      </CloseButton>

      <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <input 
          type='text' 
          placeholder='Descrição' 
          required
          {...register('description')} 
        />
        <input 
          type='number' 
          placeholder='Preço' 
          required
          {...register('price', { valueAsNumber: true})} 
        />
        
        <input 
          type='text' 
          placeholder='Categoria' 
          required
          {...register('category')} 
        />

        <Controller 
          control={control}
          name='type'
          render={({ field }) => {
            // {field: {…}, formState: {…}, fieldState: {…}}
            // console.log(props)

            return (
              // radioGroup Radix
              <TransactionType onValueChange={field.onChange} value={field.value}>
                <TransactionTypeButton variant='income' value="income">
                  <ArrowCircleUp size={24}/>
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton variant='outcome' value='outcome'>
                  <ArrowCircleDown size={24}/>
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )
          }}
        />

        <button type='submit' disabled={isSubmitting}>
          Cadastrar
        </button>
      </form>
    </Content>
  </Dialog.Portal>
  )
}