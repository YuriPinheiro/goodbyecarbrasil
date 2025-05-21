/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const sgMail = require("@sendgrid/mail");

// Configuração do SendGrid (substitua pela sua API Key)
sgMail.setApiKey("SUA_API_KEY_DO_SENDGRID");

// E-mail do admin (fixo)
const ADMIN_EMAIL = "admin@email.com"; // Substitua pelo e-mail do admin

exports.notifyAdminNewVehicle = functions.firestore
    .document("vehicles/{vehicleId}")
    .onCreate(async (snap, context) => {
        const vehicleData = snap.data(); // Dados do veículo
        const userId = vehicleData.userId; // ID do usuário que cadastrou

        try {
            // 1. Buscar dados do usuário no Firestore
            const userDoc = await admin.firestore().collection("users").doc(userId).get();
            const userData = userDoc.data();

            // 2. Preparar o e-mail
            const msg = {
                to: ADMIN_EMAIL,
                from: "notificacoes@seudominio.com", // E-mail verificado no SendGrid
                subject: `🚗 Novo veículo cadastrado: ${vehicleData.model}`,
                html: `
                    <h2>Um novo veículo foi cadastrado!</h2>
                    <p><strong>Usuário:</strong> ${userData.name} (${userData.email})</p>
                    <p><strong>Modelo:</strong> ${vehicleData.model}</p>
                    <p><strong>Ano:</strong> ${vehicleData.year}</p>
                    <p><strong>Placa:</strong> ${vehicleData.plate}</p>
                    <p><strong>Quilometragem:</strong> ${vehicleData.mileage} km</p>
                    <p><strong>Descrição:</strong> ${vehicleData.description}</p>
                    <p>Acesse o painel para mais detalhes.</p>
                `,
            };

            // 3. Enviar o e-mail
            await sgMail.send(msg);
            console.log("E-mail enviado para o admin!");
        } catch (error) {
            console.error("Erro ao enviar notificação:", error);
        }
    });
