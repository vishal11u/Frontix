# Contributing to Frontix 🚀

Thank you for your interest in contributing to Frontix! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. **Fork & Clone**
```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/vishal11u/frontix.git
cd frontix
```

### 2. **Setup Development Environment**
```bash
# Install dependencies
npm install

# Install git hooks (if available)
npm run prepare
```

### 3. **Create a Feature Branch**
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-fix-name
```

### 4. **Make Your Changes**
- Write your code following the [Code Guidelines](#code-guidelines)
- Add tests for new functionality
- Update documentation if needed

### 5. **Test Your Changes**
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Run type checking
npm run type-check

# Build the package
npm run build
```

### 6. **Commit Your Changes**
```bash
git add .
git commit -m "feat: add new utility function

- Added slugify function for URL-friendly strings
- Includes comprehensive test coverage
- Updated documentation with examples"
```

### 7. **Push & Create Pull Request**
```bash
git push origin feature/your-feature-name
# Create PR on GitHub
```

## 📋 Code Guidelines

### **General Principles**
- **Keep it simple**: Each utility should solve one specific problem
- **Pure functions**: No side effects, same input = same output
- **Tree-shakable**: Functions should be independently importable
- **TypeScript first**: Use strict types and proper interfaces

### **Function Requirements**
- **JSDoc comments**: Every function must have comprehensive documentation
- **Examples**: Include practical usage examples in JSDoc
- **Edge cases**: Handle null, undefined, and invalid inputs gracefully
- **Performance**: Consider performance for common use cases

### **Testing Requirements**
- **100% coverage**: All functions must have comprehensive tests
- **Edge cases**: Test boundary conditions and error scenarios
- **Real-world usage**: Tests should reflect actual usage patterns

### **Code Style**
- **Prettier**: Code is automatically formatted
- **ESLint**: Follow linting rules
- **Consistent naming**: Use descriptive, consistent function names
- **Error handling**: Provide meaningful error messages

## 🏗️ Project Structure

```
src/
├── string/          # String utilities
├── number/          # Number utilities  
├── array/           # Array utilities
├── date/            # Date utilities
├── misc/            # Miscellaneous utilities
├── validation/      # Validation utilities (Phase 2)
├── async/           # Async utilities (Phase 2)
├── deep/            # Deep object utilities (Phase 2)
└── index.ts         # Main exports

tests/               # Test files mirroring src structure
```

## 🧪 Testing Guidelines

### **Test Structure**
```typescript
import { describe, it, expect } from "vitest";
import { yourFunction } from "../../src/your-module/yourFunction";

describe("yourFunction", () => {
  it("should handle normal cases", () => {
    expect(yourFunction("input")).toBe("expected");
  });

  it("should handle edge cases", () => {
    expect(yourFunction("")).toBe("");
    expect(yourFunction(null as any)).toBe("");
  });

  it("should handle error cases", () => {
    expect(() => yourFunction(invalidInput)).toThrow();
  });
});
```

### **Test Coverage Requirements**
- **Happy path**: Normal usage scenarios
- **Edge cases**: Empty strings, null, undefined, etc.
- **Error handling**: Invalid inputs and error conditions
- **Performance**: Large inputs and boundary conditions

## 📝 Documentation Guidelines

### **JSDoc Format**
```typescript
/**
 * Brief description of what the function does.
 * 
 * @param param1 - Description of first parameter
 * @param param2 - Description of second parameter
 * @returns Description of return value
 * 
 * @example
 * ```typescript
 * yourFunction("input"); // "output"
 * yourFunction("", "fallback"); // "fallback"
 * ```
 */
```

### **README Updates**
- Update feature list when adding new utilities
- Add usage examples for new functions
- Update installation instructions if needed

## 🚀 Development Workflow

### **Before Starting**
1. Check existing issues and PRs
2. Discuss your approach in an issue
3. Ensure your feature aligns with project goals

### **During Development**
1. Write tests first (TDD approach)
2. Keep commits small and focused
3. Run tests frequently
4. Update documentation as you go

### **Before Submitting**
1. All tests pass
2. Code is linted and formatted
3. Documentation is complete
4. Examples are provided

## 🏷️ Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

**Examples:**
```
feat(string): add slugify utility function
fix(date): handle invalid date inputs gracefully
docs: update README with new examples
test(array): add edge case tests for toDropdown
```

## 🤔 Questions or Need Help?

- **GitHub Issues**: Create an issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: Ask for help during PR reviews

## 📜 License

By contributing to Frontix, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Frontix!** 🎉

Your contributions help make this utility library better for the entire frontend development community.
