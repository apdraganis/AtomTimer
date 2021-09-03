// Sidenav
/* Open the sidenav */
function openNav() {
  if (window.innerWidth > 500) {
    document.getElementById("mySidenav").style.width = "250px";
  } else {
    document.getElementById("mySidenav").style.width = "100%";
  }

  setTimeout( () => {
    document.querySelector(".sidenav-settings").style.display = "flex";
  }, 280)

}

/* Close/hide the sidenav */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.querySelector(".sidenav-settings").style.display = "none";
}



