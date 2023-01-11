// 배열 내 중복된 단어를 제거하는 함수를 작성해 주세요.
// `Hint` **Array.indexOf(), Array.filter()**
// 데이터

function func(words) {
  // code ...

  words = words.filter((c, index) => {
    return words.indexOf(c) === index;
  });

  console.log(words);

}

const words = ['Have', 'A', 'Good', 'Time', 'Have', 'Good'];
func(words);

// 결과

// ['Have', 'A', 'Good', 'Time']
