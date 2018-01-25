const app = (state = { user: null, errorMessage: null}, action) => {
  switch (action.type) {
    case 'APP_USER_INFO':
      return {
        ...state,
        user: {
          ...state.user,
          token: action.data.token,
          tenantName: action.data.tenantName
        }
      };

    case 'APP_ERROR':
      return {
        ...state,
        errorMessage: 'Oops! Something went wrong!'
      };

    case 'APP_CLEAR_ERROR':
      return {
        ...state,
        errorMessage: null
      };

    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        errorMessage: null
      };

    default:
      return state
  }
}

export default app
