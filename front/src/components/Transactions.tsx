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

const Transactions = (props: { userData: PropsUserData; userTransactions: PropsTransactions[] }) => {
  const transactionsItems = props.userTransactions.map((item) => {
    return (
      <tr key={item.id}>
        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
        <td>{item?.debited?.User[0].username ? item.debited.User[0].username : props.userData.username}</td>
        <td>{item?.credited?.User[0].username ? item.credited.User[0].username : props.userData.username}</td>
        <td
          className={`${style.value} ${
            item?.credited?.User && item?.credited?.User[0].username !== props.userData.username
              ? style.debit
              : style.credit
          }`}
        >
          <span>R$</span>{" "}
          <span>
            {item.debited?.User && item.debited?.User[0].username !== props.userData.username
              ? item.value
              : `-${item.value}`}
          </span>
        </td>
      </tr>
    );
  });

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
