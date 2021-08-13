const getRealPath = (pathname, desc = false) => {
  if (!pathname) {
    pathname = window.location.pathname;
  }
  let names = pathname.split("/");
  if (desc === false) {
    for (let i = names.length - 1; i >= 0; --i) {
      let name = names[i].trim();
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name;
      }
    }
  } else {
    for (let i = 0; i < names.length; ++i) {
      let name = names[i].trim();
      if (name.length > 0 && name !== "/" && name !== "index.html") {
        return name;
      }
    }
  }
  return "/";
};

function search() {
  window.open($("#search_form").attr("action_e") + " " + $("#search_value").val());
  return false;
}

function loadScript(url, callback){
  // Adding the script tag to the head as suggested before
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = callback;

  // Fire the loading
  document.body.appendChild(script);
}

function reloadJs(scriptsToBeReload=document.querySelectorAll("script.pjax-reload, .pjax-reload script")){
	for (var element of scriptsToBeReload) {
		var id = element.id || "";
		var src = element.src || "";
		var code = element.text || element.textContent || element.innerHTML || "";
		var parent = element.parentNode;
		var script = document.createElement("script");
		var className = element.className || "";
		parent.removeChild(element);
		if (id !== "") { script.id = element.id; }
		if (className !== "") { script.className=className; }
		if (src !== "") { script.src = src.replace(/\?v=[0-9]*/i,"") + "?v=" + Number(new Date()); }
		if (code !== "") { script.appendChild(document.createTextNode(code)); }
		parent.appendChild(script);
	}
}

function setTopBarStyle(){
  if(typeof topbar != "undefined"){ //顶部进度条颜色，和css中主题色一致
    var themeColor=getComputedStyle(document.documentElement).getPropertyValue('--themeColor');
    var colorStr='rgba('+themeColor + ','  + 0.7 +')';
    topbar.config({
      barColors: {
        '0': colorStr,
        '1.0': colorStr
      }
    })
  }
}

function setListItemClass() {
  let links = document.querySelectorAll(".nexmoe-list-item");
  let rootRealPath = getRealPath(window.location.pathname, true);
  for (let link of links) {
    let linkPath = link.getAttribute("href");
    if (linkPath && getRealPath(linkPath, true) === rootRealPath) {
      link.className = "active nexmoe-list-item mdui-list-item mdui-ripple";
    } else {
      link.className = "nexmoe-list-item mdui-list-item mdui-ripple";
    }
  }
};

function addNexmoeAlbumClass() {
  $("table")
    .has("img")
    .addClass("nexmoe-album");
}

function highlightCodes() {
  if(typeof Prism != "undefined") {
    Prism.highlightAll();
    if(typeof Prism.plugins.NormalizeWhitespace != "undefined"){
      Prism.plugins.NormalizeWhitespace.setDefaults({
        'remove-trailing': true,
        'remove-indent': true,
        'left-trim': true,
        'right-trim': true,
        // 'break-lines': 80,
        // 'indent': 2,
        // 'remove-initial-line-feed': false,
        'tabs-to-spaces': 4,
        // 'spaces-to-tabs': 4
      });
    }
  }else if(typeof hljs != "undefined") {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
}

function togglePjax(){
  var pjax = new Pjax({
    elements: "a[href]:not([href^='#'])", // default is "a[href], form[action]"
    selectors: ["#nexmoe-content", "title"],
    cacheBust: false, // 不重载
  })
  document.addEventListener('pjax:send', function(){
    if(typeof topbar != "undefined") {
      topbar.show();
    } //pjax换页时显示顶部进度条
  });
  document.addEventListener('pjax:complete', function(){
    if(typeof topbar != "undefined"){
      topbar.hide();
    }  //pjax换页完成后隐藏顶部进度条
    reloadJs();
    setListItemClass();
    addNexmoeAlbumClass();
    highlightCodes();
  });
}

window.addEventListener('DOMContentLoaded', ()=>{
  setListItemClass();
  addNexmoeAlbumClass();
  setTopBarStyle();
  highlightCodes();
  togglePjax();
})
