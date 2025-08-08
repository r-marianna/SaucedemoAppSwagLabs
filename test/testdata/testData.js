import { faker } from "@faker-js/faker";

export function usersInfo() {
  const usersInfo = {
    username: {
      standard_user: "standard_user",
      locked_out_user: "locked_out_user",
      problem_user: "problem_user",
      performance_glitch_user: "performance_glitch_user",
      error_user: "error_user",
      visual_user: "visual_user",
    },
    password: "secret_sauce",
  };

  return usersInfo;
}

export function personInfo() {
  const person = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode()
  };

  return person;
}

export function generateWord(n) {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let charactersLen = characters.length;
  let result = "";

  for (let i = 0; i <= n - 1; i++) {
    result += characters.charAt(Math.round(Math.random() * charactersLen));
  }

  return result;
}
