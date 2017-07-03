import { createStore } from 'redux';
import todoApp from './reducers';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from './actions';

let store = createStore(todoApp);

// console.log(store.getState())

store.subscribe(() =>
  console.log(store.getState()),
  console.log('pop')
)


store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))

store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))


store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED))


// 停止监听 state 更新
// store.unsubscribe()
