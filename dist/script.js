let searchBtn = document.querySelector(".searchBtn");
let inputText = document.querySelector("input[type='text']");
let phonesContainer = document.querySelector(".phonesContainer");
let loader = document.querySelector(".loader");
let cards = document.querySelectorAll(".card");
let more = document.querySelector("showMore");
async function showData() {
  if (inputText.value.trim() === "") {
    alert("Please enter a search query.");
    return;
  }

  loader.style.display = "block";
  try {
    let url = `https://openapi.programming-hero.com/api/phones?search=${inputText.value.toLowerCase()}`;

    let response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let res = await response.json();
    loader.style.display = "none";

    console.log(res);

    phonesContainer.innerHTML = "";

    res.data.forEach((res, index) => {
      //   console.log(res);

      phonesContainer.innerHTML += `
        <div class="card card-compact w-96 bg-base-100 shadow-xl mt-6">
            <figure class="p-4">
                <img src="${res.image}" alt="Phone">
            </figure>
            <div class="card-body">
                <h2 class="card-title">${res.brand} ${res.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered

                </p>
                <div class="card-actions justify-end">
                <label for="my_modal_6" class="btn showDetail ">Show Details</label>
                
                </div>
            </div>
        </div>`;
    });

    inputText.value = "";
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

phonesContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("showDetail")) {
    console.log(event);
    let card = event.target.closest(".card");

    // Find the image element within the card
    let imageElement = card.querySelector("img");
    let phoneName = card.querySelector(".card-title").innerText;
    let name = document.querySelector(".name");
    name.innerText = phoneName;

    // Extract the image source
    let imageSource = imageElement.src;

    // Update the source of the modelImg element
    let modelImg = document.querySelector(".modelImg");
    modelImg.src = imageSource;
  }
});

searchBtn.addEventListener("click", showData);
