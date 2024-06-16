export const getTaskFromLocalStorage = async (key) => {
  let tasklocal = await JSON.parse(localStorage.getItem(key));

  if (tasklocal === null) {
    tasklocal = [];
  }
  return tasklocal;
};

export const sendTaskInLocalStorage = async (key, tasklocal) => {
  tasklocal = JSON.stringify(tasklocal);
  localStorage.setItem(key, tasklocal);
};
