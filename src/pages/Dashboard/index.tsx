const Dashboard: React.FC = () => {
  return (
    <div>
      {Array.from({ length: 100 }, (_, i) => i + 1).map(i => (
        <h1 key={i} style={{ margin: '10px 0' }}>
          <span>{i}</span>
        </h1>
      ))}
    </div>
  )
}

export default Dashboard
