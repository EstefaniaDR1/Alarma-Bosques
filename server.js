const express = require('express');
const nodeMailer = require('nodemailer');
const cors = require('cors');

// Crear la aplicación de Express
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para enviar el correo
app.post('/send-email', (req, res) => {
    const { type } = req.body;

    // Personalizar el contenido del mensaje según el tipo de siniestro
    let message;
    switch (type) {
        case 'Intruso':
            message = 'Alerta: Se ha detectado un intruso en las instalaciones.';
            break;
        case 'Terremoto':
            message = 'Alerta: Se ha registrado un terremoto. Mantenga la calma y siga las instrucciones de seguridad.';
            break;
        case 'Incendio':
            message = 'Alerta: Se ha detectado un incendio. Evacúe el área de inmediato.';
            break;
        default:
            message = 'Alerta: Se ha reportado un siniestro desconocido.';
            break;
    }

    const mailOptions = {
        from: "dd8466958@gmail.com",
        to: "estefaniadrpe@gmail.com",
        subject: `Alerta de Siniestro: ${type}`,
        text: message,
        html: `<h3>${message}</h3>`
    };

    const transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "dd8466958@gmail.com",
            pass: "iohy kzqc bbge qsbb "
        }
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ message: 'Error al enviar el correo' });
        }
        res.status(200).json({ message: 'Correo enviado correctamente' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
