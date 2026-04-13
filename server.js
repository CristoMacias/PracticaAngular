const http = require('http');

const server = http.createServer((req, res) => {

  if (req.url === '/events') {

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      const data = {
        progreso: progress,
        mensaje: `Progreso: ${progress}%`
      };

      res.write(`data: ${JSON.stringify(data)}\n\n`);

      if(progress === 50){
          res.write(`event: progress\n`);
          res.write(`data: ${JSON.stringify({ mensaje: 'Mitad del proceso' })}\n\n`);
        }

      if (progress >= 100) {
        clearInterval(interval);

        res.write(`event: finished\n`);
        res.write(`data: ${JSON.stringify({ mensaje: 'Completado' })}\n\n`);

      }

    }, 1000);

    

    req.on('close', () => {
      clearInterval(interval);
      res.end();
      console.log('Cliente desconectado');
    });

  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Servidor SSE funcionando');
  }

});

server.listen(3001, () => {
  console.log('Servidor en http://localhost:3001');
});