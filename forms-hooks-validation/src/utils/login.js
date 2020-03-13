export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "bill" && password === "password") {
        resolve();
      } else {
        reject("Invalid username or password");
      }
    }, 2000);
  });
}
