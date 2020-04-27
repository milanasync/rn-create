module.exports = `import { all } from 'redux-saga/effects'

import SagaList from './sagaList';

const allSagas = SagaList;

export default function* AppSaga() {
  yield all(allSagas);
}
`;
