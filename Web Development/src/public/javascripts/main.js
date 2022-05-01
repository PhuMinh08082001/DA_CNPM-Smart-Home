var user = document.querySelectorAll(".fa-user");
const listGroup = document.querySelector(".list-group");
user[0].addEventListener("click", () => {
    listGroup.classList.toggle("active");
});

document.body.addEventListener("click", (e) => {
    if (!e.target.classList.contains("fa-user")) {
        if (listGroup.classList.contains("active")) {
            listGroup.classList.remove("active");
        } else {
            console.log("2");
        }
    }
});