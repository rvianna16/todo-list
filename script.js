const Storage = {
  setStorage() {
    localStorage.setItem('todos', JSON.stringify(Todo.todos));
  },

  getStorage() {
    return JSON.parse(localStorage.getItem('todos')) || [];
  },
};

const Todo = {
  input: document.getElementById('add'),
  ul: document.querySelector('.todo__list'),
  todos: Storage.getStorage(),
  dragIndex: 0,

  getStartIndex() {
    const startIndex = +this.getAttribute('data-index');
    Todo.dragIndex = startIndex;
  },
  dragDrop() {
    const dragStartIndex = Todo.dragIndex;
    const dragEndIndex = +this.getAttribute('data-index');
    const todos = Todo.todos;

    todos.splice(dragEndIndex, 0, todos.splice(dragStartIndex, 1)[0]);

    this.classList.remove('over');
    Todo.reload();
  },

  dragEnter() {
    this.classList.add('over');
  },

  dragOver(e) {
    e.preventDefault();
  },

  dragLeave() {
    this.classList.remove('over');
  },

  sortTodo() {
    const list = Todo.ul.querySelectorAll('li');
    list.forEach((li) => {
      li.addEventListener('dragstart', this.getStartIndex);
      li.addEventListener('dragleave', this.dragLeave);
      li.addEventListener('dragover', this.dragOver);
      li.addEventListener('dragenter', this.dragEnter);
      li.addEventListener('drop', this.dragDrop);
    });
  },

  checkTodo() {
    const checkBtn = document.querySelectorAll('.todo__item .check');

    checkBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        if (this.todos[index].status === 'do') {
          this.todos[index].status = 'done';
        } else {
          this.todos[index].status = 'do';
        }

        this.reload();
      });
    });
  },

  removeTodo() {
    const removeBtn = document.querySelectorAll('.remove');
    removeBtn.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        this.todos.splice(index, 1);
        this.reload();
      });
    });
  },

  clearTodo() {
    this.ul.innerHTML = '';
  },

  addTodo() {
    this.todos.forEach((todo, index) => {
      const statusClass = todo.status === 'do' ? '' : 'done';
      const iconClass =
        todo.status === 'do' ? 'far fa-circle' : 'fas fa-check-circle';
      const html = `   
        <li class="todo__item ${statusClass}" data-index="${index}" draggable="true">   
          <i class="check ${iconClass}"></i>
          <p>${todo.text}</p>
          <i class="remove fas fa-minus-circle"></i>  
        </li>    
      `;
      this.ul.innerHTML += html;
    });
  },

  reload() {
    this.clearTodo();
    this.init();
  },

  init() {
    this.addTodo();
    this.removeTodo();
    this.checkTodo();
    this.sortTodo();
    Filter.remainingItems();
    Filter.allFilter();

    Storage.setStorage();
  },

  addInputListener() {
    this.input.addEventListener('keypress', (e) => {
      if (e.charCode === 13) {
        e.preventDefault();
        if (this.input.value.length > 0) {
          this.todos.push({
            text: this.input.value,
            status: 'do',
          });
          this.reload();
          this.input.value = '';
        } else {
          alert('Você deve digitar algo!');
        }
      }
    });
  },
};

const Filter = {
  allButton: document.querySelector('[data-filter="all"]'),
  activeButton: document.querySelector('[data-filter="active"]'),
  doneButton: document.querySelector('[data-filter="done"]'),
  span: document.getElementById('itemsCount'),

  remainingItems() {
    const items = document.querySelectorAll('li:not(.done)');
    const doneItems = document.querySelectorAll('li.done');

    if (Filter.doneButton.classList.contains('active')) {
      this.span.innerText = `${doneItems.length} itens finalizados`;
    } else if (items.length === 0) {
      this.span.innerText = 'Nenhum item ativo';
    } else {
      this.span.innerText = `${items.length} itens restantes`;
    }
  },

  addFilterEvent() {
    this.allButton.addEventListener('click', this.allFilter);
    this.activeButton.addEventListener('click', this.activeFilter);
    this.doneButton.addEventListener('click', this.doneFilter);
  },

  removeActive() {
    this.allButton.classList.remove('active');
    this.activeButton.classList.remove('active');
    this.doneButton.classList.remove('active');
  },

  allFilter() {
    Filter.removeActive();
    Filter.allButton.classList.add('active');
    Filter.remainingItems();

    const todos = document.querySelectorAll('.todo__item');

    todos.forEach((todo) => {
      todo.style.display = '';
    });
  },

  activeFilter() {
    Filter.removeActive();
    Filter.activeButton.classList.add('active');
    Filter.remainingItems();

    const todos = document.querySelectorAll('.todo__item');

    todos.forEach((todo) => {
      if (todo.classList.contains('done')) {
        todo.style.display = 'none';
      } else {
        todo.style.display = '';
      }
    });
  },

  doneFilter() {
    Filter.removeActive();
    Filter.doneButton.classList.add('active');
    Filter.remainingItems();

    const todos = document.querySelectorAll('.todo__item');

    todos.forEach((todo) => {
      if (todo.classList.contains('done')) {
        todo.style.display = '';
      } else {
        todo.style.display = 'none';
      }
    });
  },

  init() {
    this.addFilterEvent();
    this.remainingItems();
  },
};

Todo.addInputListener();
Todo.init();
Filter.init();
