document.addEventListener("DOMContentLoaded", () => {
  var recipes = Array.from(document.querySelectorAll(".recipe-box"));
  var globalButton = document.querySelectorAll(".another-recipe-btn");

  function showRecipeByIndex(idx) {
    recipes.forEach((r, i) => {
      if (i === idx) {
        r.classList.add("active");
      } else {
        r.classList.remove("active");
      }
    });

    var active = recipes[idx];
    if (active) {
      initTabsForRecipe(active);
      var firstTab = active.querySelector(".tab-btn");
      if (firstTab) {
        activateTab(firstTab, active);
      }
    }
  }
  // Show a random recipe
  function showRandomRecipe() {
    if (recipes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * recipes.length);
    showRecipeByIndex(randomIndex);
  }
  // Setup taps for a specific recipe element
  function initTabsForRecipe(recipeEl) {
    var tabs = Array.from(recipeEl.querySelectorAll(".tab-btn"));
    var contents = Array.from(recipeEl.querySelectorAll(".tab-content"));
    contents.forEach(c => c.classList.remove("show"));
    tabs.forEach(tab => {

      if (!tab.__tabsBound) {
        tab.addEventListener("click", () => activateTab(tab, recipeEl));
        tab.__tabsBound = true;
      }
    });
  }

  function activateTab(tabBtn, recipeEl) {
    var tabs = Array.from(recipeEl.querySelectorAll(".tab-btn"));
    var contents = Array.from(recipeEl.querySelectorAll(".tab-content"));

    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("show"));

    tabBtn.classList.add("active");

    var targetName = tabBtn.dataset.target;

    var targetEl = recipeEl.querySelector(`#${targetName}`);
    if (!targetEl) {
      targetEl = recipeEl.querySelector(`.${targetName}`);
    }
    if (targetEl) {
      targetEl.classList.add("show");
    }
  }
  recipes.forEach(recipe => initTabsForRecipe(recipe));
  showRandomRecipe();
  globalButton.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      showRandomRecipe();
    });
  }
  );
});





