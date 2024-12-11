(function () {
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

  kintone.events.on("app.record.detail.show", (event) => {
    //Initialize Style
    document.querySelectorAll("div:has(> #record-gaia)").forEach((element) => {
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

    const customTabHTML = `
      <div id="tabs" class="tabs">
        <ul>
          <li id="client-manage" class="tab active">顧客管理</li>
          <li id="client-info01" class="tab">顧客情報（代表者）</li>
          <li id="client-info02" class="tab">顧客情報②（パートナー）</li>
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

    // Show default tab content
    toggleFieldsByTab("顧客管理");

    // Map tab IDs to their corresponding field names
    const tabFieldMap = {
      "client-manage": "顧客管理",
      "client-info01": "顧客情報_代表者",
      "client-info02": "顧客情報2_パートナー",
      "visitor-survey": "来場アンケートについて",
      land: "土地について",
      contract: "契約書情報",
    };

    // Add click handlers to all tabs
    Object.entries(tabFieldMap).forEach(([tabId, fieldName]) => {
      document
        .querySelector(`#${tabId}`)
        .addEventListener("click", function () {
          toggleFieldsByTab(fieldName);
          setActiveTab(this);
        });
    });

    return event;
  });
})();
