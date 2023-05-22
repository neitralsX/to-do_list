let tasks = [];
      const todoForm = document.getElementById("todo-form");
      const todoInput = document.getElementById("todo-input");
      const todoList = document.getElementById("todo-list");
      todoForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = todoInput.value.trim();
        if (text.length === 0) {
          return;
        }
        const task = {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date(),
        };
        tasks.push(task);
        todoInput.value = "";
        renderTasks();
      });

      const renderTasks = () => {
        todoList.innerHTML = "";
        tasks.forEach((task) => {
          const li = document.createElement("li");
          li.setAttribute("data-id", task.id);
          const span = document.createElement("span");
          span.textContent = task.text;
          const completeBtn = document.createElement("button");
          completeBtn.textContent = "Complete";
          completeBtn.addEventListener("click", () => {
            task.completed = !task.completed;
            renderTasks();
          });
          const editBtn = document.createElement("button");
          editBtn.textContent = "Edit";
          editBtn.addEventListener("click", () => {
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("value", task.text);
            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.addEventListener("click", () => {
              task.text = input.value.trim();
              renderTasks();
            });
            li.innerHTML = "";
            li.appendChild(input);
            li.appendChild(saveBtn);
          });
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.addEventListener("click", () => {
            tasks = tasks.filter((t) => t.id !== task.id);
            renderTasks();
          });
          if (task.completed) {
            li.classList.add("completed");
          }
          li.appendChild(span);
          li.appendChild(completeBtn);
          li.appendChild(editBtn);
          li.appendChild(deleteBtn);
          todoList.appendChild(li);
        });
      };

      renderTasks();