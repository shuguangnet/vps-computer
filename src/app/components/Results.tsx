import React, { useRef } from "react";
import { toPng } from "html-to-image";

const Results = ({ value }) => {
  const {
    currencyRate,
    amount,
    paymentPeriod,
    remainingDays,
    remainingValue,
    dueDate,
    transactionDate,
    totalAmount,
  } = value;

  const resultRef = useRef(null);

  // 复制功能
  const handleCopy = () => {
    const resultText = `交易日期：${new Date(
      transactionDate
    ).toLocaleDateString()}
外币汇率：${currencyRate.toFixed(3)}
续费价格：${amount.toFixed(2)} 美元 / ${paymentPeriod === 365 ? "年" : "月"}
剩余天数：${remainingDays} 天 (于 ${new Date(
      dueDate
    ).toLocaleDateString()} 过期)
剩余价值：${remainingValue.toFixed(3)} 元 (总 ${totalAmount.toFixed(3)} 元)`;

    navigator.clipboard
      .writeText(resultText)
      .then(() => alert("计算结果已复制到剪贴板"))
      .catch((err) => alert("复制失败，请重试"));
  };

  // 下载结果为图片
  const handleDownloadImage = () => {
    if (resultRef.current === null) {
      return;
    }

    toPng(resultRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "vps_result.png";
        link.click();
      })
      .catch((err) => {
        console.error("生成图片失败", err);
      });
  };

  return (
    <div>
      <div className="results-container" ref={resultRef}>
        <h2>计算结果</h2>
        <p>交易日期：{new Date(transactionDate).toLocaleDateString()}</p>
        <p>外币汇率：{currencyRate.toFixed(3)}</p>
        <p>
          续费价格：{amount.toFixed(2)} 美元 /{" "}
          {paymentPeriod === 365 ? "年" : "月"}
        </p>
        <p>
          剩余天数：{remainingDays} 天 (于{" "}
          {new Date(dueDate).toLocaleDateString()} 过期)
        </p>
        <p>
          剩余价值：{remainingValue.toFixed(3)} 元 (总 {totalAmount.toFixed(3)}{" "}
          元)
        </p>
      </div>

      {/* 复制结果按钮 */}
      <button onClick={handleCopy}>复制计算结果</button>

      {/* 下载图片按钮 */}
      <button onClick={handleDownloadImage}>下载计算结果图片</button>
    </div>
  );
};

export default Results;
