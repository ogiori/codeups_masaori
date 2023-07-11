/*クッキー登録*/  
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

/*クッキーを取得*/ 
function getCookie(name) {
  const value = "; " + document.cookie; // 全てのクッキーの文字列を取得し、先頭に"; "を追加
  const parts = value.split("; " + name + "="); // クッキーの文字列を分割し、指定された名前の前にある部分と後ろにある部分を配列に格納
  if (parts.length === 2) {
    return parts.pop().split(";").shift(); // 名前が見つかった場合、その値を取得し返します
  } else {
    return ""; // 名前が見つからなかった場合、空の文字列を返します
  }
};
/*オープニングアニメーション*/
const animation = document.querySelector('.js-OP-animation');
const mask = document.querySelector('.js-OP-animation__mask');
const title1 = document.querySelector('.js-OP-animation__title1-block');
const title2 = document.querySelector('.js-OP-animation__title2-block');
const imgLeft = document.querySelector('.js-OP-animation__left');
const imgRight = document.querySelector('.js-OP-animation__right');
const animationTl = gsap.timeline({
  defaults: {
    duration: 1
  }
});

/*アニメーション再生*/ 
function playAnimation() {
  // タイムライン
  animationTl
    .to(title1, {
      scale: 1,
      autoAlpha: 1
    })
    .to(title1, {
      autoAlpha: 0
    }, )
    .to(imgLeft, {
      y: 0,
      autoAlpha: 1
    }, ">=.3")
    .to(imgRight, {
      y: 0,
      autoAlpha: 1
    }, "<")
    .to(title2, {
      autoAlpha: 1
    }, )
    .to(animation, {
      scale: 1.5,
      autoAlpha: 0,
      duration: 1.5,
      ease: "power4.inOut",
    }, "+=1")
};

// オープニングアニメーションに関わる要素を非表示
function hideAnimation() {
  gsap.set('.js-OP-animation', {
    autoAlpha: 0
  })
};

// まず最初に読み込まれる所
document.addEventListener("DOMContentLoaded", function () {
  const animationPlayed = getCookie("animationPlayed");
  if (animationPlayed) {
    hideAnimation();
  } else {
    playAnimation();
    setCookie("animationPlayed", "true", 1);
  }
});


/*ページスクロール*/
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    // リンクを取得
    const href = link.getAttribute("href");
    // ヘッダーの高さ
    const header = document.querySelector('header').offsetHeight;
    // ジャンプ先のid名をセット
    const target = (href === "#" || href === "") ? document.documentElement : document.querySelector(href);
    // トップからジャンプ先の要素までの距離を取得
    const position = target.offsetTop - header;
    // スムーススクロールを行う
    // 600はスクロール速度で単位はミリ秒
    window.scrollTo({
      top: position,
      behavior: "smooth"
    });
  });
});

/*page-top*/
//スクロールした時に処理を実行
window.addEventListener('scroll', function () {
  //トップへ戻るボタンを取得
  let topBtn = document.querySelector('.js-footer__top-btn');

  //画面上部からトップビジュアル下の位置取得
  const topVisual = document.querySelector('.js-mv').getBoundingClientRect().bottom;

  //トップビジュアル下の位置より下にスクロールされたらactiveクラウを付与
  if (topVisual <= 0) {
    topBtn.classList.add('is-active');
  } else {
    //スクロールが200px未満のときactiveクラスを外す
    topBtn.classList.remove('is-active');
  }
  //ドキュメントの高さ
  const scrollHeight = document.body.clientHeight;

  //スクロール位置
  const scrollPosition = window.pageYOffset;

  //windowの高さ
  const windowHeignt = window.innerHeight;

  //footer取得
  const footer = document.querySelector('footer');
  console.log(footer.getBoundingClientRect().top)
  //footerの高さ
  const footerHeight = footer.offsetHeight;
  if (scrollHeight - scrollPosition - windowHeignt <= footerHeight) {
    topBtn.classList.add('is-stop');
  } else {
    topBtn.classList.remove('is-stop');
  }
});


/*ハンバーガーボタン*/
const hamburger = document.querySelector('.js-hamburger')
const modal = document.querySelector('.js-header__modal')
const body = document.querySelector('body')

hamburger.addEventListener('click', toggleModal);

function toggleModal() {
  hamburger.classList.toggle('is-active');
  modal.classList.toggle('is-active');
  body.classList.toggle('is-active');
}
// spのナビメニューをクリックしたら、モーダルを閉じる
const headerLinks = document.querySelectorAll('.js-nav-list__item a')
headerLinks.forEach((headerLink) => {
  headerLink.addEventListener('click', toggleModal);
});


/*画像アニメーション*/
const triggers = document.querySelectorAll('.js-trigger');
const imagesTl = gsap.timeline();

triggers.forEach((trigger) => {
  const images = trigger.querySelectorAll('.js-trigger img');
  const imagesTl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'top 90%',
    }
  });

  imagesTl
    .to(trigger, {
      '--clippath': 'inset(0 0 0 0%)',
      duration: .7
    })
    .to(images, {
      'clipPath': 'inset(0 0 0 0%)'
    }, )
});

/*mvスライダー*/
new Swiper('.js-mv-swiper', {
  loop: true,
  effect: 'fade',
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 2000,
});


/*Campaignスライダー*/
const swiper1 = new Swiper(".js-swiper1__container", {
  loop: true, // デフォルトはfalse
  autoplay: { // 自動再生
    delay: 3000, // 1秒後に次のスライド（初期値：3000）
    disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    // スライドの表示枚数  
  },
  speed: 2000,

  centeredSlides: true, // アクティブなスライドを中央にする

  breakpoints: {
    300: {
      slidesPerView: 1.3,
      spaceBetween: 25,
    },
    500: {
      slidesPerView: 1.7,
      spaceBetween: 25,
    },
    768: {
      slidesPerView: 3.2,
      spaceBetween: 15,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
}, );