const noteBtn = document.getElementById("add-btn"),
  noteTitle = document.getElementById("note-title"),
  noteSubject = document.getElementById("Subject-title"),
  Tutor = document.getElementById("Tutor"),
  noteText = document.getElementById("note-text"),
  clear = document.querySelector(".clear");

//   Get notes from local storage
function getNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
}

//   Note btn event listener
noteBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (noteTitle.value == "" || noteText.value == "" || noteSubject.value == "" || Tutor.value == "") {
    return alert("please add note title and details");
  }

  getNotes(); // notesObj array

  let myObj = {
    title: noteTitle.value,
    text: noteText.value,
    Subject: noteSubject.value,
    tutor: Tutor.value,
  };
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));

  document.querySelector("form").reset();
  showNotes();
});

// Display notes on the page
function showNotes() {
  getNotes();
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
        <div class="note">
        <div class="note-cta">
          <p class="note-counter">Note ${index + 1}</p>
          <div class="note-cta-btn">
            <button id="${index}" onclick="deleteNote(this.id)" class="note-btn">
              <i class="fas fa-trash"></i> Delete
            </button>
            <button id="${index}" onclick="editNote(this.id)" class="note-btn edit-btn">
              <i class="fas fa-edit"></i> Edit
            </button>
          </div>
        </div>
        <hr />
        <h1 class="note-title">Subject/Course: ${element.Subject}</h1>
        <h3 class="note-title">Topic: <small>${element.title}</small></h3>
        <p class="note-text">${element.text}</p>
        <p class="tutorName">Tutor: ${element.tutor}</p>
      </div>
        `;
        let count = index+1
        let countPlu = "Note"
        if (count > 1) {
          
          countPlu = "Notes"
        }
        document.getElementById("Length").innerHTML = (index+1) + countPlu
  });
  let noteElm = document.getElementById("notes");

  if (notesObj.length != 0) {
    noteElm.innerHTML = html;
  } else {
    noteElm.innerHTML = "No notes added, Please add a note";
  }
}

// DELETE A SINGLE NOTE
function deleteNote(index) {
  let confirmDel = confirm("Delete this note");
  if (confirmDel) {
    getNotes();
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
}

// Delete all notes
clear.addEventListener("click", () => {
  localStorage.clear();
  showNotes();
});

// Edit note
function editNote(index) {
  if (noteTitle.value !== "" || noteText.value !== "" || noteSubject.value !== "" || Tutor.value !== "") {
    return alert("Please clear the form before editing");
  }
  getNotes();

  noteTitle.value = notesObj[index].title;
  noteText.value = notesObj[index].text;
  noteSubject.value = notesObj[index].Subject;
  Tutor.value = notesObj[index].tutor;

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

showNotes();
