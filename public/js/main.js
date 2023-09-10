// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const input = document.querySelector("#action"),
    json = { action: input.value },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const data = await response.json();
  const list = document.getElementById("list");

  list.innerHTML = "";
  
  const rowHead = document.createElement("tr");
  const actionHead = document.createElement("th");
  actionHead.innerText = "Action";
  const dateHead = document.createElement("th");
  dateHead.innerText = "Date Created";
  const deleteHead = document.createElement('th');
  deleteHead.innerText = "Remove";
  const completeHead = document.createElement('th');
  completeHead.innerText = "Completed";
  const dateCompletedHead = document.createElement('th');
  dateCompletedHead.innerText = "Date Completed";
  rowHead.appendChild(actionHead);
  rowHead.appendChild(dateHead);
  rowHead.appendChild(completeHead);
  rowHead.appendChild(dateCompletedHead);
  rowHead.appendChild(deleteHead);
  list.appendChild(rowHead);

  data.forEach((action) => {
    const row = document.createElement("tr");

    const actionCell = document.createElement("td");
    actionCell.innerText = action.action;

    const dateCell = document.createElement("td");
    dateCell.innerText = new Date(action.date).toLocaleString();
    
    const completeButton = document.createElement("button");
    completeButton.innerText = action.complete;
    completeButton.onclick = function () {
      const index = data.indexOf(action);
      if (index !== -1) {
        fetch("/submit", {
          method: "POST",
          body: JSON.stringify({ action: "complete", index: index }),
        })
          .then((response) => response.json())
          .then((data) => {
            updateList(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
    
    const dateCompletedCell = document.createElement("td");
    dateCompletedCell.innerText = action.dateCompleted;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
      const index = data.indexOf(action);
      console.log(index);
      if (index !== -1) {
        fetch("/submit", {
          method: "POST",
          body: JSON.stringify({ action: "delete", index: index }),
        })
          .then((response) => response.json())
          .then((data) => {
            updateList(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
    row.appendChild(actionCell);
    row.appendChild(dateCell);
    row.appendChild(completeButton);
    row.appendChild(dateCompletedCell);
    row.appendChild(deleteButton);
    list.appendChild(row);
  });

  document.body.appendChild(list);

  console.log("text:", data);
};

//Update list
function updateList(data) {
  const list = document.getElementById("list");

  list.innerHTML = "";
  
  const rowHead = document.createElement("tr");
  const actionHead = document.createElement("th");
  actionHead.innerText = "Action";
  const dateHead = document.createElement("th");
  dateHead.innerText = "Date Created";
  const deleteHead = document.createElement('th');
  deleteHead.innerText = "Remove";
  const completeHead = document.createElement('th');
  completeHead.innerText = "Completed";
  const dateCompletedHead = document.createElement('th');
  dateCompletedHead.innerText = "Date Completed";
  rowHead.appendChild(actionHead);
  rowHead.appendChild(dateHead);
  rowHead.appendChild(completeHead);
  rowHead.appendChild(dateCompletedHead);
  rowHead.appendChild(deleteHead);
  list.appendChild(rowHead);

  data.forEach((action) => {
    const row = document.createElement("tr");

    const actionCell = document.createElement("td");
    actionCell.innerText = action.action;

    const dateCell = document.createElement("td");
    dateCell.innerText = new Date(action.date).toLocaleString();
    
    const completeButton = document.createElement("button");
    completeButton.innerText = action.complete;
    completeButton.onclick = function () {
      const index = data.indexOf(action);
      if (index !== -1) {
        fetch("/submit", {
          method: "POST",
          body: JSON.stringify({ action: "complete", index: index }),
        })
          .then((response) => response.json())
          .then((data) => {
            updateList(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
    
    const dateCompletedCell = document.createElement("td");
    dateCompletedCell.innerText = action.dateCompleted;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function () {
      const index = data.indexOf(action);
      console.log(index);
      if (index !== -1) {
        fetch("/submit", {
          method: "POST",
          body: JSON.stringify({ action: "delete", index: index }),
        })
          .then((response) => response.json())
          .then((data) => {
            updateList(data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    };
    row.appendChild(actionCell);
    row.appendChild(dateCell);
    row.appendChild(completeButton);
    row.appendChild(dateCompletedCell);
    row.appendChild(deleteButton);
    list.appendChild(row);
  });

  document.body.appendChild(list);
}

//render list when window is opened
const renderList = async function () {
  const response = await fetch("/list", {
    method: "GET",
  });

  const data = await response.json();
  console.log(data);
  updateList(data);

};

window.onload = function () {
  renderList();
  const button = document.querySelector("button");
  button.onclick = submit;
};
