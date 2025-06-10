const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();

// Configura a chave do SendGrid (substitua pela sua chave)
sgMail.setApiKey(process.env.SENDGRIDAPIKEY);

exports.notifyNewVehicle =
    onDocumentCreated("vehicles/{vehicleId}", async (event) => {
      const snapshot = event.data;
      const veiculo = snapshot.data();

      const msg = {
        to: "goodbyecarbrasil@gmail.com", // Email do administrador
        from: "no-reply@em8020.goodbyecar.com.br", // Email do remetente
        subject: "Novo Veículo Cadastrado",
        text: `Um novo veículo foi cadastrado no sistema:
          
        Marca: ${veiculo.brand.nome || "Não informado"}
        Modelo: ${veiculo.model || "Não informado"}
        Ano: ${veiculo.year}/${veiculo.modelYear || "Não informado"}
        Placa: ${veiculo.plate || "Não informado"}
          
        Data do cadastro: ${new Date().toLocaleString('pt-BR')}
      `,
        html: `<strong>Um novo veículo foi cadastrado no sistema:</strong>
          <ul>
              <li>Marca: ${veiculo.brand.nome || "Não informado"}</li>
              <li>Modelo: ${veiculo.model || "Não informado"}</li>
              <li>Ano: ${veiculo.year}/${veiculo.modelYear || "---"}</li>
              <li>Placa: ${veiculo.plate || "Não informado"}</li>
          </ul>
          <p>Data do cadastro: ${new Date().toLocaleString()}</p>
      `,
      };

      try {
        await sgMail.send(msg);
        console.log("Email enviado com sucesso");
      } catch (error) {
        console.error("Erro ao enviar email:", error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    });
