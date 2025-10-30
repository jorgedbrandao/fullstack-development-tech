document.addEventListener("DOMContentLoaded", function () {
  console.log(`carregou o arquivo`);

  const form = document.getElementById("group-form");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      console.log(`Formulário intercetado!`);

      try {
        const formData = new FormData(form);
        const dataObject = {
          names: [],
          message: "",
        };

        for (const [key, value] of formData.entries()) {
          if (key.startsWith("nome")) {
            if (value.trim() !== "") {
              dataObject.names.push(value);
            }
          }

          if (key === "historia") {
            dataObject.message = value;
          }
        }

        const jsonData = JSON.stringify(dataObject);

        console.log("JSON formatado para envio:", jsonData);

        const url = "https://fsdt-contact.onrender.com/contact";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `Erro ${response.status}: ${
              errorData.message || response.statusText
            }`
          );
        }

        const result = await response.json();

        console.log(`sucesso! resposta do servidor:`, result);

        alert("Grupo submetido com sucesso!");

        form.reset();
      } catch (err) {
        console.error(err);
        alert(`Falha ao enviar: ${err.message}`);
      }
    });
  } else {
    console.warn(` o formulário com id "group-form" não foi encontrado`);
  }
});