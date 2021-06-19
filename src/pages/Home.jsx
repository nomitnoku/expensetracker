import React, { useState } from 'react';

const isValidInput = (value) => {
  const regex = new RegExp('^[0-9]{0,7}([.][0-9]{0,2})?$');
  if (value.toString().match(regex) || value === '') {
    return true;
  }
  return false;
};

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [input, setInput] = useState('');
  const [trans, setTrans] = useState([]);
  const [errors, setErrors] = useState({});

  const updateBalance = (type) => {
    const amount = Number(input);
    setErrors({});
    setInput('');
    setBalance(
      type === 'Add'
        ? balance + amount
        : balance - amount,
    );
    setTrans([
      ...trans,
      {
        type,
        amount,
        createdOn: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div
      id="home"
    >
      <h2>
        Expense Tracker - Basic
      </h2>
      <div
        className="container-1"
      >
        <h3
          className="balance"
        >
          {`Balance : ${balance}`}
        </h3>
        <input
          value={input}
          onChange={(e) => {
            const { value } = e.target;
            if (isValidInput(value)) {
              setErrors({});
              setInput(value);
            }
          }}
          className="form-input"
        />
        <div>
          <button
            type="button"
            onClick={() => updateBalance('Add')}
            disabled={!input}
            className="add"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              const number = Number(input);
              if (number > balance) {
                setErrors({
                  remove: 'Entered deduction amount is greater than balance',
                });
              } else {
                updateBalance('Remove');
              }
            }}
            disabled={!input}
            className="remove"
          >
            Remove
          </button>
        </div>
        {
          !!errors.remove
          && (
            <h5
              className="error-text"
            >
              {errors.remove}
            </h5>
          )
        }
      </div>
      <div
        className="divider"
      />
      <div
        className="container-2"
      >
        <h3>
          Transactions
        </h3>
        <div
          className="container-3"
        >
          {
              trans.map((item, index) => (
                <h5
                  key={index.toString()}
                  className="transaction"
                >
                  {`${item.createdOn} - ${item.type} - ${
                    item.amount}`}
                </h5>
              ))
            }
        </div>
      </div>
    </div>
  );
};

export default Home;
