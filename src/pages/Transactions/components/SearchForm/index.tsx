import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

// é uma função para utilizada em componentes para conseguir
// memorizar o componente
import { memo } from "react";

/**
 * Por quê um componente renderiza?
 * - Hooks changed (mudou estado, contexto, reducer);
 * - Props changed (mudou propriedades);
 * - Parent rerendered (componente pai renderizou)
 * 
 * Qual o fluxo de renderização?
 * 1. O react recria o HTML da interface do componente na virtual DOM;
 * 2. Compara a versão do HTML recriada com a versão anterior;
 * 3. Se mudou alguma coisa, ele reescreve o HTML na tela;
 * 
 * Memo:
 * Adiciona um "passo" a mais no fluxo de renderização "passo 0";
 * 0. Hooks changed, Props changed? (deep comparison);
 * 0.1 Compara com a versão anterior dos hooks e props;
 * 0.2 Se mudou algo, ele permite a nova renderização;
**/

const searchFormSchema = z.object({
  query: z.string(),
})

type searchFormInputs = z.infer<typeof searchFormSchema>

  function SearchFormComponent() {
  // via contexto, consegui acessar a função fetchTransactions
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions;
  })

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<searchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: searchFormInputs){
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}> 
      <input 
        type="text" 
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
      </button>
    </SearchFormContainer>
  )
}
// utilizando o memo
// utilizar apenas em HTML grandes, pois o teste do memo pode ser mais lento
// do que uma possível recriação de todo HTML de um tamanho razoável
export const SearchForm = memo(SearchFormComponent);