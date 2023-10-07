/*===== クッキー登録 =====*/
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/*===== クッキーを取得 =====*/
function getCookie(name) {
  const value = "; " + document.cookie; // 全てのクッキーの文字列を取得し、先頭に"; "を追加
  const parts = value.split("; " + name + "="); // クッキーの文字列を分割し、指定された名前の前にある部分と後ろにある部分を配列に格納
  if (parts.length === 2) {
    return parts.pop().split(";").shift(); // 名前が見つかった場合、その値を取得し返します
  } else {
    return ""; // 名前が見つからなかった場合、空の文字列を返します
  }
}

/*===== オープニングアニメーション =====*/
const animation = document.querySelector(".js-op-animation");
const mask = document.querySelector(".js-op-animation-mask");
const title1 = document.querySelector(".js-op-animation-title1-block");
const title2 = document.querySelector(".js-op-animation-title2-block");
const imgLeft = document.querySelector(".js-op-animation-left");
const imgRight = document.querySelector(".js-op-animation-right");
const animationTl = gsap.timeline({
  defaults: {
    duration: 1,
  },
});

/*===== アニメーション再生 =====*/
function playAnimation() {
  // タイムライン
  animationTl
    .to(title1, {
      scale: 1,
      autoAlpha: 1,
    })
    .to(title1, {
      autoAlpha: 0,
    })
    .to(
      imgLeft,
      {
        y: 0,
        autoAlpha: 1,
      },
      ">=.3"
    )
    .to(
      imgRight,
      {
        y: 0,
        autoAlpha: 1,
      },
      "<"
    )
    .to(title2, {
      autoAlpha: 1,
    })
    .to(
      animation,
      {
        autoAlpha: 0,
        duration: 1.5,
        ease: "power4.inOut",
      },
      "+=1"
    );
}
// オープニングアニメーションに関わる要素を非表示
function hideAnimation() {
  gsap.set(".js-op-animation", {
    autoAlpha: 0,
  });
}

/*===== mvスライダー =====*/
//オープニングアニメーションが 有・なし で、始まるタイミングをズラしたい。
function mvSwiper() {
  new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 2000,
  });
}
// まず最初に読み込まれる所
document.addEventListener("DOMContentLoaded", function () {
  const animationPlayed = getCookie("animationPlayed");
  if (animationPlayed) {
    hideAnimation();
    mvSwiper();
  } else {
    playAnimation();
    setCookie("animationPlayed", "true", 1);

    setTimeout(function () {
      mvSwiper();
      //スライダーのズラした時間
    }, 6000);
  }
});

/*===== ページスクロール =====*/
// document.querySelectorAll('a[href^="#"]').forEach(function (link) {
//   link.addEventListener("click", function (event) {
//     event.preventDefault();
//     // リンクを取得
//     const href = link.getAttribute("href");
//     // ヘッダーの高さ
//     const header = document.querySelector("header").offsetHeight;
//     // ジャンプ先のid名をセット
//     const target = href === "#" || href === "" ? document.documentElement : document.querySelector(href);
//     // トップからジャンプ先の要素までの距離を取得
//     const position = target.offsetTop - header - 200;
//     // スムーススクロールを行う
//     // 600はスクロール速度で単位はミリ秒
//     window.scrollTo({
//       top: position,
//       behavior: "smooth",
//     });
//   });
// });

/*===== page-top =====*/
//スクロールした時に処理を実行
window.addEventListener("scroll", function () {
  //トップへ戻るボタンを取得
  let topBtn = document.querySelector(".js-footer-top-btn");

  //画面上部からトップビジュアル下の位置取得
  const topVisual = document.querySelector(".js-mv").getBoundingClientRect().bottom;

  //トップビジュアル下の位置より下にスクロールされたらactiveクラウを付与
  if (topVisual <= 0) {
    topBtn.classList.add("is-active");
  } else {
    //スクロールが200px未満のときactiveクラスを外す
    topBtn.classList.remove("is-active");
  }
  //ドキュメントの高さ
  const scrollHeight = document.body.clientHeight;

  //スクロール位置
  const scrollPosition = window.pageYOffset;

  //windowの高さ
  const windowHeignt = window.innerHeight;

  //footer取得
  const footer = document.querySelector("footer");

  //footerの高さ
  const footerHeight = footer.offsetHeight;
  if (scrollHeight - scrollPosition - windowHeignt <= footerHeight) {
    topBtn.classList.add("is-stop");
  } else {
    topBtn.classList.remove("is-stop");
  }
});

