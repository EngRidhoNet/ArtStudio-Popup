import React, { useState, useEffect } from "react";

const Popup = () => {
	const [popups, setPopups] = useState([]);
	const [isVisible, setIsVisible] = useState(false);
	const [currentPopup, setCurrentPopup] = useState(null);

	useEffect(() => {
		const fetchPopups = async () => {
			try {
				const response = await fetch(artStudioPopup.apiUrl, {
					headers: {
						"X-WP-Nonce": artStudioPopup.nonce,
					},
				});

				if (response.ok) {
					const data = await response.json();
					setPopups(data);

					// Ambil path saat ini tanpa trailing slash
					const currentPath = window.location.pathname.replace(
						/^\/|\/$/g,
						"",
					);

					const matchingPopup = data.find(
						(popup) =>
							popup.page === currentPath || popup.page === "*",
					);


					// Cegah popup muncul berulang dengan sessionStorage
					if (
						matchingPopup &&
						!sessionStorage.getItem(`popup-${matchingPopup.id}`)
					) {
						setCurrentPopup(matchingPopup);
						setTimeout(() => setIsVisible(true), 1000);
						sessionStorage.setItem(
							`popup-${matchingPopup.id}`,
							"shown",
						);
					}
				}
			} catch (error) {
				console.error("Error fetching popups:", error);
			}
		};

		fetchPopups();
	}, []);

	const closePopup = () => {
		setIsVisible(false);
	};

	if (!isVisible || !currentPopup) {
		return null;
	}

	return (
		<div className="artstudio-popup-overlay">
			<div className="artstudio-popup-content">
				<button className="artstudio-popup-close" onClick={closePopup}>
					×
				</button>
				<h2>{currentPopup.title}</h2>
				<div
					dangerouslySetInnerHTML={{
						__html: currentPopup.description,
					}}
				/>
			</div>
		</div>
	);
};

export default Popup;
