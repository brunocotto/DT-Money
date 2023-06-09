import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {

  interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string
  }
  // useState<Transaction[]> => armazena uma lista de transactions
  const [transactions, setTransactions] = useState<Transaction[]>([])

  //useEffect() não suporta funções assíncronas
  async function loadTransactions() {
    const res = await fetch('http://localhost:3000/transactions');
    const data = await res.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions()
  }, [])

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
              </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}