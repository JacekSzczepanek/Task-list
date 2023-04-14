{
  let tasks = [];

  let tassDoneHidden = false;

  const setInputFocus = () => {
    document.querySelector(".js-newTask").focus();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent }];

    render();
  };

  const resetForm = () => {
    document.querySelector(".js-form").reset();
  };

  const toggleTaskDone = (index) => {
    tasks = [
      ...tasks.slice(0, index),
      {
        ...tasks[index],
        done: !tasks[index].done,
      },
      ...tasks.slice(index + 1),
    ];

    render();
  };

  const removeTask = (index) => {
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const render = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li class="list__item">
          <button class="list__button js-done">${task.done ? "✔" : ""}</button>
          <p class="list__tasks ${task.done ? "list__tasks--done" : ""}">
          ${task.content}
          </p>
          <button class="list__button list__button--remove js-remove">🗑</button>
          </li>
          `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    setInputFocus();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);

    resetForm();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
