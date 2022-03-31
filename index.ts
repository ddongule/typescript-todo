type TodoStatus = 'all' | 'complete' | 'not-complete';

type TodoItem = {
  id: number;
  isDone: boolean;
  content: string;
};

export default class Todo {
  todoList: TodoItem[];

  constructor() {
    this.todoList = [];

    this.init();
  }

  init() {
    const $input = document.querySelector('#todo-input');
    const $controlBtns = document.querySelectorAll('.btn');

    $controlBtns.forEach((btn) => {
      const btnClass = btn.classList.value.split(' ')[1] as TodoStatus;

      btn.addEventListener('click', (event: MouseEvent) => {
        const filteredTodo = this.filterTodo(btnClass);
        this.addActiveStatus(event);
        this.renderTodo(filteredTodo);
      });
    });

    $input.addEventListener('keydown', this.onEnterClick.bind(this));
  }

  filterTodo(filterBy: TodoStatus) {
    if (filterBy === 'all') return this.todoList;
    if (filterBy === 'complete') return this.todoList.filter((todo) => todo.isDone);
    if (filterBy === 'not-complete') return this.todoList.filter((todo) => !todo.isDone);
  }

  addActiveStatus({ target }: MouseEvent) {
    this.resetActiveStatus();

    const activeTarget = target as HTMLButtonElement;
    activeTarget.classList.add('active');
  }

  resetActiveStatus() {
    const $controlBtns = document.querySelectorAll('.btn');
    $controlBtns.forEach((btn) => btn.classList.remove('active'));
  }

  resetInput(inputElement: HTMLInputElement) {
    inputElement.value = '';
  }

  getStatus() {
    let status;
    const $controlBtns = document.querySelectorAll('.btn');
    $controlBtns.forEach((btn) => {
      if (btn.classList.contains('active')) {
        status = btn.classList.value.split(' ')[1] as TodoStatus;
      }
    });

    return status;
  }

  onEnterClick(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const $input = event.target as HTMLInputElement;
      const lastElementId = this.todoList.length ? this.todoList[this.todoList.length - 1].id : -1;

      this.todoList.push({ id: lastElementId + 1, isDone: false, content: $input.value });
      this.resetInput($input);

      this.renderTodo(this.todoList);
    }
  }

  updateTodo(id: TodoItem['id']) {
    const index = this.todoList.findIndex((todo) => todo.id === id);
    const todo = this.todoList[index];
    const newTodo = { ...todo, isDone: !todo.isDone };

    this.todoList.splice(index, 1, newTodo);
    this.renderTodo(this.filterTodo(this.getStatus()));
  }

  makeTodo(todo: TodoItem) {
    const itemContainer = document.createElement('div');
    const item = `
      <div class="item__div">
        <input type='checkbox' ${todo.isDone ? 'checked' : ''}/>
        <div>${todo.content}</div>
        <button>X</button>
      </div>`;

    itemContainer.classList.add('item');
    itemContainer.innerHTML = item;

    const checkbox = itemContainer.querySelector('input[type=checkbox]');
    const deleteBtn = itemContainer.querySelector('button');

    deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));
    checkbox.addEventListener('change', () => this.updateTodo(todo.id));
    itemContainer.appendChild(deleteBtn);

    return itemContainer;
  }

  deleteTodo(id: TodoItem['id']) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);

    this.renderTodo(this.filterTodo(this.getStatus()));
  }

  resetContent(element) {
    element.innerHTML = '';
  }

  renderTodo(todoList) {
    const $todoItems = document.querySelector('.todo-items') as HTMLElement;
    const $todoCount = document.querySelector('#todo-count') as HTMLElement;
    this.resetContent($todoItems);

    const frag = document.createDocumentFragment();
    const todoElements = todoList.map((todo) => this.makeTodo(todo));

    frag.append(...todoElements);

    $todoItems.appendChild(frag);
    $todoCount.innerText = `${todoList.length}`;
  }
}

new Todo();
