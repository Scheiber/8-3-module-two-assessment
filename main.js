const BASE_URL = "https://ghibliapi.herokuapp.com/";

fetch(`${BASE_URL}films`)
  .then((response) => response.json())
  .then((films) => {
    const titles = document.querySelector("#titles");
    for (const film of films) {
      const option = document.createElement("option");
      option.textContent = film.title;
      option.setAttribute("value", film.title);
      titles.append(option);
    }

    let selectedFilm;
    const displayInfo = document.querySelector("#display-info");

    titles.addEventListener("change", () => {
      for (const film of films) {
        const filmReleasedDate = film.release_date;
        const filmDescription = film.description;

        if (titles.value === film.title) {
          selectedFilm = film;
          displayInfo.innerHTML = `<h3>${film.title}</h3>
            <p id="film-released-date">${filmReleasedDate}</p>
            <p id="film-description">${filmDescription}</p>`;
        }
      }
    });

    const reviewList = document.querySelector("#review-list");
    const reviewForm = document.querySelector("form");

    reviewForm.addEventListener("submit", (event) => {
      event.preventDefault();
      newFilm = document.createElement("li");
      if (!selectedFilm) {
        alert("Please select a movie first");
      }
      newFilm.innerHTML = `<strong>${selectedFilm.title}:</strong> ${event.target.review.value}`;
      reviewList.append(newFilm);
      event.target.reset();
    });

    const resetReviews = document.getElementById("reset-reviews");

    resetReviews.addEventListener("click", (event) => {
      event.preventDefault();
      reviewList.innerHTML = "";
    });
  });

fetch(`${BASE_URL}people`)
  .then((response) => response.json())
  .then((people) => {})

  .catch((error) => {
    console.log(error);
  });
