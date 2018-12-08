const initialState = {
  mobile: false,
  tablet: false,
  desktop: false,
  type: null,
}

export default function layout(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case 'LAYOUT_UPDATE_TYPE':

      return Object.assign({}, state, {
        mobile: payload.type === 'mobile',
        tablet: payload.type === 'tablet',
        desktop: payload.type === 'desktop',
        type: payload.type,
      })
    default:
      return state
  }
}