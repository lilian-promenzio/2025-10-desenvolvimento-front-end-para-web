/**
 * Form de cadastro
 */
function cadastroHandleSubmit(event) {
	event.preventDefault();
	const form = document.getElementById("cadastroForm");
	if (!form) return;

	// Elementos de feedback
	const successMessage = document.getElementById("successMessage");
	const errorMessage = document.getElementById("errorMessage");

	// Esconde feedback anterior
	if (successMessage) successMessage.classList.remove("show");
	if (errorMessage) {
		errorMessage.classList.remove("show");
		errorMessage.textContent = "";
	}

	// Evita duplicidade
	if (form.dataset.submitting === "true") return;
	form.dataset.submitting = "true";

	// Coleta os valores do formulário
	const nome = form.nome.value.trim();
	const email = form.email.value.trim();
	const telefone = form.telefone.value.trim();
	const cpf = form.cpf.value.trim();
	const nascimento = form.nascimento.value.trim();
	const cep = form.cep.value.trim();
	const endereco = form.endereco.value.trim();
	const cidade = form.cidade.value.trim();
	const estado = form.estado.value.trim();

	// Verifica campos obrigatórios
	if (
		!nome ||
		!email ||
		!telefone ||
		!cpf ||
		!nascimento ||
		!cep ||
		!endereco ||
		!cidade ||
		!estado
	) {
		if (errorMessage) {
			errorMessage.textContent =
				"Por favor, preencha todos os campos obrigatórios.";
			errorMessage.classList.add("show");
			errorMessage.scrollIntoView({
				behavior: "smooth",
				block: "center",
			});
		}
		form.dataset.submitting = "false";
		return;
	}

	const formData = {
		nome,
		email,
		telefone,
		cpf,
		nascimento,
		cep,
		endereco,
		cidade,
		estado,
		dataCadastro: new Date().toLocaleString(),
	};

	let voluntarios = JSON.parse(localStorage.getItem("voluntarios")) || [];
	voluntarios.push(formData);
	localStorage.setItem("voluntarios", JSON.stringify(voluntarios));

	// Mostra mensagem de sucesso
	if (successMessage) {
		successMessage.classList.add("show");
		successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
	}

	// Limpa formulário após 2 segundos
	setTimeout(() => form.reset(), 2000);

	// Esconde mensagem após 5 segundos
	setTimeout(() => {
		if (successMessage) successMessage.classList.remove("show");
		form.dataset.submitting = "false";
	}, 5000);
}

/**
 * Funções de máscara para campos de formulário
 */
function cpfMask(value) {
	value = value.replace(/\D/g, ""); // Remove tudo o que não é dígito
	let valorComMascara = "";

	if (value.length > 0) {
		valorComMascara += value.substring(0, 3);
	}
	if (value.length > 3) {
		valorComMascara += "." + value.substring(3, 6);
	}
	if (value.length > 6) {
		valorComMascara += "." + value.substring(6, 9);
	}
	if (value.length > 9) {
		valorComMascara += "-" + value.substring(9, 11);
	}

	if (valorComMascara.length > 14) {
		valorComMascara = valorComMascara.substring(0, 14);
	}

	return valorComMascara;
}

function telefoneMask(value) {
	value = value.replace(/\D/g, "");
	value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em volta dos dois primeiros dígitos
	value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Coloca hífen entre o quarto e o quinto dígitos
	if (value.length > 15) {
		value = value.substring(0, 15);
	}
	return value;
}

function cepMask(value) {
	value = value.replace(/\D/g, "");
	value = value.replace(/^(\d{5})(\d)/, "$1-$2"); // Coloca hífen entre o quinto e o sexto dígitos
	if (value.length > 9) {
		value = value.substring(0, 9);
	}
	return value;
}

/**
 * Inicialização de funcionalidades após o carregamento do DOM
 */
document.addEventListener("DOMContentLoaded", () => {
	// Funcionalidade do Menu mobile
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

	// Aplicação de máscaras para campos de formulário
	const cpfInput = document.getElementById("cpf");
	const telefoneInput = document.getElementById("telefone");
	const cepInput = document.getElementById("cep");

	if (cpfInput) {
		cpfInput.addEventListener("input", (event) => {
			event.target.value = cpfMask(event.target.value);
		});
	}

	if (telefoneInput) {
		telefoneInput.addEventListener("input", (event) => {
			event.target.value = telefoneMask(event.target.value);
		});
	}

	if (cepInput) {
		cepInput.addEventListener("input", (event) => {
			event.target.value = cepMask(event.target.value);
		});
	}
});
