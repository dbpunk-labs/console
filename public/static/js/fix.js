let defaultDesignWidth = 750;

/** 设置根元素的 font-size */
const setRootElementFontSize = (rootElement, designWidth) => {
	designWidth = designWidth || defaultDesignWidth;
	const rootElementWidth = Math.min(
		rootElement.clientWidth || rootElement.getBoundingClientRect().width,
		defaultDesignWidth,
	);
	const pxPerRem = (100 * rootElementWidth) / designWidth;
	rootElement.style.fontSize = pxPerRem + "px";
};

/** 设置 body 元素的 font-size（否则会继承 html 元素的 font-size） */
function setBodyFontSize(documentBody) {
	documentBody.style.fontSize = "14px";
}

let fn = (function (window) {
	const document = window.document;
	const rootElement = document.documentElement;

	return (designWidth) => {
		setBodyFontSize(document.body);
		setRootElementFontSize(rootElement, designWidth);

		const resizeEvent =
			"orientationchange" in window ? "orientationchange" : "resize";
		window.addEventListener(
			resizeEvent,
			() => {
				setRootElementFontSize(rootElement, designWidth);
			},
			false,
		);
	};
})(window);

window.addEventListener("load", (event) => {
	fn(defaultDesignWidth);
});
console.log("123");
