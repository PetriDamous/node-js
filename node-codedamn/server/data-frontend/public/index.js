document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const nameValue = document.querySelector(`#form input[type="text"]`).value;

  const passwordValue = document.querySelector(
    `#form input[type="password"]`
  ).value;

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nameValue, passwordValue }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
});
