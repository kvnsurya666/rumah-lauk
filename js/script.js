// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger-menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// Function to validate email address
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// Function to validate phone number
function validatePhone(phone) {
  const re = /^[0-9]{10}$/;
  return re.test(phone);
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !phone || !message) {
    alert("Please fill in all the fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (!validatePhone(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  const data = {
    name,
    email,
    phone,
    message,
  };

  fetch("send_email.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while sending the message.");
    });
}

document
  .getElementById("contact-form")
  .addEventListener("submit", handleSubmit);
