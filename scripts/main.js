document.addEventListener("DOMContentLoaded", () => {
	const menuButton = document.getElementById("botaoMenuMobile");
	const menu = document.getElementById("menuPrincipal");
	const overlay = document.getElementById("menuOverlay");

	if (menuButton && menu && overlay) {
		const menuLinks = menu.querySelectorAll("a");

		const openMenu = () => {
			menu.classList.add("ativo");
			overlay.classList.add("ativo");
			document.body.style.overflow = "hidden";
		};

		const closeMenu = () => {
			menu.classList.remove("ativo");
			overlay.classList.remove("ativo");
			document.body.style.overflow = "";
		};

		menuButton.addEventListener("click", openMenu);
		overlay.addEventListener("click", closeMenu);

		menuLinks.forEach((link) => {
			link.addEventListener("click", closeMenu);
		});
	}
});
