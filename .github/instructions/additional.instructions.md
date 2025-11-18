---
applyTo: "**/*"
---

# Additional Instructions

When making edits to the codebase, please adhere to the following guidelines:

- Always prefer using `globalThis` when referring to the global object, as it provides a consistent way to access the global scope across different environments (browser, Node.js, etc.). Avoid using `window`, `self`, or `global` directly.
- For parsing integers and floating-point numbers, use `Number.parseInt` and `Number.parseFloat` respectively. This practice enhances code clarity by explicitly indicating that these functions are part of the `Number` object, and helps avoid potential issues with shadowed global functions.
- When defining ARIA roles for progress bars, use the role `progress` instead of `progressbar`. This ensures better compliance with accessibility standards and improves the experience for users relying on assistive technologies.
- Ensure that all code changes maintain or improve accessibility standards, performance, and code readability.
- Test all changes thoroughly to confirm that they work as intended across different environments and use cases.
- Strings should use "replaceAll()" instead of "replace()" with global regex patterns for better readability and performance.
- Use "for...of" loops instead of "forEach" method calls for better performance and readability, especially when dealing with arrays.
- Negated conditions should be avoided when an else clause is present, to enhance code clarity and maintainability.
- React props should be read-only; avoid mutating them directly to prevent unintended side effects.
- Semantic HTML tags are generally preferred over ARIA roles for accessibility due to their built-in functionality, universal support by browsers and assistive technologies, simplicity, and maintainability.
- React props should be read-only because it helps to enforce the principle of immutability in React functional components.
- Ternary operators should not be nested
