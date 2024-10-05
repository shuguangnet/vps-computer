import React, { useState } from "react";
import "./Form.css";
const Form = ({ onCalculate }) => {
  const [currencyRate, setCurrencyRate] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentPeriod, setPaymentPeriod] = useState("年付");
  const [dueDate, setDueDate] = useState("");
  const [transactionDate, setTransactionDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({
      currencyRate: parseFloat(currencyRate),
      amount: parseFloat(amount),
      paymentPeriod: paymentPeriod === "年付" ? 365 : 30,
      dueDate,
      transactionDate,
    });
  };

  return (
    <form className="vps-form" onSubmit={handleSubmit}>
      <div>
        <label>外币汇率</label>
        <input
          type="number"
          value={currencyRate}
          onChange={(e) => setCurrencyRate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>续费金额</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select>
          <option>美元 (USD)</option>
          {/* 可加入更多币种 */}
        </select>
      </div>
      <div>
        <label>付款周期</label>
        <select
          value={paymentPeriod}
          onChange={(e) => setPaymentPeriod(e.target.value)}
        >
          <option value="年付">年付</option>
          <option value="月付">月付</option>
        </select>
      </div>
      <div>
        <label>到期时间</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>交易日期</label>
        <input
          type="date"
          value={transactionDate}
          onChange={(e) => setTransactionDate(e.target.value)}
          required
        />
      </div>
      <button type="submit">计算剩余价值</button>
    </form>
  );
};

export default Form;
