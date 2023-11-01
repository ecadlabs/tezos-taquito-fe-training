const OperationHash = ({opHash}: {opHash: string} ) => {
  return (
    <>
      <p>
        <span>
          Operation hash: &nbsp;
        </span>
        <a
          href={`https://ghostnet.tzkt.io/${opHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {opHash}
        </a>
      </p>
    </>
  )
}

export default OperationHash