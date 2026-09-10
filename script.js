//-------------------------------------------------------------------------- LOADING PAGE

document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loadingScreen");
    const mainContent = document.getElementById("mainContent");
    const startButton = document.getElementById("startButton");
    const spinner = document.querySelector(".spinner-border");

    if (loadingScreen && mainContent) {
        if (!sessionStorage.getItem("visited")) {
            mainContent.classList.add("hidden");

            setTimeout(() => {
                if (spinner) spinner.style.display = "none";
                if (startButton) {
                    startButton.style.display = "block";
                    startButton.classList.add("fade-in");
                }
            }, 800);
        } else {
            loadingScreen.style.display = "none";
            mainContent.classList.remove("hidden");
        }
    }

    if (startButton) {
        startButton.addEventListener("click", () => {
            sessionStorage.setItem("visited", "true");
            if (loadingScreen) loadingScreen.classList.add("hidden");
            if (mainContent) mainContent.classList.remove("hidden");
        });
    }
});

//--------------------------------------------------------------------------LOGIN/REGISTER POP
 
window.addEventListener("load", function () {
    let popup = document.getElementById("welcomePopup");
    if (popup) {
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 3500);
    }
});

//---------------------------------------------------------------------------PRICE UPDATE DEPENDS ON QUANTITY (fruits section)

function updatePrice(selectElement) {
    let selectedOption = selectElement.options[selectElement.selectedIndex];
    let newPrice = selectedOption.getAttribute("data-price");
    let originalPrice = selectedOption.getAttribute("data-original");

    let card = selectElement.closest(".card");
    let discountedPriceElement = card.querySelector(".discounted-price");
    let originalPriceElement = card.querySelector(".original-price");

    if (discountedPriceElement) discountedPriceElement.textContent = "₹" + newPrice;
    if (originalPriceElement) originalPriceElement.textContent = "₹" + originalPrice;
}

function showPopup(button) {
    let card = button.closest(".card");
    let popup = card.querySelector(".popup");

    if (popup) {
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 1800);
    }
}

//--------------------------------------------------------------------------- SEARCH FRUITS QUICK FILTER (Only 6 lines)

function filterFruitCards() {
    let query = document.getElementById("searchFruit").value.toLowerCase();
    let cards = document.querySelectorAll(".fruit-item");

    cards.forEach(card => {
        let fruitName = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = fruitName.includes(query) ? "block" : "none";
    });
}

//--------------------------------------------------------------------------- REAL-TIME ORDER PRICE PREVIEW

function calculateOrderPreview() {
    let fruit = document.getElementById("fruit");
    let qty = document.getElementById("quantity");
    let preview = document.getElementById("previewPrice");

    if (fruit && qty && preview) {
        let pricePerKg = parseFloat(fruit.options[fruit.selectedIndex].getAttribute("data-price")) || 0;
        let selectedQty = parseFloat(qty.value) || 1;
        preview.innerText = "₹" + Math.round(pricePerKg * selectedQty);
    }
}

//--------------------------------------------------------------------------- STORE ORDER & REDIRECT

function storeOrder() {
    let fruitSelect = document.getElementById("fruit");
    let quantitySelect = document.getElementById("quantity");

    if (fruitSelect && quantitySelect) {
        let pricePerKg = parseFloat(fruitSelect.options[fruitSelect.selectedIndex].getAttribute("data-price")) || 0;
        let quantity = parseFloat(quantitySelect.value) || 1;
        let totalPrice = Math.round(pricePerKg * quantity);

        localStorage.setItem("totalPrice", totalPrice);
        window.location.href = "payment.html";
    }
}

//--------------------------------------------------------------------------- PAYMENT PAGE LOGIC & TAB SWITCH

function switchPayment(method, btn) {
    document.querySelectorAll(".method-box").forEach(box => box.classList.remove("active"));
    document.querySelectorAll(".pay-tab-nav button").forEach(b => b.classList.remove("active"));
    
    document.getElementById(method + "-method").classList.add("active");
    btn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", function() {
    let totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
        let price = localStorage.getItem("totalPrice");
        totalPriceElement.value = price ? price : "140";
    }

    const paymentForm = document.getElementById("payment-form");
    if (paymentForm) {
        paymentForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const message = document.getElementById("message");
            if (message) {
                message.style.color = "green";
                message.textContent = "✅ Order placed successfully! Harvest is on its way.";
            }
            localStorage.removeItem("totalPrice");
            setTimeout(() => {
                window.location.href = "home.html";
            }, 2500);
        });
    }
});