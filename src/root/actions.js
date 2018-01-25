export const updateUserInfo = (dispatch, authToken, tenant) => {
  dispatch({
    type: 'APP_USER_INFO',
    data: {
      token: authToken,
      tenantName: tenant
    }
  })
}

export const APP_CLEAR_ERROR = 'APP_CLEAR_ERROR'
export const appClearError = () => ({
  type: APP_CLEAR_ERROR,
})

export default {
  updateUserInfo: updateUserInfo,
  appClearError: appClearError
}
