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

					// Check if any popup should be shown on current page
					const currentPath = window.location.pathname;
					const matchingPopup = data.find(
						(popup) =>
							popup.page === currentPath || popup.page === "*"
					);

					if (matchingPopup) {
						setCurrentPopup(matchingPopup);
						setTimeout(() => setIsVisible(true), 1000);
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
