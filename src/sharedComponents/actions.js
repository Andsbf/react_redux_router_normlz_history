export const APP_ERROR = 'APP_ERROR'
export const networkError = () => ({
  type: APP_ERROR,
  message: 'Oops! Something went wrong with our servers!'
})
