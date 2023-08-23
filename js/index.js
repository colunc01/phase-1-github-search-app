// Get references to HTML elements
const githubForm = document.getElementById('github-form'); // Form element
const searchInput = document.getElementById('search'); // Search input element
const userList = document.getElementById('user-list'); // User list element
const reposList = document.getElementById('repos-list'); // Repository list element

// Add event listener to form submission
githubForm.addEventListener('submit', handleFormSubmit);

// Function to handle form submission
async function handleFormSubmit(event) {
  event.preventDefault();
  // Get the search term from the input field
  const searchTerm = searchInput.value;
  
  try {
    // Call the function to search for users
    const users = await searchUsers(searchTerm);
    // Call the function to display the users
    displayUsers(users);
  } catch (error) {
    console.log('Error:', error);
  }
}

// Function to search for users
async function searchUsers(searchTerm) {
  // Construct the URL for the user search API request
  const url = `https://api.github.com/search/users?q=${searchTerm}`;
  
  // Make a GET request to the API with custom headers
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  });
  
  // Parse the response data as JSON
  const data = await response.json();
  return data.items;
}

// Function to display the users
function displayUsers(users) {
  // Clear the user list before displaying new results
  userList.innerHTML = '';
  users.forEach(user => {
    // Create HTML elements to display user information
    const listItem = document.createElement('li');
    const username = document.createElement('h3');
    const avatar = document.createElement('img');
    const profileLink = document.createElement('a');

    // Set the content and attributes of the elements
    username.textContent = user.login;
    avatar.src = user.avatar_url;
    avatar.classList.add('avatar');
    profileLink.href = user.html_url;
    profileLink.textContent = 'View Profile';

    // Append the elements to the user list
    listItem.appendChild(username);
    listItem.appendChild(avatar);
    listItem.appendChild(profileLink);
    userList.appendChild(listItem);

    // Add click event listener to fetch user repositories
    listItem.addEventListener('click', async () => {
      try {
        // Call the function to get user repositories
        const repos = await getUserRepos(user.login);
        // Call the function to display the repositories
        displayRepos(repos);
      } catch (error) {
        console.log('Error:', error);
      }
    });
  });
}

// Function to get user repositories
async function getUserRepos(username) {
  // Construct the URL for the user repositories API request
  const url = `https://api.github.com/users/${username}/repos`;
  
  // Make a GET request to the API with custom headers
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  });
  
  // Parse the response data as JSON
  const data = await response.json();
  return data;
}

// Function to display the repositories
function displayRepos(repos) {
  // Clear the repository list before displaying new results
  reposList.innerHTML = '';
  repos.forEach(repo => {
    // Create HTML elements to display repository information
    const listItem = document.createElement('li');
    const repoName = document.createElement('h3');

    // Set the content of the elements
    repoName.textContent = repo.name;

    // Append the elements to the repository list
    listItem.appendChild(repoName);
    reposList.appendChild(listItem);
  });
}

// Call functions to perform initial setup
// (e.g., add event listeners, etc.)

