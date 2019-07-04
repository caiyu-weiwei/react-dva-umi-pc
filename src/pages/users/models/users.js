import * as usersServices from '../services/users'
export default {
  namespace: 'users',

  state: {
    list: [],
    total: null,
    page: null
  },

  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      return {...state, list, total, page}
    }
  },

  effects: {
    *fetch({ page=1 }, { call, put }) {
      const { data, headers } = yield call(usersServices.fetch, { page })
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page
        }
      })
    }
  }
}