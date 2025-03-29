let selectedRating = 0;

// Function to handle star clicks
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function() {
        selectedRating = this.getAttribute("data-value");

        // Reset all stars
        document.querySelectorAll(".star").forEach(s => s.classList.remove("active"));

        // Highlight the selected stars
        for (let i = 0; i < selectedRating; i++) {
            document.querySelectorAll(".star")[i].classList.add("active");
        }
    });
});

// Submit review function
function submitReview() {
    let reviewText = document.getElementById("reviewText").value;
    let reviewerName = document.getElementById("reviewerName").value || "Anonymous";
    
    if (reviewText.trim() === "" || selectedRating === 0) {
        alert("Please enter a review and select a star rating!");
        return;
    }

    let reviewContainer = document.querySelector(".reviews");

    let newReview = document.createElement("div");
    newReview.classList.add("review");

    let starSpan = document.createElement("div");
    starSpan.classList.add("stars");
    starSpan.innerHTML = "⭐".repeat(selectedRating);

    let reviewParagraph = document.createElement("p");
    reviewParagraph.textContent = `"${reviewText}"`;

    let reviewerSpan = document.createElement("span");
    reviewerSpan.textContent = `- ${reviewerName}`;

    newReview.appendChild(starSpan);
    newReview.appendChild(reviewParagraph);
    newReview.appendChild(reviewerSpan);

    reviewContainer.appendChild(newReview);

    // Scroll to the latest review
    reviewContainer.scrollTop = reviewContainer.scrollHeight;

    // Clear form
    document.getElementById("reviewText").value = "";
    document.getElementById("reviewerName").value = "";
    document.querySelectorAll(".star").forEach(star => star.classList.remove("active"));
    selectedRating = 0;
}
