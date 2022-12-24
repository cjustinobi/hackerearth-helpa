export const transactionStatus = index => {
  const status = [
    'Cancelled',
    'InProgress',
    'Reviewing',
    'Completed'
  ]
  return status[index]
}