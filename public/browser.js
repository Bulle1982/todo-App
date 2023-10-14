function itemTemplate(item) {
    return  `
    <li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>
    `
}
// Initial Page Load Render
let ourHTML = items.map(function(item) {
    return itemTemplate(item);
}).join("")
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)
// Create Feature
let createField = document.getElementById("create-field");
document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();
    axios.post("/create-item", {text: createField.value}).then(function(response) {
     // Create the HTML for the new item
     document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
     createField.value = "";
     createField.focus();
    }).catch(function() {
        console.log("Please try again later!")
    })
})
document.addEventListener("click", function(e) {
    // Delete Feature
    if (e.target.classList.contains("delete-me")) {
        if (confirm("Do you really want to delete this item permanently?")) {
            axios.post("/delete-item", {id: e.target.getAttribute("data-id")}).then(function() {
                e.target.parentElement.parentElement.remove();
            }).catch(function() {
                console.log("Please try again later!")
            })
        }
    }
    // Update Feature
    if (e.target.classList.contains("edit-me")) {
        let userInput = prompt("Enter your desired new text", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)

       if (userInput) {
        axios.post("/update-item", {text: userInput, id: e.target.getAttribute("data-id")}).then(function() {
            e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput;
        }).catch(function() {
            console.log("Please try again later!")
        })
       }
    }
})

/*
Here are the detailed steps needed to achieve this.

The existing commands can be simply run via the CLI terminal of VS-CODE. It is understood that Git is installed in the system, configured with desired username and email Id.

Navigate to the local project directory and create a local git repository:

git init

Once that is successful, click on the 'Source Control' icon on the left navbar in VS-Code.One should be able to see files ready to be commit-ed. Press on 'Commit' button, provide comments, stage the changes and commit the files. Alternatively you can run from CLI

git commit -am "Your comment"

Now you need to visit your GitHub account and create a new Repository. Exclude creating 'README.md', '.gitIgnore' files. Also do not add any License to the repo. Sometimes these settings cause issue while pushing in.

Copy the link to this newly created GitHub Repository.

Come back to the terminal in VS-CODE and type these commands in succession:

git remote add origin <Link to GitHub Repo> //maps the remote repo link to local git repo

git remote -v //this is to verify the link to the remote repo

git push -u origin master // pushes the commit-ed changes into the remote repo

Note: If it is the first time the local git account is trying to connect to GitHub, you may be required to enter credentials to GitHub in a separate window.

You can see the success message in the Terminal. You can also verify by refreshing the GitHub repo online.

*/