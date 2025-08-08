# WebdriverIO: Saucedemo Test Project

This project provides end-to-end (E2E) UI test automation for the [Saucedemo App](https://www.saucedemo.com), implemented using WebdriverIO.

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

# Setup Instructions (Local)

## Install dependencies:
```bash
npm install
```

## Run all tests:
```bash
npm test
# or
npm run wdio
```

## Run a specific test:
```bash
npx wdio run ./wdio.conf.js --spec ./test/specs/<file-name>.js
```
