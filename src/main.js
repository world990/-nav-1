const $siteList = $(".siteList");
const $latsLi = $siteList.find("li.last");
const x = localStorage.getItem(`x`);
const xObject = JSON.parse(x);

const hashMap = xObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  {
    logo: "B",
    url: "https://www.bilibili.com/",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除/开头的内容
};
const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
    <div class="site">
      <div class="logo">${node.logo[0]}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class="close"><svg class="icon" >
      <use xlink:href="#icon-close"></use>
  </svg></div>
    </div>  
</li>`).insertBefore($latsLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      console.log("1111");
      e.stopPropagation(); //阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("网址输入");
  if (url.indexOf("http") != 0) {
    url = "https://" + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem(`x`, string);
};
$(document).on("keypress", (e) => {
  const { key } = e;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLocaleLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
