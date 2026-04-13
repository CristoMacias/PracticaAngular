const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Servidor WebSocket de simulación funcionando');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.send(JSON.stringify({
    tipo: 'system',
    mensaje: 'Conexión establecida correctamente'
  }));

  const mensajesBienvenida = [
    {
      tipo: 'typing',
      mensaje: 'El servidor está escribiendo...'
    },
    {
      tipo: 'chat',
      autor: 'Servidor',
      mensaje: 'Hola, soy el asistente virtual. ¿En qué puedo ayudarte?'
    }
  ];

  let indiceBienvenida = 0;

  const intervaloBienvenida = setInterval(() => {
    ws.send(JSON.stringify(mensajesBienvenida[indiceBienvenida]));
    indiceBienvenida++;

    if (indiceBienvenida >= mensajesBienvenida.length) {
      clearInterval(intervaloBienvenida);
    }
  }, 1000);

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      console.log('Mensaje recibido:', data);

      if (data.tipo === 'chat') {
        const texto = data.mensaje.toLowerCase();

        const pasosRespuesta = [
          {
            tipo: 'typing',
            mensaje: 'El servidor está escribiendo...'
          },
          {
            tipo: 'typing',
            mensaje: 'Analizando tu mensaje...'
          },
          {
            tipo: 'chat',
            autor: 'Servidor',
            mensaje: generarRespuesta(texto)
          }
        ];

        let indiceRespuesta = 0;

        const intervaloRespuesta = setInterval(() => {
          if (ws.readyState !== WebSocket.OPEN) {
            clearInterval(intervaloRespuesta);
            return;
          }

          ws.send(JSON.stringify(pasosRespuesta[indiceRespuesta]));
          indiceRespuesta++;

          if (indiceRespuesta >= pasosRespuesta.length) {
            clearInterval(intervaloRespuesta);
          }
        }, 1000);
      }

    } catch (error) {
      ws.send(JSON.stringify({
        tipo: 'error',
        mensaje: 'Formato de mensaje no válido'
      }));
    }
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });

  ws.on('error', (error) => {
    console.error('Error en la conexión:', error.message);
  });
});

function generarRespuesta(texto) {
  if (texto.includes('hola')) {
    return 'Hola, encantado de hablar contigo.';
  }

  if (texto.includes('curso') || texto.includes('angular')) {
    return 'Estamos preparados para trabajar con Angular en esta práctica.';
  }

  if (texto.includes('websocket')) {
    return 'WebSocket permite comunicación bidireccional en tiempo real entre cliente y servidor.';
  }

  if (texto.includes('gracias')) {
    return 'De nada, estoy aquí para ayudarte.';
  }

  if (texto.includes('adios') || texto.includes('hasta luego')) {
    return 'Hasta luego. Ha sido un placer.';
  }

  return 'No he entendido tu petición, estoy entrenado para responder a (hola, curso, angular, websocket, gracias, adios).';
}

server.listen(3002, () => {
  console.log('Servidor HTTP en http://localhost:3002');
  console.log('Servidor WebSocket en ws://localhost:3002');
});