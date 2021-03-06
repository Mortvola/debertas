import React, { useState, useContext, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { Spinner } from 'react-bootstrap';
import Transaction from './Transaction';
import Amount from './Amount';
import MobxStore from './state/mobxStore';

type PropsType = {
  isMobile?: boolean;
}

const Register = ({
  isMobile,
}: PropsType): ReactElement => {
  const [selectedTransaction, setSelectedTransaction] = useState<number | null>(null);
  const {
    register: {
      categoryId,
      transactions,
      fetching,
      pending,
      balance,
    },
    categoryTree: {
      systemIds: {
        unassignedId,
      },
    },
  } = useContext(MobxStore);

  const handleClick = (transactionId: number) => {
    setSelectedTransaction(transactionId);
  };

  const renderTransactions = () => {
    if (fetching) {
      return (
        <div className="please-wait">
          <Spinner animation="border" />
        </div>
      );
    }

    let list: Array<ReactElement> | null = null;

    if (transactions) {
      let runningBalance = balance;
      list = transactions.map((transaction) => {
        let { amount } = transaction;

        if (categoryId !== null) {
          amount = transaction.getAmountForCategory(categoryId);
        }

        const selected = selectedTransaction === transaction.id;

        const element = (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            amount={amount}
            balance={runningBalance}
            selected={selected}
            categoryId={categoryId}
            unassignedId={unassignedId}
            isMobile={isMobile}
          />
        );

        if (runningBalance !== undefined) {
          runningBalance -= amount;
        }

        return element;
      });
    }

    return (
      <div className="transactions">
        {list}
      </div>
    );
  };

  const renderPendingTransactions = () => {
    if (pending) {
      return pending.map((transaction) => (
        <div key={transaction.id} className="pending-transaction striped">
          <div />
          <div>{transaction.date}</div>
          <div className="transaction-field">{transaction.name}</div>
          <Amount amount={transaction.amount} />
        </div>
      ));
    }

    return null;
  };

  const renderPending = () => {
    if (!fetching && pending.length > 0) {
      return (
        <div className="register">
          <div className="pending-register-title">
            Pending Transactions:
          </div>
          <div className="register-title pending-transaction">
            <div />
            <div>Date</div>
            <div>Name</div>
            <div className="currency">Amount</div>
            <div />
            <div />
          </div>
          <div className="transactions striped">
            {renderPendingTransactions()}
          </div>
        </div>
      );
    }

    return null;
  };

  const renderColumnTitles = () => {
    if (categoryId === null) {
      return (
        <div className="register-title acct-transaction">
          <div />
          <div>Date</div>
          <div>Name</div>
          <div>Category</div>
          <div className="currency">Amount</div>
          <div className="currency">Balance</div>
        </div>
      );
    }

    return (
      <div className="register-title transaction">
        <div />
        <div>Date</div>
        <div>Name</div>
        <div>Category</div>
        <div className="currency">Amount</div>
        <div className="currency">Balance</div>
        <div>Institution</div>
        <div>Account</div>
      </div>
    );
  };

  if (isMobile) {
    return renderTransactions();
  }

  return (
    <div className="register-with-pending">
      <div className="register">
        <div />
        {renderColumnTitles()}
        {renderTransactions()}
      </div>
      {renderPending()}
    </div>
  );
};

Register.defaultProps = {
  isMobile: false,
};

export default observer(Register);
