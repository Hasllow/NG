import style from "./Transactions.module.css";

interface PropsTransactions {
  createdAt: string;
  credited: { User: { username: string }[] };
  debited: { User: { username: string }[] };
  value: string;
  id: string;
}

export interface PropsUserData {
  username: string;
  account: { balance: string };
}

const transactionsItemsList = (transactions: PropsTransactions[], userData: PropsUserData) => {
  const listItems = transactions.map((transaction) => {
    return (
      <tr key={transaction.id}>
        <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
        <td>{transaction?.debited?.User[0].username ? transaction.debited.User[0].username : userData.username}</td>
        <td>{transaction?.credited?.User[0].username ? transaction.credited.User[0].username : userData.username}</td>
        <td
          className={`${style.value} ${
            transaction?.credited?.User && transaction?.credited?.User[0].username !== userData.username
              ? style.debit
              : style.credit
          }`}
        >
          <span>R$</span>{" "}
          <span>
            {transaction.debited?.User && transaction.debited?.User[0].username !== userData.username
              ? transaction.value
              : `-${transaction.value}`}
          </span>
        </td>
      </tr>
    );
  });

  return listItems;
};

const Transactions = (props: { userData: PropsUserData; userTransactions: PropsTransactions[] }) => {
  const { userData, userTransactions } = props;
  const transactionsItems = transactionsItemsList(userTransactions, userData);

  return (
    <div className={style.transactions}>
      <table>
        <thead>
          <tr>
            <td>data</td>
            <td>origem</td>
            <td>destino</td>
            <td>valor</td>
          </tr>
        </thead>
        <tbody>{transactionsItems}</tbody>
      </table>
    </div>
  );
};

export default Transactions;
