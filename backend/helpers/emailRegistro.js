import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const { email, nombre, token } = datos;

  const info = await transport.sendMail({
    from: "APV - Administrador de pacientes de Veterinaria",
    to: email,
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html: `
    <p> Hola: ${nombre}</p>
    <p> Comprueba tu cuenta en APV </p>
    <p> Tu Cuenta esta listo, solo debes comprobarla en el siguiente Enlace:
    <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar email de Cuenta</a> </p>
    
    <p> Si tu no creaste esta Cuenta ignora este mensaje </p>
    
    `,
  });
  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
