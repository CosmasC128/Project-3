export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  console.log('split token', splitToken[1])
  console.log('split token after atob', atob(splitToken[1]))
  return JSON.parse(atob(splitToken[1]))
}