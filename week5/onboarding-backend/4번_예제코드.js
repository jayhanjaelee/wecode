const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'http://127.0.0.1:3000/lists';

const scrapeData = async () => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const listItems = $('.table tbody tr');
    
    const users = [];

    listItems.each((idx, el) => {
      const user = {};
      
      user.name = $(el).children('.name').text();
      user.phoneNumber = $(el).children('.phoneNumber').text();
      user.birthdate = $(el).children('.birthdate').text();
      user.email = $(el).children('.email').text();

      users.push(user);
    });

    const writeStream = fs.createWriteStream('wecode-mentors.csv');

    writeStream.on('finish', () => {
      console.log('위코드 멘토 정보를 가져오는데 성공하였습니다.💻');
    });

    users.forEach((user) => {
      const value = Object.keys(user)
        .map((key) => {
          return user[key]; 
        })
        .join(',');

      writeStream.write(`${value}\n`);
    });

    writeStream.end();
  } catch (err) {
    console.error(err);
  }
};

scrapeData();