/*===== ハンバーガーボタン =====*/
const hamburger = document.querySelector(".js-hamburger");
const modal = document.querySelector(".js-modal");

hamburger.addEventListener("click", toggleModal);
function toggleModal() {
  document.body.classList.toggle("is-active");
  hamburger.classList.toggle("is-active");
  modal.classList.toggle("is-active");
}

/*===== 画像アニメーション =====*/
const triggers = document.querySelectorAll(".js-trigger");
triggers.forEach((trigger) => {
  const images = trigger.querySelectorAll(".js-trigger img");
  //タイムラインでスクロールトリガーを定義
  const imagesTl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: "top 90%",
    },
  });

  imagesTl
    .to(trigger, {
      "--clippath": "inset(0 0 0 0%)",
      duration: 0.7,
    })
    .to(images, {
      clipPath: "inset(0 0 0 0%)",
    });
});

/*===== Campaignスライダー =====*/
const swiper1 = new Swiper(".js-campaign-swiper-container", {
  loop: true, // デフォルトはfalse
  autoplay: {
    // 自動再生
    delay: 2000, // 1秒後に次のスライド（初期値：3000）
    disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    // スライドの表示枚数
  },
  speed: 1000,
  slidesPerView: "auto",
  spaceBetween: 24,
  breakpoints: {
    768: {
      spaceBetween: 40,
    },
  },

  navigation: {
    nextEl: ".swiper-button-next.js-campaign-swiper-next",
    prevEl: ".swiper-button-prev.js-campaign-swiper-prev",
  },
});

/*===== archive_aboutのモーダル =====*/
// クリックイベントを設定するための要素を取得
var aboutImagesModal = document.querySelector(".js-gallery");
if (aboutImagesModal) {
  var images = document.querySelectorAll(".js-gallery img");
  images.forEach(function (image) {
    image.addEventListener("click", function () {
      aboutImagesModal.innerHTML = this.outerHTML;
      // モーダルを表示する
      aboutImagesModal.style.display = "block";
      aboutImagesModal.classList.add("is-show");
      document.body.classList.add("is-active");
    });
  });
  aboutImagesModal.addEventListener("click", function () {
    // 非表示にする
    aboutImagesModal.style.display = "none";
    aboutImagesModal.classList.remove("is-show");
    document.body.classList.remove("is-active");
  });
}

/*===== Informationタブ =====*/
// 最初のコンテンツを表示
const firstContent = document.querySelector(".js-cards4-item:first-of-type");
if (firstContent) {
  firstContent.style.display = "block";
  // タブ要素を取得
  const tabs = document.querySelectorAll(".js-information-tab");
  // タブがクリックされたときの処理を設定
  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      // 現在の選択されているタブから "current" クラスを削除
      const currentTab = document.querySelector(".current");
      if (currentTab) {
        currentTab.classList.remove("current");
      }
      // クリックされたタブに "current" クラスを追加
      tab.classList.add("current");
      // クリックされたタブのインデックスを取得
      const tabIndex = Array.from(tabs).indexOf(tab);
      // すべてのコンテンツを非表示
      const contents = document.querySelectorAll(".js-cards4-item");
      contents.forEach(function (content) {
        content.style.display = "none";
      });
      // クリックされたタブに対応するコンテンツを表示
      contents[tabIndex].style.display = "block";
    });
  });
}
// ============================
// フッターメニューの各項目を取得
const footerMenuItems = document.querySelectorAll(".js-nav-list-item");
// フッターメニューがクリックされたときの処理を設定
footerMenuItems.forEach(function (menuItem, index) {
  menuItem.addEventListener("click", function () {
    // クリックされたメニュー項目に対応するタブを表示
    const tabId = menuItem.getAttribute("data-tab-id");
    const tabToShow = document.querySelector(`#${tabId}`);
    if (tabToShow) {
      // すべてのタブを非表示
      const tabs = document.querySelectorAll(".js-cards4-item");
      tabs.forEach(function (tab) {
        tab.style.display = "none";
      });
      // クリックされたメニュー項目に対応するタブを表示
      tabToShow.style.display = "block";
    }
  });
});

// フッターメニューの各項目を取得
// Informationタブ要素を取得
const informationTabs = document.querySelectorAll(".js-information-tab");

