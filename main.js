const formAdd = document.querySelector("#form-add");
const inputAdd = formAdd.querySelector(".input");
let tasks = [];

/// sự kiện submit
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  ///validate
  let val = inputAdd.value.trim();
  if (val) {
    // Add data
    addTask(val);
    // Clear input add
    inputAdd.value = "";
  } else {
    alert("Please fill in the information");
  }
});

/////Hàm Add task
function addTask(value) {
  const newTask = {
    id: Date.now(),
    name: value,
    isDone: false,
    isEdit: false,
  };
  // Đẩy task vừa được tạo vào mảng
  tasks.push(newTask);
  console.log(tasks);
  // Show ra giao diện
  showTasks();
}

function showTasks() {
  const tasksElement = document.querySelector(".todo-list");
  tasksElement.innerHTML = "";
  tasks.forEach((task) => {
    const { id, name, isDone, isEdit } = task;
    //Dom ảo todo-item
    const itemElement = document.createElement("li");
    itemElement.id = id;
    itemElement.className = `todos__item ${isDone ? "--done" : ""}`;
    //Dom ảo label
    const labelElement = document.createElement("span");
    labelElement.className = "todos__label";
    labelElement.innerText = name;

    //Dom ảo actions wrap
    const actionsElement = document.createElement("div");
    actionsElement.className = "todos__action";

    //Dom ảo button delete
    const btnDelete = document.createElement("button");
    btnDelete.className = "btn btn--red";
    btnDelete.innerText = "Delete";
    // Xử lý sự kiện click delete
    btnDelete.addEventListener("click", () => {
      deleteTask(id);
    });

    // Dom ảo Form
    const formEdit = document.createElement("form");
    formEdit.className = "form ";
    // Dom ảo Input
    const inputEdit = document.createElement("input");
    inputEdit.className = "input";
    inputEdit.value = name;

    formEdit.addEventListener("submit", (e) => {
      e.preventDefault();
      if (inputEdit.value) {
        updateLabel(id, inputEdit.value);
        changeView(id);
        inputEdit.value = "";
      }
    });

    // Button Save
    const btnSave = document.createElement("button");
    btnSave.className = "btn btn--blue";
    btnSave.type = "submit";
    btnSave.innerText = "Save";

    // button edit
    const btnEdit = document.createElement("button");
    btnEdit.className = "btn btn--yellow";
    btnEdit.innerText = "Edit";
    // Xử lý khi nhấn nút Edit
    btnEdit.addEventListener("click", () => {
      changeView(id);
    });

    // button done
    const btnDone = document.createElement("button");
    btnDone.className = `btn ${!isDone ? "btn--green" : "btn--yellow"}`;
    btnDone.innerText = `${!isDone ? "Done" : "Undone"}`;
    // Xử lý khi ấn nút Done
    btnDone.addEventListener("click", () => {
      // Update lại trạng thái
      updateStatusTaskById(id);
    });
    // Render HTML
    if (isEdit) {
      formEdit.appendChild(inputEdit);
      formEdit.appendChild(btnSave);
      itemElement.appendChild(formEdit);
    } else {
      actionsElement.appendChild(btnDelete);
      !isDone && actionsElement.appendChild(btnEdit);
      actionsElement.appendChild(btnDone);
      itemElement.appendChild(labelElement);
      itemElement.appendChild(actionsElement);
    }
    tasksElement.appendChild(itemElement);
  });
}

// Hàm xóa task
function deleteTask(id) {
  // Lọc ra những tasks khác id nhấn và gán lại cho mảng
  tasks = tasks.filter((task) => task.id !== id);
  showTasks();
}

// Hàm xử lý cập nhật trạng thái done
function updateStatusTaskById(id) {
  // Nếu cùng id thì sẽ cập nhật lại trạng thái
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, isDone: !task.isDone } : task
  );
  showTasks();
}

function changeView(id) {
  // Nếu cùng id thì sẽ cập nhật lại trạng thái
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, isEdit: !task.isEdit } : task
  );
  showTasks();
}

// Cập nhật lại giá trị cho task khi edit
function updateLabel(id, valueUpdate) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, name: valueUpdate } : task
  );

  showTasks();
}
