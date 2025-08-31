 const editor = document.getElementById("editor");
    const previewContent = document.getElementById("previewContent");
    const blogsContainer = document.getElementById("blogs");
    const saveBtn = document.getElementById("saveBtn");

    let editIndex = null; // Track if editing a blog

    // Live preview update
    editor.addEventListener("input", () => {
      previewContent.innerHTML = marked.parse(editor.value);
    });

    // Save blog (new or update)
    function saveBlog() {
      const content = editor.value.trim();
      if (!content) {
        alert("⚠️ Write something before saving!");
        return;
      }

      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

      if (editIndex !== null) {
        blogs[editIndex] = content;
        editIndex = null;
        saveBtn.innerText = "💾 Save Blog";
      } else {
        blogs.push(content);
      }

      localStorage.setItem("blogs", JSON.stringify(blogs));
      editor.value = "";
      previewContent.innerHTML = "";
      loadBlogs();
    }

    // Edit blog
    function editBlog(index) {
      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      editor.value = blogs[index];
      previewContent.innerHTML = marked.parse(blogs[index]);
      editIndex = index;
      saveBtn.innerText = "✅ Update Blog";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Delete blog
    function deleteBlog(index) {
      if (!confirm("🗑️ Are you sure you want to delete this blog?")) return;
      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.splice(index, 1);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      loadBlogs();
    }

    // Load blogs
    function loadBlogs() {
      blogsContainer.innerHTML = "";
      let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.forEach((blog, index) => {
        const div = document.createElement("div");
        div.className = "blog-post";
        div.innerHTML = `
          <h3>Blog ${index + 1}</h3>
          ${marked.parse(blog)}
          <div class="blog-actions">
            <button class="edit-btn" onclick="editBlog(${index})">✏️ Edit</button>
            <button class="delete-btn" onclick="deleteBlog(${index})">🗑️ Delete</button>
          </div>
        `;
        blogsContainer.appendChild(div);
      });
    }

    // Initialize
    loadBlogs();