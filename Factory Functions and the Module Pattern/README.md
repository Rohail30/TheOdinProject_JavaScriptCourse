Here’s a **short, simple summary** of the whole lesson 👇

---

### 🧠 **1. Scope**

Scope defines **where variables can be accessed**.

* **Global scope:** accessible everywhere.
* **Function scope (`var`)** – available only inside the function.
* **Block scope (`let`, `const`)** – available only inside `{ }` (like in if, for).

```js
let globalVar = "I’m global";

function test() {
  var localVar = "I’m local";
  if (true) {
    const blockVar = "I’m block scoped";
    console.log(blockVar); // ✅ works
  }
  // console.log(blockVar); ❌ error
}
```

---

### 🔒 **2. Closures**

A **closure** is when a function “remembers” the variables from where it was created — even after that outer function has finished running.

```js
function makeAdder(x) {
  return function(y) {
    return x + y; // inner function remembers x
  };
}

const add5 = makeAdder(5);
console.log(add5(2)); // 7
```

---

### ⚙️ **3. Problem with Constructors**

Constructors need `new`, and forgetting it causes errors.
They also rely on prototypes which can be misused or reassigned.

---

### 🏭 **4. Factory Functions**

A **factory function** is a regular function that **returns an object** — no `new` keyword required.

```js
function createUser(name) {
  const discordName = "@" + name;
  return { name, discordName };
}

const user = createUser("John");
console.log(user.discordName); // "@John"
```

---

### 🔐 **5. Private Variables (via Closures)**

Factory functions can hide data inside closures — creating **private variables**.

```js
function createUser(name) {
  let reputation = 0;

  const getReputation = () => reputation;
  const addReputation = () => reputation++;

  return { name, getReputation, addReputation };
}

const user = createUser("Josh");
user.addReputation();
console.log(user.getReputation()); // 1
```

`reputation` can’t be accessed directly — only through functions.

---

### 🧬 **6. Inheritance with Factory Functions**

You can combine or extend factory functions using `Object.assign()`.

```js
function createUser(name) {
  return { name };
}

function createPlayer(name, level) {
  const user = createUser(name);
  const increaseLevel = () => level++;
  return Object.assign({}, user, { level, increaseLevel });
}
```

---

### 🧩 **7. Module Pattern (IIFE)**

A **module** is an IIFE (Immediately Invoked Function Expression) that **runs once** and returns an object — great for organizing code and keeping variables private.

```js
const calculator = (function () {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  return { add, sub };
})();

console.log(calculator.add(3, 4)); // 7
```

---

### 🧱 **8. Encapsulation & Namespacing**

Encapsulation = wrapping related code together to **control access**.
Namespacing = avoid naming conflicts by grouping code logically.
Example: `calculator.add()` vs having many global `add()` functions.

---

### 💡 **In Short**

| Concept       | Meaning                       | Example              |
| ------------- | ----------------------------- | -------------------- |
| Scope         | Variable visibility           | `let` = block scope  |
| Closure       | Function remembers outer vars | `makeAdder()`        |
| Factory       | Returns object (no `new`)     | `createUser()`       |
| Private vars  | Hidden via closure            | `getReputation()`    |
| Inheritance   | Combine factories             | `Object.assign()`    |
| Module/IIFE   | One-time factories            | `calculator.add()`   |
| Encapsulation | Hide + organize code          | Prevent name clashes |

---

Would you like me to turn this into a **1-page visual summary (like a cheat sheet)**?
