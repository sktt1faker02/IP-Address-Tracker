const reducer = (state, action) => {
  switch (action.type) {
    case "GET_IP":
      return { ...state, ip: action.payload };
    case "GET_IP_DETAILS":
      return { ...state, data: action.payload };
    case "LOADING":
      return { ...state, loading: action.payload };
    case "ERROR":
      return { ...state, error: action.payload };
  }

  return state;
};

export default reducer;
