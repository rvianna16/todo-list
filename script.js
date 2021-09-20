const todo = {
  input: document.getElementById('add'),
  ul: document.querySelector('.todo__list'),
  todos: [],

  addEventListener() {
    this.input.addEventListener('keypress', (e) => {
      if (e.charCode === 13) {
        e.preventDefault();
        this.todos.push(this.input.value);
        this.reload();
        this.input.value = '';
      }
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

  addTodo() {
    this.todos.forEach((todo) => {
      const html = `      
        <i class="status far fa-circle"></i>
        <p>${todo}</p>
        <i class="remove fas fa-minus-circle"></i>      
      `;
      this.appendTodo(html);
    });
  },

  appendTodo(html) {
    const li = document.createElement('li');
    li.classList.add('todo__item');
    li.innerHTML = html;
    this.ul.appendChild(li);
  },

  clearTodo() {
    this.ul.innerHTML = '';
  },

  init() {
    this.addEventListener();
    this.removeTodo();
  },

  reload() {
    this.clearTodo();
    this.addTodo();
    this.removeTodo();
  },
};

todo.init();
