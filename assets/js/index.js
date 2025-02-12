(() => {
	"use strict";
	var t = {
			338: (t, e, o) => {
				var n = o(795);
				(e.H = n.createRoot), n.hydrateRoot;
			},
			795: (t) => {
				t.exports = window.ReactDOM;
			},
		},
		e = {};
	const o = window.React;
	var n = (function o(n) {
		var r = e[n];
		if (void 0 !== r) return r.exports;
		var a = (e[n] = { exports: {} });
		return t[n](a, a.exports, o), a.exports;
	})(338);
	const r = window.ReactJSXRuntime,
		a = () => {
			const [t, e] = (0, o.useState)([]),
				[n, a] = (0, o.useState)(!1),
				[s, c] = (0, o.useState)(null);
			return (
				(0, o.useEffect)(() => {
					(async () => {
						try {
							const t = await fetch(artStudioPopup.apiUrl, {
								headers: { "X-WP-Nonce": artStudioPopup.nonce },
							});
							if (t.ok) {
								const o = await t.json();
								e(o);
								const n = window.location.pathname,
									r = o.find(
										(t) => t.page === n || "*" === t.page,
									);
								r && (c(r), setTimeout(() => a(!0), 1e3));
							}
						} catch (t) {
							console.error("Error fetching popups:", t);
						}
					})();
				}, []),
				n && s
					? (0, r.jsx)("div", {
							className: "artstudio-popup-overlay",
							children: (0, r.jsxs)("div", {
								className: "artstudio-popup-content",
								children: [
									(0, r.jsx)("button", {
										className: "artstudio-popup-close",
										onClick: () => {
											a(!1);
										},
										children: "×",
									}),
									(0, r.jsx)("h2", { children: s.title }),
									(0, r.jsx)("div", {
										dangerouslySetInnerHTML: {
											__html: s.description,
										},
									}),
								],
							}),
					  })
					: null
			);
		};
	document.addEventListener("DOMContentLoaded", function () {
		const t = document.createElement("div");
		(t.id = "artstudio-popup-container"),
			document.body.appendChild(t),
			(0, n.H)(t).render((0, r.jsx)(a, {}));
	});
})();
