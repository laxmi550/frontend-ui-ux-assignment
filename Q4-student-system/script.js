// jQuery code for Student Information System

$(document).ready(function () {

  // array to keep all students
  var students = [];

  // function to show the table
  function showStudents() {
    $("#studentTable").empty();   // DOM manipulation: clear table

    for (var i = 0; i < students.length; i++) {
      var s = students[i];
      var row = "<tr>" +
        "<td>" + s.roll + "</td>" +
        "<td>" + s.name + "</td>" +
        "<td>" + s.course + "</td>" +
        "<td>" + s.email + "</td>" +
        "<td>" +
          "<button class='btn btn-warning btn-sm editBtn' data-index='" + i + "'>Edit</button>" +
          "<button class='btn btn-danger btn-sm deleteBtn' data-index='" + i + "'>Delete</button>" +
        "</td>" +
        "</tr>";
      $("#studentTable").append(row);   // DOM manipulation: add row
    }

    // show or hide the "no students" message
    if (students.length == 0) {
      $("#emptyMsg").show();
    } else {
      $("#emptyMsg").hide();
    }
  }

  // function to clear the form
  function clearForm() {
    $("#roll").val("");
    $("#name").val("");
    $("#course").val("");
    $("#email").val("");
    $("#editIndex").val("");
    $("#saveBtn").text("Add Student");
    $("#formTitle").text("Add Student");
  }

  // show message with an effect
  function showMessage(text) {
    $("#message").text(text).fadeIn(300).delay(1500).fadeOut(500);
  }

  // ADD or MODIFY student (click event)
  $("#saveBtn").click(function () {
    var roll = $("#roll").val();
    var name = $("#name").val();
    var course = $("#course").val();
    var email = $("#email").val();

    // simple check
    if (roll == "" || name == "" || course == "" || email == "") {
      alert("Please fill all the fields!");
      return;
    }

    var student = { roll: roll, name: name, course: course, email: email };
    var index = $("#editIndex").val();

    if (index == "") {
      students.push(student);          // add new
      showMessage("Student added!");
    } else {
      students[index] = student;       // modify old
      showMessage("Student updated!");
    }

    showStudents();
    clearForm();
  });

  // Clear button
  $("#clearBtn").click(function () {
    clearForm();
  });

  // EDIT button (event on dynamic elements)
  $("#studentTable").on("click", ".editBtn", function () {
    var index = $(this).data("index");
    var s = students[index];

    $("#roll").val(s.roll);
    $("#name").val(s.name);
    $("#course").val(s.course);
    $("#email").val(s.email);
    $("#editIndex").val(index);
    $("#saveBtn").text("Update Student");
    $("#formTitle").text("Modify Student");
  });

  // DELETE button
  $("#studentTable").on("click", ".deleteBtn", function () {
    var index = $(this).data("index");
    if (confirm("Do you want to delete this student?")) {
      students.splice(index, 1);       // remove from array
      showStudents();
      showMessage("Student removed!");
    }
  });

  // SEARCH (keyup event + filter)
  $("#search").keyup(function () {
    var text = $(this).val().toLowerCase();
    $("#studentTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(text) > -1);
    });
  });

  // show the table when page loads
  showStudents();

});
