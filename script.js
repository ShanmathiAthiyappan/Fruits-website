//-------------------------------------------------------------------------- LOADING PAGE

document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("visited")) {
        // First-time visit: show loading screen
        document.getElementById("mainContent").classList.add("hidden");

        setTimeout(() => {
            document.querySelector(".spinner-border").style.display = "none"; // Hide loader
            document.getElementById("startButton").style.display = "block"; // Show button smoothly
            document.getElementById("startButton").classList.add("fade-in"); // Add fade-in animation
        }, 1000);
    } else {
        // If visited before, hide the loading screen immediately
        document.getElementById("loadingScreen").style.display = "none";
        document.getElementById("mainContent").classList.remove("hidden");
    }
});

document.getElementById("startButton").addEventListener("click", () => {
    sessionStorage.setItem("visited", "true"); // Store visit info
    document.getElementById("loadingScreen").classList.add("hidden");
    document.getElementById("mainContent").classList.remove("hidden");
});

//--------------------------------------------------------------------------LOGIN/REGISTER POP
 
 // Show the popup when the page loads
 window.onload = function () {
    let popup = document.getElementById("welcomePopup");
    popup.style.display = "block"; // Show popup

    // Hide popup after 3 seconds
    setTimeout(function () {
        popup.style.display = "none"; // Hide popup
    }, 3500);
};

//---------------------------------------------------------------------------PRICE UPDATE DEPENDES OF QUANTITY (fruits secyion)

function updatePrice(selectElement) {
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let newPrice = selectedOption.getAttribute("data-price");
    let originalPrice = selectedOption.getAttribute("data-original");

    let card = selectElement.closest(".card");
    let discountedPriceElement = card.querySelector(".discounted-price");
    let originalPriceElement = card.querySelector(".original-price");

    discountedPriceElement.textContent = "₹" + newPrice;
    originalPriceElement.textContent = "₹" + originalPrice;
}

function showPopup(button) {
    let card = button.closest(".card");
    let popup = card.querySelector(".popup");

    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

//--------------------------------------------------------------------------- SHO WTHE PRICE AMOUNT ON THE PAYMENT 

function storeOrder() {
    let fruitSelect = document.getElementById("fruit");
    let quantitySelect = document.getElementById("quantity");

    let pricePerUnit = fruitSelect.options[fruitSelect.selectedIndex].getAttribute("data-price");
    let quantity = quantitySelect.value;

    let totalPrice = (pricePerUnit / 250) * quantity;

    // Store only the total price in localStorage
    localStorage.setItem("totalPrice", totalPrice);

    // Redirect to payment page
    window.location.href = "payment.html";
}

//--------------------------------------------------------------------------- SHO WTHE PRICE AMOUNT ON THE PAYMENT 

document.addEventListener("DOMContentLoaded", function() {
    let totalPrice = localStorage.getItem("totalPrice");
    if (totalPrice) {
        document.getElementById("totalPrice").innerText = totalPrice;
    } else {
        document.getElementById("totalPrice").innerText = "0";
    }
});