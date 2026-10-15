const dialog = document.querySelector("#info-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogMessage = document.querySelector("#dialog-message");
const dialogDone = document.querySelector("#dialog-done");
const liveRegion = document.querySelector("#live-region");
const seeAllButton = document.querySelector("#see-all-button");
const extraTransactions = document.querySelector("#extra-transactions");

const dialogContent = {
  details: {
    title: "Everyday checking",
    message: "Account ending in 4821 · Balance updated just now. This is a design demo; no account or financial data is connected.",
  },
  profile: {
    title: "Hi, Maya",
    message: "Your profile and account settings would appear here. This demo does not connect to a real banking account.",
  },
};

function openDialog(title, message) {
  dialogTitle.textContent = title;
  dialogMessage.textContent = message;
  if (!dialog.open) {
    dialog.showModal();
  }
  dialogDone.focus();
}

document.querySelectorAll("[data-open-dialog]").forEach((button) => {
  button.addEventListener("click", () => {
    const content = dialogContent[button.dataset.openDialog];
    if (content) {
      openDialog(content.title, content.message);
    }
  });
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => {
    openDialog(
      `${button.dataset.action} — preview`,
      "This is a visual prototype only. No money can be sent, requested, or added from this page.",
    );
  });
});

dialogDone.addEventListener("click", () => dialog.close());

dialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    dialog.close();
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

seeAllButton.addEventListener("click", () => {
  const isExpanded = seeAllButton.getAttribute("aria-expanded") === "true";
  extraTransactions.hidden = isExpanded;
  seeAllButton.setAttribute("aria-expanded", String(!isExpanded));
  seeAllButton.textContent = isExpanded ? "See all" : "Show less";
  liveRegion.textContent = isExpanded
    ? "Earlier transactions hidden."
    : "Two earlier sample transactions shown.";
});

document.querySelectorAll(".navigation-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".navigation-item").forEach((item) => {
      item.classList.remove("is-active");
      item.removeAttribute("aria-current");
    });

    button.classList.add("is-active");
    button.setAttribute("aria-current", "page");
    liveRegion.textContent = `${button.dataset.tab} selected. Navigation is a visual demo.`;
  });
});
