import clickHomeData from "./all-page-content/click_home_data.js";
import clickOutdoorData from "./all-page-content/click_outdoor_data.js";
import clickFoodData from "./all-page-content/click_food_data.js";
import clickBeautyData from "./all-page-content/click_beauty_data.js";
import clickBehaviorData from "./all-page-content/click_behavior_data.js";
import clickExerciseData from "./all-page-content/click_exercise_data.js";
import healthData from "./all-page-content/health-data.js";

const searchOnClickPage = document.getElementById("search-input--element");
const searchSuggestiosnDiv = document.getElementById("searchOptions");

searchOnClickPage &&
  searchOnClickPage.addEventListener("input", getSearchResultFromAllPages);

window.addEventListener("DOMContentLoaded", (event) => {
  checkIfSectionToGo();
  if (localStorage.getItem("searchedSections")) {
    localStorage.removeItem("searchedSections");
  }
});

function checkIfSectionToGo() {
  if (localStorage.getItem("searchedSections")) {
    const sectionToGo = document.getElementById(
      localStorage.getItem("searchedSections")
    );

    if (!sectionToGo) return;

    if (sectionToGo.dataset && sectionToGo.dataset.type === "accordion") {
      console.log(sectionToGo.nextElementSibling);
      sectionToGo.click();
      setTimeout(() => {
        sectionToGo.scrollIntoView({ block: "center" });
      }, 300);
    } else {
      sectionToGo.scrollIntoView({ block: "center" });
    }
  }
}

window.addEventListener("storage", () => {
  // When local storage changes, dump the list to
  // the console.
});

const contentData = [
  {
    title: "בית",
    searchedPage: "click",
    data: clickHomeData,
    gotoPage: "click_home",
    },
  {
    title: "בחוץ",
    searchedPage: "click",
    data: clickOutdoorData,
    gotoPage: "click_outdoor",
  },
  {
    title: "אוכל",
    searchedPage: "click",
    data: clickFoodData,
    gotoPage: "click_food",
  },
  {
    title: "טיפוח",
    searchedPage: "click",
      data: clickBeautyData,
    gotoPage: "click_beauty",
    },
    {
    title: "משמעת",
    searchedPage: "click",
    data: clickBehaviorData,
    gotoPage: "click_behavior",
  },
  {
    title: "תרגולים",
    searchedPage: "click",
    data: clickExerciseData,
    gotoPage: "click_exercise",
  },
  {
    title: "רפואי",
    searchedPage: "health",
    data: healthData,
    gotoPage: "health",
  },
];

const generateListSuggestions = (searchSuggestions) => {
  searchSuggestions.forEach((suggestion) => {
    const searchSuggestionsCard = document.createElement("div");

    searchSuggestionsCard.classList.add("box");

    const searchSuggestionsText = document.createElement("p");
    searchSuggestionsText.textContent = suggestion.headline;
    searchSuggestionsCard.appendChild(searchSuggestionsText);

    searchSuggestionsCard.addEventListener("click", () => {
      goToPageAfterSearchClick(suggestion);
    });
    document.getElementById("searchOptions").appendChild(searchSuggestionsCard);
  });
};
function getSearchResultFromAllPages(e) {
  searchSuggestiosnDiv.innerHTML = "";

  const currentPage = document.body.dataset.page;

  const text = e.target.value;

  if (text.length === 0) {
    searchSuggestions = [];
  }
  let searchSuggestions = [];

  const currentPageData = contentData.filter(
    (data) => data.searchedPage === currentPage
  );

  for (let index = 0; index < currentPageData.length; index++) {
    const obj = currentPageData[index];

    obj.data.forEach((dataObj) => {
      if (dataObj.allText.indexOf(text) >= 0) {
        searchSuggestions.push({
          ...dataObj,
          page: obj.gotoPage,
        });
      }
    });
  }

  console.log("suggstion before for reach", searchSuggestions);

  // if (searchSuggestions.length > 0) break;
  if (searchSuggestions.length === 0) return;

  console.log("צור תוצאות חיפוש לפי", searchSuggestions);

  generateListSuggestions(searchSuggestions);
}
function goToPageAfterSearchClick(suggestion) {
  console.log(suggestion);
  localStorage.setItem("searchedSections", suggestion.id);

  console.log(suggestion.page);
  const url = `${suggestion.page}.html`;
  window.open(url, "_self");
}
