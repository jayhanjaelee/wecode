const fs = require('fs');
const util = require('util');

// users.csv 를 읽어서 user 에 대한 객체 생성후 배열에 담아 리턴하는 함수
const parseUser = () => {

  const filename = './users.csv';

  fs.readFile(filename, 'utf-8', (err, data) => {

    const users = [];

    // \n 으로 split 후 배열의 마지막 요소 인 빈 스트링을 '' 지우기 위해 slice 사용
    let newlineSplited = data.split('\n').slice(0, -1);

    // value 값만 가져오기 위해 i 초기값 1로 설정
    for (let i = 1; i < newlineSplited.length; i++) {
      const user = {};

      // , 로 split 하여 유저에 대한 각 value 를 가져온다
      const values = newlineSplited[i].split(',');

      // 현재 values 는 다음과 같을 것
      // [1,Rebekah,Johnson,010-4600-3048,Glover12345@email.com]
      // 따라서 인덱스 0,1,2,3,4 로 배열의 요소에 접근하여 각각 올바른 값으로 변수를 생성해준다.
      const id = values[0];
      const firstName = values[1];
      const lastName = values[2];
      const mobileNumber = values[3];
      const email = values[4];


      // 위에서 가져온 value 를 기반으로 객체에 key 값에 알맞은 value 를 할당해준다
      // *** 참고사항
      // (1) users['id'] = id (2) user.id = id
      // 위의 두가지 방식은 객체에 값을 저장하는 방법인데 결론적으로 같은 역할을 한다!
      user['id'] = id;
      user['firstName'] = firstName;
      user['lastName'] = lastName;
      user['mobileNumber'] = mobileNumber;
      user['email'] = email;
      user['posts'] = [];

      // 밑에 선언해 둔 parsePosts 함수 를 호출하여
      // 함수의 리턴값을 posts 라는 변수에 저장한다
      posts = parsePosts();

      // posts 를 반복문으로 각 요소에대해 순회한다.
      for (let i = 0; i < posts.length; i++) {

        // 현제 얻고자하는 데이터를 생각해 봤을 때
        // posts 는 user 에 종속적인 개념이고
        // post 의 userId 값과 user 의 id 값이 같은 경우는
        // 어떤 user 에 대해서 작성한 post 라고 판단 할 수 있을 것 같다.
        // 따라서 post 의 userId 와 user 의 id 의 값이 같은 경우에 한해서
        // user['posts'] 에 post 를 하나씩 저장한다.
        if (posts[i].userId == id) {
          user['posts'].push(posts[i]);
        }
      }

      users.push(user);
    }

    // posts: [ [Object], [Object], [Object] ] 와 같은 식으로 나오는걸
    // util.inspect 메서드로 결과 출력방식을 변경 할 수 있는데
    // 여기서 포인트는 inspect 두번쨰 인자로 들어가는 { depth: null }
    // 이 출력방식을 변경하는 것에 대한 옵션이다.
    console.log(util.inspect(users, { depth: null, colors: true }));

  });
}

// posts.csv 를 읽어서 post 에 대한 객채 생성후 배열에 담아 리턴하는 함수
const parsePosts = () => {

  const filename = './posts.csv';

  const data = fs.readFileSync(filename, 'utf-8');

  const newlineSplited = data.split('\n').slice(0, -1);

  const posts = [];

  for (let i = 1; i < newlineSplited.length; i++) {

    const post = {};

    const values = newlineSplited[i].split(',')

    const id = values[0];
    const title = values[1];
    const content = values[2];
    const userId = values[3];
    const createdAt = values[4];

    post['id'] = id;
    post['title'] = title;
    post['content'] = content;
    post['userId'] = userId;
    post['date'] = createdAt;

    posts.push(post);

  }

  return posts;

}

// parseUser 함수 호출
// *** node main.js 를 하면 parseUser() 가 가장 먼저 실행될 것!!!
parseUser();
