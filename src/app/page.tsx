"use client";
import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Results from "./components/Results";

function App() {
  const [value, setValue] = useState(null);

  const calculateValue = (formData) => {
    const { currencyRate, amount, paymentPeriod, dueDate, transactionDate } =
      formData;

    // 计算剩余天数
    const due = new Date(dueDate);
    const transaction = new Date(transactionDate);
    const remainingDays = Math.max(
      Math.floor((due - transaction) / (1000 * 60 * 60 * 24)),
      0
    ); // 天数差

    // 计算剩余价值
    const remainingValue =
      (currencyRate * amount * remainingDays) / paymentPeriod;

    // 总价（续费价格 * 汇率）
    const totalAmount = amount * currencyRate;

    // 更新状态
    setValue({
      currencyRate,
      amount,
      paymentPeriod,
      dueDate,
      transactionDate,
      remainingDays,
      remainingValue,
      totalAmount,
    });
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <Form onCalculate={calculateValue} />
        {value && <Results value={value} />}
      </div>
    </div>
  );
}

export default App;
