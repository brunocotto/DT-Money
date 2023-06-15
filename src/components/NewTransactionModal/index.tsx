import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { X, ArrowCircleUp, ArrowCircleDown } from "phosphor-react";
import * as z from "zod"
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  // use-context-selector => API para buscar no contexto apenas o que irei utilizar, performance
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction;
  })

  const { 
    control,
    register, 
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, category, price, type } = data;

    //função createTransaction criada no contexto
    await createTransaction({
      description,
      category,
      price,
      type,
    })
    // resetando o form após o envio, função do hook useForm()
    reset()
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