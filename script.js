const todo = {
  input: document.getElementById('add'),
  ul: document.querySelector('.todo__list'),
  todos: [],

  init() {
    this.addTodo();
    this.removeTodo();
    this.checkTodo();
    filter.remainingItems();
    filter.allFilter();
  },

  reload() {
    this.clearTodo();
    this.init();
  },

  addTodo() {
    this.todos.forEach((todo) => {
      const statusClass = todo.status === 'do' ? '' : 'done';
      const iconClass =
        todo.status === 'do' ? 'far fa-circle' : 'fas fa-check-circle';
      const html = `   
        <li class="todo__item ${statusClass}">   
          <i class="check ${iconClass}"></i>
          <p>${todo.text}</p>
          <i class="remove fas fa-minus-circle"></i>  
        </li>    
      `;
      this.ul.innerHTML += html;
    });
  },

  clearTodo() {
    this.ul.innerHTML = '';
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

  checkTodo() {
    const checkBtn = document.querySelectorAll('.todo__item');
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

  addEventListener() {
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

const filter = {
  allButton: document.querySelector('[data-filter="all"]'),
  activeButton: document.querySelector('[data-filter="active"]'),
  doneButton: document.querySelector('[data-filter="done"]'),
  span: document.getElementById('itens'),

  remainingItems() {
    const items = document.querySelectorAll('li:not(.done)');
    const doneItems = document.querySelectorAll('li.done');

    if (filter.doneButton.classList.contains('active')) {
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
    filter.removeActive();
    filter.allButton.classList.add('active');
    filter.remainingItems();

    const todos = document.querySelectorAll('.todo__item');

    todos.forEach((todo) => {
      todo.style.display = '';
    });
  },

  activeFilter() {
    filter.removeActive();
    filter.activeButton.classList.add('active');
    filter.remainingItems();

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
    filter.removeActive();
    filter.doneButton.classList.add('active');
    filter.remainingItems();

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

todo.addEventListener();
todo.init();
filter.init();
