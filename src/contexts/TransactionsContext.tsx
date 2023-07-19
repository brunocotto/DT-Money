import { ReactNode } from "react";
// useCallback => Evita com que uma função seja recriada em memória
// se nenhuma informação tenha mudado
import { useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

/**
 * qualquer componente dentro da árvore de componentes envolvida pelo TransactionProvider 
 * pode acessar o contexto TransactionContext e obter acesso às transações através da propriedade transactions.
**/

interface Transaction {
  id: string;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  created_at: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  // como não tem retorno nenhum, <void>
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
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
  const fetchTransactions = useCallback(
    async (query?: string) => {
      const response = await api.get('/transactions/history', {
        params: {
          _sort: 'created_at',
          _order: 'desc',
          q: query,
        },
      })
      setTransactions(response.data.transactions);
    },
    [],
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, category, price, type } = data;

      const res = await api.post('/transactions', {
        description,
        category,
        price,
        type,
      })

      setTransactions(state => [res.data.transaction, ...state]);
    },
    // array de dependênicias
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    console.log(transactions.map(transaction => {
      return transaction
    }))
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}