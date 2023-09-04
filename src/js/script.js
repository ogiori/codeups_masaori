/*クッキー登録*/
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/*クッキーを取得*/
function getCookie(name) {
  const value = "; " + document.cookie; // 全てのクッキーの文字列を取得し、先頭に"; "を追加
  const parts = value.split("; " + name + "="); // クッキーの文字列を分割し、指定された名前の前にある部分と後ろにある部分を配列に格納
  if (parts.length === 2) {
    return parts.pop().split(";").shift(); // 名前が見つかった場合、その値を取得し返します
  } else {
    return ""; // 名前が見つからなかった場合、空の文字列を返します
  }
}
/*オープニングアニメーション*/
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

/*アニメーション再生*/
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

/*mvスライダー*/
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

/*ページスクロール*/
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    // リンクを取得
    const href = link.getAttribute("href");
    // ヘッダーの高さ
    const header = document.querySelector("header").offsetHeight;
    // ジャンプ先のid名をセット
    const target = href === "#" || href === "" ? document.documentElement : document.querySelector(href);
    // トップからジャンプ先の要素までの距離を取得
    const position = target.offsetTop - header;
    // スムーススクロールを行う
    // 600はスクロール速度で単位はミリ秒
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  });
});

/*page-top*/
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

/*ハンバーガーボタン*/
const hamburger = document.querySelector(".js-hamburger");
const modal = document.querySelector(".js-modal");
const body = document.querySelector("body");

hamburger.addEventListener("click", toggleModal);

function toggleModal() {
  hamburger.classList.toggle("is-active");
  modal.classList.toggle("is-active");
  body.classList.toggle("is-active");
}

/*画像アニメーション*/
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

/*Campaignスライダー*/
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
    nextEl: ".swiper-button-next.swiper1__next",
    prevEl: ".swiper-button-prev.swiper1__prev",
  },
});

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
/*archive_aboutのモーダル*/
// クリックイベントを設定するための要素を取得
var aboutImagesModal = document.querySelector(".js-about-images-modal");
if (aboutImagesModal) {
  var images = document.querySelectorAll(".js-about-images img");
  images.forEach(function (image) {
    image.addEventListener("click", function () {
      aboutImagesModal.innerHTML = this.outerHTML;
      // モーダルを表示する
      aboutImagesModal.style.display = "block";
      document.body.classList.add("is-active");
    });
  });
  aboutImagesModal.addEventListener("click", function () {
    // 非表示にする
    aboutImagesModal.style.display = "none";
    document.body.classList.remove("is-active");
  });
};

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
/*information-tub*/
// 最初のコンテンツを表示
const firstContent = document.querySelector(".js-cards4-item:first-of-type");
if (firstContent) {
  firstContent.style.display = "block";
  // タブ要素を取得
  const tabs = document.querySelectorAll(".js-information-tub");
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
};
