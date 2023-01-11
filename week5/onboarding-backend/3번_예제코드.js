const fs = require("fs")
const http = require("http");

const server = http.createServer();

const httpRequestListener = function(request, response) {
  const { url, method } = request

  if ( url === "/main" && method === "GET" ) {
    response.writeHead(200, { "Content-Type": "application/json" })
    response.end(JSON.stringify({ message : "안녕하세요! 메인페이지입니다. 🙌" }))
  }

  if ( url === "/signin" && method === "GET" ) {
    const signinPage = fs.readFileSync('./signin.html')
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(signinPage)
  }

  if ( url === "/lists" && method === "GET" ) {
    const listPage = fs.readFileSync('user-list.html')
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    response.end(listPage)
  }

  if ( url === "/signin" && method === "POST" ) {
    let body = ''

    request.on('data', (data) => {
      body += data;
    })

    request.on('end', () => {
      const user = JSON.parse(body)
      const { email, password, realEmail, realPassword } = user

      if ( email === realEmail && password === realPassword ) {
        response.writeHead(200, {'Content-Type': 'application/json' })
        response.end(JSON.stringify({ message: "환영합니다." }))
      }
    })
  }
}

server.on("request", httpRequestListener)

server.listen(3000, 'localhost', function() {
  console.log("서버 시작!!!🔥");
});