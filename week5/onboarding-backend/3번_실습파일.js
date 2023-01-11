/*
[코드 작성 안내]

학습 페이지에 있는 pseudo-code를 읽고 각 코드에 따른 빈칸을 채워넣어 주세요!
Step1 실습을 마친 후 서버를 실행했을 때 정상적으로 서버가 실행된다면 httpRequestListener 함수 내부의 주석을 해제하여 Step2를 진행해주세요.

코드를 작성할 때 {번호 이름} 중괄호까지 모두 지운 후 코드를 작성해야 합니다.
문자열이 위치하는 경우 " " 따옴표는 지우지 않도록 주의해주세요!

이 외 다른 코드를 지우면 정상적으로 실행이 되지 않을 수 있습니다.
특정 코드가 수정되어 실습이 정상적으로 진행되지 않는 경우 학습 자료의 템플릿 코드를 복사하여 사용하시기 바랍니다.
*/

const fs = require("fs");
const http = require("http");

const server = http.createServer();
const PORT = 3000;

const httpRequestListener = function( request, response) {
  const { url, method } = request;

  if (url === "/main" && method === "GET") {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({message : `"안녕하세요! 메인페이지입니다. 🙌"` }));
  }

  /* STEP 2 */
  // ========================= Step2 =========================

  /*

  1. 요청의 url 경로가 `/signin`이면서 method 이름이 `GET`인 경우, `./signin.html` 파일을 `signInPage`라는 변수에 할당하여 보여준다.
  2. 요청의 url 경로가 `/lists`이면서 method 이름이 `GET`인 경우, `./user-list.html` 파일을 `listPage`라는 변수에 할당하여 보여준다.
  3. 요청의 url 경로가 `/signin`이면서 method 이름이 `POST`인 경우,
	3-3) 요청 정보를 받을 `body`라는 변수에 빈 문자열을 표현하는 `""`를 할당한다.
	3-4) HTTP 통신 간 요청받은 `data`를 받아와 `body`라는 변수에 할당한다.
  3-5) 문자열로 구성된 `body` 데이터를 `JSON.parse()` 함수를 통해 JavaScript object 형식으로 변환하여 `user`라는 변수에 할당한다.
	3-6) user 객체의 데이터 중 `email, password, realEmail, realPassword`에 대한 값을 비구조화 할당을 통해 가져온다.
	3-7) email과 realEmail이 같고, password와 realPassword가 같을 때, 상태코드는 `200`을 응답 메시지는 `"환영합니다."`를 반환합니다.

	*참고사항*
	email과 password는 로그인 화면에서 실제로 입력하는 값에 따라 달라집니다.
	요청 데이터에 숨겨진 realEmail과 realPassword를 console.log(user)를 통해 찾아보세요!

  */

	if ( url === "/signin" && method === "GET" ) {
    const signInPage = fs.readFileSync( "./signin.html" );
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end( signInPage );
  }

	if ( url === "/lists" && method === "GET" ) {
    const listPage = fs.readFileSync( "./user-list.html" );
    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end( listPage );
  }

	if (url === "/signin" && method === "POST" ) {
    let body = '';

    request.on('data', ( data ) => {
      body += data;
    })

    request.on('end', () => {
      const user = JSON.parse(body);
      console.log(user);
      const { email, password, realEmail, realPassword } = user;

      if ( email === realEmail && password === realPassword ) {
        response.writeHead(200, { 'Content-Type': 'application/json' });

        response.end(JSON.stringify({ message: "환영합니다" }));
      }
    })
  }

  // ""{"userName":"wecode",
  // "realEmail":"wecode-bootcamp@wecode.co.kr"
  // "userEmail":"wecodeZzang"
  // "realPassword":"wecodeZzang!@"
  // "hashedPassword":"$2@1213@bascewempowefj:345mioa/123.cdsmas21r5c"
  // "email":""
  // "password":""}

}

server.on("request", httpRequestListener);

server.listen(PORT, 'localhost', () => {
  console.log(`"서버 시작!!!🔥"`);
});