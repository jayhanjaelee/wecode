const fs = require('fs');
const util = require('util');

const parseUser = () => {

  const filename = './users.csv';

  fs.readFile(filename, 'utf-8', (err, data) => {

    const users = [];

    let newlineSplited = data.split('\n').slice(0, -1);

    for (let i = 1; i < newlineSplited.length; i++) {
      const user = {};

      const values = newlineSplited[i].split(',');

      const id = values[0]
      const firstName = values[1];
      const lastName = values[2];
      const mobileNumber = values[3];
      const email = values[4];

      user['id'] = id;
      user['firstName'] = firstName;
      user['lastName'] = lastName;
      user['mobileNumber'] = mobileNumber;
      user['email'] = email;
      user['posts'] = [];

      posts = parsePosts();

      for (let i = 0; i < posts.length; i++) {
        if (posts[i].userId == id) {
          user['posts'].push(posts[i])
        }
      }

      users.push(user)
    }

    console.log(util.inspect(users, {depth: null, colors: true}));

  });
}

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

parseUser();