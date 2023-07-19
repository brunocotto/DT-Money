import { TransactionsContext } from "../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

// memorizar uma variável ao invés de um componente inteiro como o memo.
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });

  // useMemo() => variável summary só vai ser recriada quando transactions mudar 
  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }
  
        return acc;
      },
      { 
        income: 0, 
        outcome: 0, 
        total: 0 
      }
    )
  },[transactions])

  return summary
}