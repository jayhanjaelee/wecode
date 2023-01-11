// 공백으로 구분된 8개의 숫자들 중 최댓값을 반환하는 코드를 작성해 주세요.

// 데이터

const numbers = "10 11 5 6 12 7 3 9"
// code ...

const numbersArr = numbers.split(' ');
console.log(Math.max(...numbersArr));

// 결과
// 12
