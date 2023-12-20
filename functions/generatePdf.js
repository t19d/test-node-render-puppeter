/* eslint-disable new-cap */
// const pdfkit = require('pdfkit');
const ejs = require('ejs');
const PDFDocument = require('pdfkit');

const templateChat = `<!DOCTYPE html>
<html>

<head>
  <title>Mensajes</title>
  <style type="text/css">
    * {
      font-size: 10px;
      font-family: Arial, sans-serif;

      box-sizing: border-box;
      margin: 0
    }

    body.container {
      min-width: 100%;
      padding: 30px;
    }

    .message{
      border: 1px solid black;
      margin: -0.5px;
      padding: 5px;
      display: grid;
      grid-template-columns: 0.2fr 5fr 1fr;
      gap: 1rem;
    }
  </style>

</head>

<body class="container">
  <section>
    <% messages.forEach(function(message) { %>
        <div class="message">
          <p><%= message.number %></p>
          <p>Mensaje: <%= message.message %></p>
          <p>Autor: <%= message.authorName %></p>
        </div>
      <% }); %>
  </section>
</body>

</html>
`;

const generate = async (data) => {
	// Renderiza la plantilla con los datos
	const renderedContent = ejs.render(templateChat, data);

	// Lógica para generar el PDF con los datos
	const pdfDoc = new PDFDocument();
	pdfDoc.text(renderedContent);

	// Convierte el PDF a un Buffer
	const pdfBuffer = await new Promise((resolve, reject) => {
		const chunks = [];

		pdfDoc.on('data', (chunk) => {
			chunks.push(chunk);
		});

		pdfDoc.on('end', () => {
			resolve(Buffer.concat(chunks));
		});

		pdfDoc.on('error', (error) => {
			reject(error);
		});

		pdfDoc.end(); // Finaliza la generación del PDF
	});

	// Devuelve el PDF como respuesta
	return pdfBuffer;
};

generate({
	patata: 'cocinada',
	emoji: '💩',
	tortilla: 'con cebolla',
	holi: 'lowi',
	a: 'b',
	messages: [
		{
			number: 1,
			message: 'Hola, ¿cómo estás?',
			authorName: 'Usuario 1',
		},
		{
			number: 2,
			message: '¡Hola! Estoy bien, ¿y tú?',
			authorName: 'Usuario 2',
		},
		{
			number: 3,
			message: 'Todo bien, gracias.',
			authorName: 'Usuario 1',
		},
		{
			number: 4,
			message: '¿Qué has estado haciendo?',
			authorName: 'Usuario 2',
		},
		{
			number: 5,
			message: 'Trabajando en algunos proyectos.',
			authorName: 'Usuario 1',
		},
		{
			number: 6,
			message: 'Eso suena genial. ¿En qué estás trabajando?',
			authorName: 'Usuario 2',
		},
		{
			number: 7,
			message: 'Principalmente en desarrollo web.',
			authorName: 'Usuario 1',
		},
		{
			number: 8,
			message: 'Interesante. ¿Algo emocionante que compartir?',
			authorName: 'Usuario 2',
		},
		{
			number: 9,
			message: 'Sí, acabo de lanzar mi propio sitio web.',
			authorName: 'Usuario 1',
		},
		{
			number: 10,
			message: '¡Eso es asombroso! ¿Cuál es la URL?',
			authorName: 'Usuario 2',
		},
		{
			number: 11,
			message: 'www.ejemplo.com',
			authorName: 'Usuario 1',
		},
	],
}).then((pdfBuffer) => {
	console.log(pdfBuffer);
});

module.exports = {
	generate,
};