// フッターメニューがクリックされたときの処理を設定
footerMenuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", function () {
    // 現在の選択されているメニュー項目から "current" クラスを削除
    const currentMenuItem = document.querySelector(".js-nav-list-item.current");
    if (currentMenuItem) {
      currentMenuItem.classList.remove("current");
    }
    // クリックされたメニュー項目に "current" クラスを追加
    menuItem.classList.add("current");

    // クリックされたメニュー項目に対応するInformationタブを探す
    const tabId = menuItem.getAttribute("data-tab-id");
    const matchingTab = document.querySelector(`.js-information-tab[data-tab-id="${tabId}-content"]`);

    if (matchingTab) {
      // 現在の選択されているInformationタブから "current" クラスを削除
      const currentInformationTab = document.querySelector(".js-information-tab.current");
      if (currentInformationTab) {
        currentInformationTab.classList.remove("current");
      }
      // クリックされたメニュー項目に対応するInformationタブに "current" クラスを追加
      matchingTab.classList.add("current");
    }
  });
});

/*===== アコーディオン共通設定 =====*/
const slideUp = (el, duration = 300) => {
  el.style.height = el.offsetHeight + "px";
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  setTimeout(() => {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
    el.classList.remove("is-open");
  }, duration);
};
// 要素をスライドしながら表示する関数
const slideDown = (el, duration = 300) => {
  el.classList.add("is-open");
  el.style.removeProperty("display");
  let display = window.getComputedStyle(el).display;
  if (display === "none") {
    display = "block";
  }
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = 0;
  el.style.paddingTop = 0;
  el.style.paddingBottom = 0;
  el.style.marginTop = 0;
  el.style.marginBottom = 0;
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.transitionTimingFunction = "ease";
  el.style.height = height + "px";
  el.style.removeProperty("padding-top");
  el.style.removeProperty("padding-bottom");
  el.style.removeProperty("margin-top");
  el.style.removeProperty("margin-bottom");
  setTimeout(() => {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    el.style.removeProperty("transition-timing-function");
  }, duration);
};
// 要素をスライドしながら交互に表示/非表示にする関数(jQueryのslideToggleと同じ)
const slideToggle = (el, duration = 300) => {
  if (window.getComputedStyle(el).display === "none") {
    return slideDown(el, duration);
  } else {
    return slideUp(el, duration);
  }
};

/*===== sidebarアコーディオン =====*/
// アコーディオンを全て取得
const accordions = document.querySelectorAll(".js-accordion");
// 取得したアコーディオンをArrayに変換(IE対策)
const accordionsArr = Array.prototype.slice.call(accordions);

accordionsArr.forEach((accordion) => {
  // Triggerを全て取得
  const accordionTriggers = accordion.querySelectorAll(".js-accordion-trigger");
  // TriggerをArrayに変換(IE対策)
  const accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);

  accordionTriggersArr.forEach((trigger) => {
    // Triggerにクリックイベントを付与
    trigger.addEventListener("click", (e) => {
      accordionTriggersArr.forEach((trigger) => {
        // クリックしたアコーディオン以外を全て閉じる
        if (trigger !== e.target.parentElement) {
          trigger.classList.remove("is-active");
          const openedContent = trigger.querySelector(".js-accordion__contents");
          slideUp(openedContent);
        }
      });
      // '.is-active'クラスを付与or削除
      trigger.classList.toggle("is-active");
      // 開閉させる要素を取得
      const content = trigger.querySelector(".js-accordion__contents");
      // 要素を展開or閉じる
      slideToggle(content);
    });
  });
});

/*===== faqアコーディオン =====*/
// アコーディオンを全て取得
const faqAccordions = document.querySelectorAll(".js-faq-accordion");
// 取得したアコーディオンをArrayに変換(IE対策)
const faqAccordionsArr = Array.prototype.slice.call(faqAccordions);

faqAccordionsArr.forEach((accordion) => {
  // Triggerを全て取得
  const accordionTriggers = accordion.querySelectorAll(".js-faq-accordion-trigger");
  // TriggerをArrayに変換(IE対策)
  const accordionTriggersArr = Array.prototype.slice.call(accordionTriggers);

  accordionTriggersArr.forEach((trigger) => {
    // Triggerにクリックイベントを付与
    trigger.addEventListener("click", () => {
      // '.is-active'クラスを付与or削除
      trigger.classList.toggle("is-close");
      // 開閉させる要素を取得
      const content = trigger.querySelector(".js-faq-accordion__contents");
      // 要素を展開or閉じる
      slideToggle(content);
    });
  });
});

/* ===================== */
/* テスト */
/* ===================== */
