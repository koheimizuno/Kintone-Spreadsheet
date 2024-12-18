(function () {
  "use strict";
  kintone.events.on(
    [
      "app.record.create.show",
      "app.record.create.submit",
      "app.record.create.submit.success",
      "app.record.edit.show",
      "app.record.edit.submit",
      "app.record.edit.submit.success",
      "app.record.index.edit.submit",
      "app.record.index.edit.submit.success",
      "app.record.detail.show",
      "app.record.detail.submit",
      "app.record.detail.submit.success",
    ],
    (event) => {
      let appHeader = document.querySelector(".gaia-argoui-app-titlebar");
      let themeColor = getComputedStyle(appHeader).backgroundColor;
      console.log("Current Theme Color:", themeColor);
      //Initialize Style
      document
        .querySelectorAll("div:has(> #record-gaia)")
        .forEach((element) => {
          element.style.backgroundColor = "#e9f3fb";
        });

      document.querySelectorAll("#record-gaia").forEach((element) => {
        element.style.width = "calc(100% - 368px)";
      });

      document.querySelectorAll(".layout-gaia").forEach((element) => {
        element.style.width = "auto";
        element.style.paddingRight = "0";
      });

      document
        .querySelectorAll(".control-group-field-gaia")
        .forEach((element) => {
          element.style.minWidth = "auto";
          element.style.width = "calc(100% - 62px)";
        });

      document.querySelectorAll(".control-show-gaia").forEach((element) => {
        element.style.width = "400px";
      });

      document.querySelectorAll(".control-value-gaia").forEach((element) => {
        element.style.textAlign = "left";
      });

      document
        .querySelectorAll(".control-etc-gaia.control-spacer-field-gaia")
        .forEach((element) => {
          element.style.minWidth = "250px";
        });

      // Format the date
      const classForDateFormat = [
        ".control-gaia.control-date-field-gaia .control-value-content-gaia",
        ".control-gaia.control-modified_at-field-gaia .control-value-content-gaia",
        ".control-gaia.control-created_at-field-gaia .control-value-content-gaia",
      ];

      classForDateFormat.forEach((element) => {
        document.querySelectorAll(element).forEach((element) => {
          let originalValue = element.innerHTML.trim();
          if (originalValue) {
            element.innerHTML = convertToJapaneseDateTime(originalValue);
          }
        });
      });

      // First check if tabs element already exists
      if (!document.getElementById("tabs")) {
        const customTabHTML = `
        <div id="tabs" class="tabs">
          <ul>
            <li id="client-manage" class="tab active">顧客管理</li>
            <li id="client-info" class="tab">顧客情報</li>
            <li id="visitor-survey" class="tab">来場アンケートについて</li>
            <li id="land" class="tab">土地について</li>
            <li id="contract" class="tab">契約書情報</li>
          </ul>
        </div>
      `;

        const recordGaiaElement = document.querySelector("#record-gaia");
        if (recordGaiaElement) {
          recordGaiaElement.insertAdjacentHTML("beforebegin", customTabHTML);
        }
      }

      // Show default tab content
      toggleFieldsByTab("顧客管理");

      // Map tab IDs to their corresponding field names
      const tabFieldMap = {
        "client-manage": "顧客管理",
        "client-info": "顧客情報_代表者", //"顧客情報2_パートナー"
        "visitor-survey": "来場アンケートについて",
        land: "土地について",
        contract: "契約書情報",
      };

      handleTabClick(tabFieldMap);

      // Helper function to create button with common styles
      const createButton = (text, clickHandler) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        Object.assign(btn.style, {
          backgroundColor: "#448aca",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
        });
        btn.addEventListener("click", () => toggleFieldsByTab(clickHandler));
        return btn;
      };

      // Create and append partner button
      const clientSelfWrapper = document.getElementById(
        "user-js-client-self-wrapper"
      );
      clientSelfWrapper?.appendChild(
        createButton("顧客情報（パートナー）", "顧客情報2_パートナー")
      );

      // Create and append representative button
      const clientPartnerWrapper = document.getElementById(
        "user-js-client-partner-wrapper"
      );
      clientPartnerWrapper?.appendChild(
        createButton("顧客情報（代表者）", "顧客情報_代表者")
      );

      return event;
    }
  );
})();

// Handle tab click
function handleTabClick(tabFieldMap) {
  Object.entries(tabFieldMap).forEach(([tabId, fieldName]) => {
    document.querySelector(`#${tabId}`).addEventListener("click", function () {
      toggleFieldsByTab(fieldName);
      setActiveTab(this);
    });
  });
}
// Helper function to manage the active tab styling
function setActiveTab(activeTab) {
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("active"));
  activeTab.classList.add("active");
}

// Helper function to toggle field visibility
function toggleFieldsByTab(activeField) {
  const fields = [
    "顧客管理",
    "顧客情報_代表者",
    "顧客情報2_パートナー",
    "来場アンケートについて",
    "土地について",
    "契約書情報",
  ];

  fields.forEach((field) => {
    kintone.app.record.setFieldShown(field, field === activeField);
  });
}

// フォームの日付を2024年12月1日 01時50分の形式に変更する
function convertToJapaneseDateTime(dateStr) {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are zero-indexed
  const day = date.getDate();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const hasTime = dateStr.includes(":");

  return hasTime
    ? `${year}年${month}月${day}日 ${hours}:${minutes}`
    : `${year}年${month}月${day}日`;
}
