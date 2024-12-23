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
      let $appHeader = $(".gaia-argoui-app-titlebar");
      let themeColor = $appHeader.css("backgroundColor");

      // Initialize Style
      $("body").css("backgroundColor", "#e9f3fb");
      $("div:has(> #record-gaia)").css("backgroundColor", "#e9f3fb");
      $("#record-gaia").css("width", "calc(100% - 368px)");
      $(".layout-gaia").css({
        width: "auto",
        paddingRight: "0",
      });
      $(".control-group-field-gaia").css({
        minWidth: "auto",
        width: "calc(100% - 62px)",
      });
      $(".control-gaia:not(.control-group-field-gaia)").css("width", "400px");
      $(".control-value-gaia").css("textAlign", "left");
      $(".control-etc-gaia.control-spacer-field-gaia").css("minWidth", "250px");
      $(".control-etc-gaia.control-hr-field-gaia").css("height", "28px");
      for (let i = 8239193; i <= 8239208; i += 2) {
        $(`.row-gaia .control-gaia.field-${i}`).css(
          "borderRight",
          "1px solid #ccc"
        );
      }
      $("textarea").css("width", "100%");
      $(".textarea-resize-cybozu").css({ left: "auto", right: "0" });

      // Format the date
      const classForDateFormat = [
        ".control-gaia.control-date-field-gaia .control-value-content-gaia",
        ".control-gaia.control-modified_at-field-gaia .control-value-content-gaia",
        ".control-gaia.control-created_at-field-gaia .control-value-content-gaia",
      ];

      setTimeout(() => {
        $(classForDateFormat.join(", ")).each(function () {
          let originalValue = $(this).text().trim();
          if (originalValue) {
            $(this).html(convertToJapaneseDateTime(originalValue));
          }
        });
      }, 1000);

      // First check if tabs element already exists
      if (!$("#tabs").length) {
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

        $("#record-gaia").before(customTabHTML);
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
        return $("<button>")
          .text(text)
          .css({
            backgroundColor: "#448aca",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
          })
          .on("click", () => toggleFieldsByTab(clickHandler));
      };

      // Create and append partner button
      $("#user-js-client-self-wrapper").append(
        createButton("顧客情報（パートナー）", "顧客情報2_パートナー")
      );

      // Create and append representative button
      $("#user-js-client-partner-wrapper").append(
        createButton("顧客情報（代表者）", "顧客情報_代表者")
      );

      return event;
    }
  );
})();

// Handle tab click
function handleTabClick(tabFieldMap) {
  $.each(tabFieldMap, function (tabId, fieldName) {
    $(`#${tabId}`).on("click", function () {
      toggleFieldsByTab(fieldName);
      setActiveTab($(this));
    });
  });
}

// Helper function to manage the active tab styling
function setActiveTab($activeTab) {
  $(".tab").removeClass("active");
  $activeTab.addClass("active");
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
    if (activeField === "顧客管理") {
      kintone.app.record.setFieldShown("アクション履歴", true);
    } else {
      kintone.app.record.setFieldShown("アクション履歴", false);
    }
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
