async function fetchPosts() {
    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
            <p class="post-text">${post.content}</p>
            <button class="delete-btn" onclick="deletePost('${post._id}')">
                <i class="fas fa-trash-alt"></i> <!-- Font Awesome delete icon -->
            </button>
        `;
        postsContainer.appendChild(div);
    });
}

async function createPost() {
    const content = document.getElementById("postContent").value;
    if (content.trim() === "") {
        alert("Post cannot be empty!");
        return;
    }
    await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
    });
    document.getElementById("postContent").value = "";
    fetchPosts();
}

async function deletePost(id) {
    if (confirm("Are you sure you want to delete this post?")) {
        await fetch(`http://localhost:3000/posts/${id}`, { method: "DELETE" });
        fetchPosts();
    }
}

fetchPosts();
