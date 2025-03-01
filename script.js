// Light mode Code

const themeSwitcher = document.getElementById("themeSwitcher");
const body = document.body;
// Check local storage for theme preference
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-mode");
}
// Toggle theme on click
themeSwitcher.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  // Save the theme preference in local storage
  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

//Main code goes here
const input = document.querySelector("input");
const btn = document.querySelector("button");
const card = document.querySelector(".card");
const repoContainer = document.querySelector(".repos");

// Shows Repositories
repos("sujal8668");
async function repos(username) {
  const resp = await fetch(`https://api.github.com/users/${username}/repos`);
  const respData = await resp.json();
  return respData;
}
async function add_repo() {
  const reposData = await repos(input.value);
  repoContainer.innerHTML = reposData
    .map((repo) => {
      return `
          <div class="card">
              <h2>${repo.name}</h2>
              <a href="${repo.clone_url}" target="_blank">Take a look at this repo ></a>
          </div>
      `;
    })
    .join("");
}

// Shows User Info
user("sujal8668");
async function user(username) {
  const resp = await fetch(`https://api.github.com/users/${username}`);
  const respData = await resp.json();
  return respData;
}
btn.addEventListener("click", async () => {
  const inputVal = input.value;
  const searchResult = await user(inputVal);

  add_repo();

  if (!searchResult.login) {
    alert("User not found");
  } else {
    card.innerHTML = `
        <div class="avatar">
                    <img src="${searchResult.avatar_url}" alt="">
                </div>
                <div class="info">
                    <h2>${searchResult.name}</h2>
                    <p>${searchResult.login}</p>
                    <div class="follow-info">
                        <div class="single">
                            <span>${searchResult.followers}</span>
                            <span>Followers</span>
                        </div>
                        <div class="single">
                            <span>${searchResult.following}</span>
                            <span>Following</span>
                        </div>
                        <div class="single">
                            <span>${searchResult.public_repos}</span>
                            <span>Repos</span>
                        </div>
                    </div>
                    <a href="${searchResult.html_url}" target="_blank">Visit Github Profile ></a>
        `;
  }
});

// Function for adding enter key to search results
function enter(event) {
  if (event.key === "Enter") {
    btn.click();
  }
}
input.addEventListener("keyup", enter);
