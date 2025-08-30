# Frontix ⚡

> Modern utility toolkit for frontend developers — 25+ utilities for strings, dates, validation, async operations, deep objects, and more. TypeScript-first, tree-shakable, and lightweight.

[![npm version](https://img.shields.io/npm/v/frontix.svg)](https://www.npmjs.com/package/frontix)
[![CI](https://github.com/vishal11u/frontix/actions/workflows/ci.yml/badge.svg)](https://github.com/vishal11u/frontix)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Test Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)](https://github.com/vishal11u/frontix)

---

## ✨ Why Frontix?

Most utility libraries (like Lodash) are huge and include too many things you never use.  
**Frontix** is designed to solve **real frontend problems** we face daily:

- Formatting API data for UI directly
- Handling dates across locales/timezones
- Smoother user interactions (debounce, throttle, truncate)
- Reducing boilerplate code in React/Next.js apps
- **Tree-shakable** - only import what you need
- **TypeScript-first** with full type safety
- **25+ utilities** covering all common frontend needs

---

## 📦 Installation

```bash
npm install frontix
# or
yarn add frontix
# or
pnpm add frontix
```

---

## 🚀 Quick Start

```typescript
import { truncate, validateEmail, timeAgo, deepClone, debounce, slugify } from "frontix";

// String utilities
const shortText = truncate("This is a very long text that needs truncating", 20);
// "This is a very long..."

// Validation
const isValidEmail = validateEmail("user@example.com"); // true

// Date utilities
const relativeTime = timeAgo("2025-01-14T10:00:00Z"); // "1 day ago"

// Deep cloning
const original = { user: { name: "John", settings: { theme: "dark" } } };
const cloned = deepClone(original);
cloned.user.settings.theme = "light"; // Original unchanged

// String enhancements
const urlSlug = slugify("Hello World!"); // "hello-world"
```

---

## 🛠️ Complete Utility Collection

### **String Utilities**
- `truncate(str, length, suffix?)` → Truncate text with custom suffix (`...`, `@`, etc.)
- `slugify(str)` → Convert `"Hello World!"` → `"hello-world"`
- `capitalize(str)` → Convert `"hello"` → `"Hello"`
- `caseConversion(str, type)` → Convert between camelCase, kebab-case, snake_case, etc.

### **Number Utilities**
- `toNumber(value)` → Convert safely to number with fallback to 0
- `toString(value)` → Convert safely to string with fallback to empty string

### **Array Utilities**
- `toDropdown(arr)` → Convert `["A","B"]` → `[{label:"A",value:"A"}]`

### **Date Utilities**
- `formatDate(date, format?, locale?)` → Format dates (handles UTC, locale, custom format)
- `timeAgo(date)` → Human readable `"5 mins ago"`
- `toTimeZone(date, tz)` → Convert to given timezone
- `comparison(date1, date2, unit?)` → Compare dates with precision

### **Validation Utilities**
- `safeValue(value, fallback)` → Replace `null/undefined/""` with fallback (`"N/A"`, `"---"`)
- `validateEmail(email)` → Validate email format
- `validatePhone(phone, country?)` → Validate phone numbers

### **Async Utilities**
- `retry(fn, retries, delay)` → Retry failed async functions
- `timeout(fn, ms)` → Cancel if execution exceeds time
- `throttle(fn, delay)` → Limit function execution frequency

### **Deep Object Utilities**
- `deepClone(obj)` → Deep copy without mutation
- `isEqual(obj1, obj2)` → Deep comparison
- `merge(target, ...sources)` → Deep merge objects

### **Misc Utilities**
- `debounce(fn, delay)` → Smooth out function calls (search bars, inputs)

---

## 📖 Usage Examples

### **String Utilities**
```typescript
import { truncate, slugify, capitalize, caseConversion } from "frontix";

truncate("Hello Frontend Developer!", 10, "...");
// Output: "Hello Fron..."

slugify("Hello World! How are you?");
// Output: "hello-world-how-are-you"

capitalize("hello world");
// Output: "Hello world"

caseConversion("helloWorld", "kebab");
// Output: "hello-world"
```

### **Number Utilities**
```typescript
import { toNumber, toString } from "frontix";

toNumber("42");   // 42
toNumber("abc");  // 0 (fallback)
toNumber(null);   // 0 (fallback)

toString(12345);  // "12345"
toString(null);   // "" (fallback)
```

### **Array Utilities**
```typescript
import { toDropdown } from "frontix";

toDropdown(["Apple", "Banana"]);
// Output: [{ label: "Apple", value: "Apple" }, { label: "Banana", value: "Banana" }]

toDropdown([1, 2, 3]);
// Output: [{ label: 1, value: 1 }, { label: 2, value: 2 }, { label: 3, value: 3 }]
```

### **Date Utilities**
```typescript
import { formatDate, timeAgo, toTimeZone, comparison } from "frontix";

// Default: Indian-style (DD/MM/YYYY)
formatDate("2025-08-24T12:00:00Z");
// Output: "24/08/2025"

// Human readable time
timeAgo("2025-01-14T10:00:00Z");
// Output: "1 day ago"

// Timezone conversion
toTimeZone("2025-01-15T10:00:00Z", "America/New_York");
// Output: Date object in NY timezone

// Date comparison
comparison("2025-01-15", "2025-01-20", "days");
// Output: -5 (5 days difference)
```

### **Validation Utilities**
```typescript
import { safeValue, validateEmail, validatePhone } from "frontix";

safeValue(null, "N/A");           // "N/A"
safeValue("", "---");             // "---"
safeValue("Hello", "Default");    // "Hello"

validateEmail("user@example.com");     // true
validateEmail("invalid-email");       // false

validatePhone("+1234567890");         // true
validatePhone("123-456-7890", "US");  // true
```

### **Async Utilities**
```typescript
import { retry, timeout, throttle } from "frontix";

// Retry failed operations
const fetchData = retry(async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Failed');
  return response.json();
}, 3, 1000);

// Timeout protection
const result = await timeout(fetchData, 5000);

// Throttle function calls
const logScroll = throttle(() => console.log("Scrolled"), 100);
```

### **Deep Object Utilities**
```typescript
import { deepClone, isEqual, merge } from "frontix";

// Deep cloning
const original = { user: { name: "John", settings: { theme: "dark" } } };
const cloned = deepClone(original);
cloned.user.settings.theme = "light"; // Original unchanged

// Deep comparison
isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }); // true

// Deep merge
const target = { user: { name: "John" } };
const source = { user: { age: 30 } };
merge(target, source);
// Result: { user: { name: "John", age: 30 } }
```

### **Misc Utilities**
```typescript
import { debounce } from "frontix";

const logSearch = debounce((query) => console.log("Searching:", query), 1000);

// Only the last call will execute after 1 second
logSearch("f");
logSearch("fr");
logSearch("fro");
logSearch("front");
logSearch("frontend"); // Only this executes
```

---

## 🧪 Development

### **Setup**
```bash
# Clone the repository
git clone https://github.com/vishal11u/frontix.git
cd frontix

# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the package
npm run build

# Development mode (watch for changes)
npm run dev
```

### **Available Scripts**
- `npm test` - Run tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run build` - Build for production
- `npm run dev` - Build in watch mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Quick Start**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Run the test suite (`npm test`)
6. Commit your changes (`git commit -m 'feat: add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

---

## 📊 Bundle Size

Frontix is designed to be lightweight and tree-shakable:

- **Core bundle**: ~2.5KB gzipped
- **Individual imports**: Only pay for what you use
- **Tree-shaking**: Unused code is automatically removed

---

## 🏗️ Architecture

- **TypeScript**: Full type safety and IntelliSense
- **ESM + CJS**: Dual package format for maximum compatibility
- **Tree-shakable**: Independent function exports
- **Pure functions**: No side effects, predictable behavior
- **Comprehensive testing**: 100% test coverage with Vitest

---

## 📜 License

MIT © 2025 — Made with ❤️ by Vishal

---

## 🙏 Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Bundled with [tsup](https://github.com/egoist/tsup)
- Tested with [Vitest](https://vitest.dev/)
- Date handling with [dayjs](https://day.js.org/)

---

⚡ **Frontix** gives you the utilities you need, when you need them, without the bloat.