// alert("JavaScript Connected");
function toggleSidebar() {
  const sidebar=document.getElementById("sidebar");
  const overlay=document.getElementById("overlay");
  
  sidebar.classList.toggle("active");

  if(sidebar.classList.contains("active")){
    overlay.style.display="block";
  }
  else{
    overlay.style.display="none";
  }
}

function closeSidebar(){
  document.getElementById("sidebar").classList.remove("active");
  document.getElementById("overlay").style.display="none";
}

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

function toggleSearch() {
  document.querySelector(".search-box").classList.toggle("active");
  document.getElementById("searchInput").focus();
}

function handleSearch() {
  const input = document.getElementById("searchInput");
  const value = input.value.toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");

  suggestionsBox.innerHTML = "";

  if (value === "") {
    suggestionsBox.style.display = "none";
    return;
  }

  // Filter matching history
  const matches = searchHistory.filter(item =>
    item.toLowerCase().includes(value)
  );

  matches.forEach(match => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.innerText = match;

    div.onclick = () => {
      input.value = match;
      suggestionsBox.style.display = "none";
    };

    suggestionsBox.appendChild(div);
  });

  suggestionsBox.style.display = matches.length ? "block" : "none";
}

// Save search on Enter key
document.getElementById("searchInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {

    const value = this.value.trim();

    if (value && !searchHistory.includes(value)) {
      searchHistory.unshift(value);

      // Keep only last 10 searches
      searchHistory = searchHistory.slice(0, 10);

      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    }

    document.getElementById("suggestions").style.display = "none";
  }
});
