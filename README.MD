# WebdriverIO: Saucedemo Test Project

This project provides end-to-end (E2E) UI test automation for the [Saucedemo App](https://www.saucedemo.com), implemented using WebdriverIO with the Mocha framework.

---

## Implemented Test Cases

- Valid Login  
- Login with Invalid Password  
- Login with Invalid Username  
- Logout  
- Saving the Cart After Logout  
- Sorting Functionality  
- Footer Links Verification  
- Valid Checkout Process  
- Checkout Without Products  

---

## Setup Instructions (Local)

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/<your-repo-name>.git
   cd <your-repo-name>
Install dependencies:

bash
Copy
Edit
npm install
Run all tests:

bash
Copy
Edit
npm test
# or
npm run wdio
Run a specific test:

bash
Copy
Edit
npx wdio run ./wdio.conf.js --spec ./test/specs/<file-name>.js