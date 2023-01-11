// code 부분에 for문을 이용한 코드를 작성하여 결과와 같이 배열 내 숫자들을 역순으로 출력해 주세요.
// (배열의 내장함수인 reverse()는 사용하지 않고 작성해 보세요.)

// 데이터

const arr = [1, 3, 4, 6, 9]
let result = [];
// code ...

let length = arr.length;

for (let i = 0; i < arr.length; i++) {
  let last = arr[length - 1];
  result[i] = last;

  length -= 1;
}

console.log(result);

// 결과
//[9, 6, 4, 3, 1]
