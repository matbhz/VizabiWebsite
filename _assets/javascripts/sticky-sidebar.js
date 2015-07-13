//Sticky sidemenu on docs page
//adapted from: https://github.com/abhimanyuPathania/sticky-sidebar

(function() {

	if(window.addEventListener){
		window.addEventListener("scroll", stickySidebar, false);
		window.addEventListener("resize", resize, false);
	} else{
		// IE8
		window.attachEvent("onscroll", stickySidebar);
		window.attachEvent("onresize", resize);
	}

	var sidebar = document.querySelector(".docs-menu");
	var sidebarBox = sidebar.getBoundingClientRect();
	var scroll = getScroll();
	var marginTop = 30;
	var sidebarY = sidebarBox.top + scroll - marginTop;

	function stickySidebar() {
		/* if srcoll postion is below the sidebar top value, make its position fixed.
		When user scrolls back top remove all the inline attributes*/
		var scroll = getScroll();
		var sidebarStyle = sidebar.style;
		if(scroll >= sidebarY) {
			if(sidebarStyle.position !== "fixed") {
				//only apply inline styles if have not applied before
				sidebarStyle.position = "fixed";
				sidebarStyle.top = marginTop + "px";
				sidebarStyle.left = sidebarBox.left + "px";
			}
		} else {
			// only run removeAttribute if there is some inline style applied
			if (sidebarStyle.position) {
				sidebar.removeAttribute("style");
			}	
		}
	}

	function resize() {
		sidebarBox = sidebar.getBoundingClientRect();
		scroll = getScroll();
		sidebarY = sidebarBox.top + scroll - marginTop;
		stickySidebar();	
	}

	function getScroll(w) {
		// Use the specified window or the current window if no argument
		w = w || window;
		// This works for all browsers except IE versions 8 and before
		if (w.pageXOffset != null) return w.pageYOffset;
		// For IE (or any browser) in Standards mode
		var d = w.document;
		if (document.compatMode == "CSS1Compat")
		return d.documentElement.scrollTop;
		// For browsers in Quirks mode
		return d.body.scrollTop ;
	}

})();