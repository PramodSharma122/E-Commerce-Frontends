/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/*===== Menu Show =====*/

/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/*===== Hide Show =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector(".details_img"),
    smallImg = document.querySelectorAll(".details_small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}
imgGallery();

/*=============== SWIPER CATEGORIES ===============*/
var swiperCategories = new Swiper(".categories_container", {
  spaceBetween: 24,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    350: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
    1200: {
      slidesPerView: 5,
      spacesBetween: 24,
    },
    1400: {
      slidesPerView: 6,
      spaceBetween: 24,
    },
  },
});

/*=============== SWIPER PRODUCTS ===============*/
var swiperProducts = new Swiper(".new_container", {
  spaceBetween: 24,
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  },
});

/*=============== PRODUCTS TABS ===============*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active-tab");
    });
    target.classList.add("active-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active-tab");
    });
    tab.classList.add("active-tab");
  });
});

/*=============== Shop Collection ===============*/
const tab = document.querySelectorAll("[data-target]"),
  tabContent = document.querySelectorAll("[content]");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.target);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    target.classList.add("active");

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");
  });
});

// // DEALS OF THE DAY COUNTDOWN
// const targetDate = new Date("2023-09-30T08:59:59").getTime(); // After i want we change date and time

// function updateCountdown() {
//   const now = new Date().getTime();
//   const timeLeft = targetDate - now;

//   if (timeLeft > 0) {
//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor(
//       (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     document.getElementById("days").innerText = days;
//     document.getElementById("hours").innerText = hours;
//     document.getElementById("minutes").innerText = minutes;
//     document.getElementById("seconds").innerText = seconds;
//   } else {
//     // The countdown has expired, you can add code here for what happens when the offer ends
//     document.querySelector(".deals_countdown-text").innerText =
//       "Offer has ended!";
//     document.querySelector(".countdown").style.display = "none";
//   }
// }
// // Update the countdown every second
// setInterval(updateCountdown, 1000);
// // Initial call to set up the countdown when the page loads
// updateCountdown();

// // seconds DEALS OF THE DAY COUNTDOWN
// const targetDate1 = new Date("2023-09-30T08:59:59").getTime(); // After i want we change date and time

// function updateCountdown1() {
//   const now = new Date().getTime();
//   const timeLeft = targetDate1 - now;

//   if (timeLeft > 0) {
//     const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
//     const hours = Math.floor(
//       (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//     );
//     const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

//     document.getElementById("days1").innerText = days;
//     document.getElementById("hours1").innerText = hours;
//     document.getElementById("minutes1").innerText = minutes;
//     document.getElementById("seconds1").innerText = seconds;
//   } else {
//     // The countdown has expired, you can add code here for what happens when the offer ends
//     document.querySelector(".deals_countdown-text1").innerText =
//       "Offer has ended!";
//     document.querySelector(".countdown1").style.display = "none";
//   }
// }
// // Update the countdown every second
// setInterval(updateCountdown1, 1000);
// // Initial call to set up the countdown when the page loads
// updateCountdown1();



// ADD TO CART LOGIC
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCountElement = document.getElementById("cart-count");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });
  updateCartCount();

  function addToCart(event) {
    const button = event.target;
    const productImages = button.getAttribute("data-image");
    const productName = button.getAttribute("data-name");
    const productPrice = parseFloat(button.getAttribute("data-price"));

    // Add the product to the shopping cart (localStorage)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity++;
      existingItem.subtotal = existingItem.quantity * productPrice;
    } else {
      cart.push({
        image: productImages,
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
    updateCartCount();
  }

  // Handle removal of items from the cart
  // cartTable.addEventListener("click", function (e) {
  //     if (e.target.classList.contains("remove")) {
  //         const index = e.target.getAttribute("data-index");
  //         cart.splice(index, 1);

  //         // Update cart and localStorage after removal
  //         localStorage.setItem("cart", JSON.stringify(cart));

  //         displayCart();

  //         // Update the cart count after removal
  //         updateCartCount();
  //     }
  // });

  // Function to update the cart count
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    cartCountElement.textContent = totalQuantity;
  }
});
