const Balance = ({ balance }: { balance: number }) => {
  return (
    <div className="balance-container">
      <p>
        Your balance {balance/1000000} tez
      </p>
    </div>
  )
}

export default Balance;