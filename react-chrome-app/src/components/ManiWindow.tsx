type Props = {
  action?: string
  content?: string
  response?: string
}

export default function ({
  action,
  content,
  response,
                         }: Props) {
  return (
    <>
      <h3>{action}</h3>
      <p>{content}</p>
      <hr />
      <div className="card">
        <p>{JSON.stringify(response) || 'LOADING...'}</p>
      </div>
    </>
  )
}
