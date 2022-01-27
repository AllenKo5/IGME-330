export const loadTextXHR = (url,callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = callback;
  xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET",url);
  xhr.send();
};

export const randomElement = array => array[Math.floor(Math.random() * array.length)];