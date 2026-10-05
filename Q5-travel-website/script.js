// jQuery for Travel Website

$(document).ready(function () {

  // 1. Highlight a package when mouse goes over it (hover effect)
  $(".package").hover(
    function () {
      $(this).css("background-color", "#e7f1ff");
    },
    function () {
      $(this).css("background-color", "white");
    }
  );

  // 2. Click on "Choose" button -> select that package in the form
  $(".choose").click(function () {
    var pack = $(this).data("pack");
    $("#bpackage").val(pack);
    // scroll to the form
    $("html, body").animate({ scrollTop: $("#booking").offset().top - 60 }, 800);
  });

  // 3. Gallery filter buttons
  $(".filterBtn").click(function () {
    var type = $(this).data("type");
    if (type == "all") {
      $(".gal").fadeIn();
    } else {
      $(".gal").hide();
      $("." + type).fadeIn();
    }
  });

  // 4. Fade in the destination cards when page loads
  $("#destinations .card").hide().fadeIn(1500);

  // 5. Booking form check
  $("#bookingForm").submit(function (event) {
    event.preventDefault();   // stop page from reloading

    var name = $("#bname").val();
    var email = $("#bemail").val();
    var date = $("#bdate").val();

    if (name == "" || email == "" || date == "") {
      $("#result").css("color", "red").text("Please fill name, email and date!");
    } else {
      $("#result").css("color", "green")
        .text("Thank you " + name + "! Your " + $("#bpackage").val() + " package request is received.");
      $("#bookingForm")[0].reset();
    }
  });

});
