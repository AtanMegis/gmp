document.addEventListener("DOMContentLoaded", () => {
	let bubbleButton = null;

	const bubbleButtonObserver = new MutationObserver(() => {
		bubbleButton = document.getElementById("dify-chatbot-bubble-button");
		console.log("Bubble button:", bubbleButton);

		if (bubbleButton) {
			bubbleButtonObserver.disconnect(); // Stop observing once found
			bubbleButton.addEventListener("click", () => {
				const iframe = document.querySelector("iframe");
				console.log("Iframe is:", iframe);

				if (iframe) {
					iframe.contentWindow.postMessage({}, iframe.src);
					iframe.onload = () => {
						console.log("aaaaa");
						console.log("iframeDoc", iframeDoc);

						const iframeObserver = new MutationObserver(() => {
							const element = iframeDoc.querySelector(".mb-4.py-2");
							console.log("Element inside iframe:", element);

							if (element) {
								element.style.display = "none";
								iframeObserver.disconnect(); // Stop observing once found
							}
						});

						iframeObserver.observe(iframeDoc.body, { childList: true, subtree: true });
					};
					iframe.addEventListener("load", () => {
						const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
						console.log("iframeDoc", iframeDoc);

						const iframeObserver = new MutationObserver(() => {
							const element = iframeDoc.querySelector(".mb-4.py-2");
							console.log("Element inside iframe:", element);

							if (element) {
								element.style.display = "none";
								iframeObserver.disconnect(); // Stop observing once found
							}
						});

						iframeObserver.observe(iframeDoc.body, { childList: true, subtree: true });
					});
				} else {
					console.error("Iframe not found.");
				}
			});
		}
	});

	bubbleButtonObserver.observe(document.body, {
		childList: true,
		subtree: true,
	});
});
