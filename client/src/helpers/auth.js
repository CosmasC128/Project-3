export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getTokenFromLocalStorage()
  if (!token) return
  const splitToken = token.split('.')
  if (splitToken.length < 3) return
<<<<<<< HEAD
=======
  // console.log('split token', splitToken[1])
  // console.log('split token after atob', atob(splitToken[1]))
>>>>>>> 1e7e0918f5b59b57a319e8d01dff7eee9cd183a1
  return JSON.parse(atob(splitToken[1]))
}