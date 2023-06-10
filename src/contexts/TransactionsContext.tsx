import { ReactNode, createContext } from "react";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

/**
 * qualquer componente dentro da árvore de componentes envolvida pelo TransactionProvider 
 * pode acessar o contexto TransactionContext e obter acesso às transações através da propriedade transactions.
**/

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  // como não tem retorno nenhum, <void>
  fetchTransactions: (query?: string) => Promise<void>;
}

interface TransactionProviderProps {
  children: ReactNode;
}

// exportando contexto
export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionProvider({ children }: TransactionProviderProps) {

  // useState<Transaction[]> => armazena uma lista de transactions
  const [transactions, setTransactions] = useState<Transaction[]>([])

  //useEffect() não suporta funções assíncronas
  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        q: query,
      }
    })

    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}