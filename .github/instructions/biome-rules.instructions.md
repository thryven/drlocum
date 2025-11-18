---
applyTo: "**/*"
---

# Biome Linter Rules

## Accessibility

1. **noAccessKey**: Enforce that the `accessKey` attribute is not used on any HTML element.
2. **noAriaHiddenOnFocusable**: Enforce that `aria-hidden="true"` is not set on focusable elements.
3. **noAriaUnsupportedElements**: Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.
4. **noAutofocus**: Enforce that `autoFocus` prop is not used on elements.
5. **noDistractingElements**: Enforce that no distracting elements are used.
6. **noHeaderScope**: The `scope` prop should be used only on `<th>` elements.
7. **noInteractiveElementToNoninteractiveRole**: Enforce that non-interactive ARIA roles are not assigned to interactive HTML elements.
8. **noLabelWithoutControl**: Enforce that a `<label>` element or component has a text label and an associated input.
9. **noNoninteractiveElementToInteractiveRole**: Enforce that interactive ARIA roles are not assigned to non-interactive HTML elements.
10. **noNoninteractiveTabindex**: Enforce that `tabIndex` is not assigned to non-interactive HTML elements.
11. **noPositiveTabindex**: Prevent the usage of positive integers on `tabIndex`.
12. **noRedundantAlt**: Enforce that `img` alt text does not contain redundant words like "image" or "photo".
13. **noRedundantRoles**: Prevent assigning explicit roles that duplicate implicit roles.
14. **noStaticElementInteractions**: Enforce that static elements with click handlers use valid roles.
15. **noSvgWithoutTitle**: Require a `<title>` element inside every `<svg>`.
16. **useAltText**: Require meaningful alt text for elements needing alternative text.
17. **useAnchorContent**: Ensure that `<a>` elements have accessible, meaningful content.
18. **useAriaActivedescendantWithTabindex**: Require `tabIndex` for non-interactive elements using `aria-activedescendant`.
19. **useAriaPropsForRole**: Ensure that elements with ARIA roles include all required ARIA attributes.
20. **useAriaPropsSupportedByRole**: Enforce that ARIA properties are valid for the element’s supported roles.
21. **useButtonType**: Require the `type` attribute on `<button>` elements.
22. **useFocusableInteractive**: Ensure interactive roles with handlers are focusable.
23. **useHeadingContent**: Require heading elements (`<h1>`–`<h6>`) to have accessible content.
24. **useHtmlLang**: Require the `<html>` element to have a `lang` attribute.
25. **useIframeTitle**: Require the `title` attribute on `<iframe>` elements.
26. **useKeyWithClickEvents**: Require keyboard event handlers (`onKeyUp`, `onKeyDown`, etc.) with `onClick`.
27. **useKeyWithMouseEvents**: Require `onFocus`/`onBlur` alongside `onMouseOver`/`onMouseOut`.
28. **useMediaCaption**: Enforce that `<audio>` and `<video>` elements include captions.
29. **useSemanticElements**: Suggest semantic HTML elements instead of generic elements with `role` attributes.
30. **useValidAnchor**: Enforce that `<a>` elements are valid and navigable.
31. **useValidAriaProps**: Ensure that all `aria-*` properties are valid.
32. **useValidAriaRole**: Ensure that ARIA roles are valid and non-abstract.
33. **useValidAriaValues**: Enforce valid ARIA state and property values.
34. **useValidAutocomplete**: Require valid values for the `autocomplete` attribute on inputs.
35. **useValidLang**: Ensure that the `lang` attribute uses valid ISO codes.

---

## Complexity

1. **noAdjacentSpacesInRegex**: Disallow unclear usage of consecutive space characters in regular expression literals.
2. **noArguments**: Disallow the use of arguments`.
3. **noBannedTypes**: Disallow primitive type aliases and misleading types.
4. **noCommaOperator**: Disallow comma operator.
5. **noEmptyTypeParameters**: Disallow empty type parameters in type aliases and interfaces.
6. **noExtraBooleanCast**: Disallow unnecessary boolean casts.
7. **noFlatMapIdentity**: Disallow unnecessary callback on `flatMap`.
8. **noStaticOnlyClass**: Disallow classes with only static members.
9. **noThisInStatic**: Disallow `this` and `super` in `static` contexts.
10. **noUselessCatch**: Disallow unnecessary `catch` clauses.
11. **noUselessConstructor**: Disallow unnecessary constructors.
12. **noUselessContinue**: Avoid using unnecessary `continue`.
13. **noUselessEmptyExport**: Disallow empty exports that don't change anything.
14. **noUselessEscapeInRegex**: Disallow unnecessary escape sequences in regular expressions.
15. **noUselessFragments**: Disallow unnecessary fragments.
16. **noUselessLabel**: Disallow unnecessary labels.
17. **noUselessLoneBlockStatements**: Disallow unnecessary nested block statements.
18. **noUselessRename**: Disallow renaming imports, exports, or destructuring to the same name.
19. **noUselessStringRaw**: Disallow unnecessary `String.raw()` without escape sequences.
20. **noUselessSwitchCase**: Disallow useless `case` clauses in `switch` statements.
21. **noUselessTernary**: Disallow ternary operators when simpler alternatives exist.
22. **noUselessThisAlias**: Disallow useless `this` aliasing.
23. **noUselessTypeConstraint**: Disallow using `any` or `unknown` as type constraints.
24. **noUselessUndefinedInitialization**: Disallow initializing variables to `undefined`.
25. **useArrowFunction**: Prefer arrow functions over function expressions.
26. **useDateNow**: Use `Date.now()` to get the number of milliseconds since Unix Epoch.
27. **useFlatMap**: Prefer `.flatMap()` over `map().flat()`.
28. **useIndexOf**: Prefer `indexOf`/`lastIndexOf` instead of `findIndex`/`findLastIndex` when searching for index.
29. **useLiteralKeys**: Enforce literal property access over computed property access.
30. **useNumericLiterals**: Prefer numeric literals over `parseInt()` or `Number.parseInt()`.
31. **useOptionalChain**: Prefer concise optional chaining over chained logical expressions.
32. **useRegexLiterals**: Enforce regex literals instead of the `RegExp` constructor where possible.
33. **useSimpleNumberKeys**: Disallow non-base-10 or underscored number literal property names.

---

## Correctness

1. **noConstAssign**: Prevent `const` variables from being re-assigned.
2. **noConstantCondition**: Disallow constant expressions in conditions.
3. **noConstantMathMinMaxClamp**: Disallow using `Math.min` or `Math.max` when the result is constant.
4. **noConstructorReturn**: Disallow returning a value from a `constructor`.
5. **noEmptyCharacterClassInRegex**: Disallow empty character classes in regular expressions.
6. **noEmptyPattern**: Disallow empty destructuring patterns.
7. **noGlobalObjectCalls**: Disallow calling global object properties as functions.
8. **noInnerDeclarations**: Disallow `function` and `var` declarations outside their block scope.
9. **noInvalidBuiltinInstantiation**: Ensure built-in objects are correctly instantiated.
10. **noInvalidConstructorSuper**: Prevent incorrect or missing `super()` in derived classes.
11. **noInvalidUseBeforeDeclaration**: Disallow using variables or parameters before declaration.
12. **noNonoctalDecimalEscape**: Disallow `\8` and `\9` escape sequences in strings.
13. **noPrecisionLoss**: Disallow number literals that lose precision.
14. **noSelfAssign**: Disallow assignments where both sides are identical.
15. **noSetterReturn**: Disallow returning values from setters.
16. **noStringCaseMismatch**: Disallow string comparisons with mismatched casing.
17. **noSwitchDeclarations**: Disallow lexical declarations inside `switch` clauses.
18. **noUnreachable**: Disallow unreachable code.
19. **noUnreachableSuper**: Ensure `super()` is called exactly once before using `this`.
20. **noUnsafeFinally**: Disallow control flow statements in `finally` blocks.
21. **noUnsafeOptionalChaining**: Disallow unsafe usage of optional chaining.
22. **noUnusedFunctionParameters**: Disallow unused function parameters.
23. **noUnusedImports**: Disallow unused imports.
24. **noUnusedLabels**: Disallow unused labels.
25. **noUnusedPrivateClassMembers**: Disallow unused private class members.
26. **noUnusedVariables**: Disallow unused variables.
27. **noVoidElementsWithChildren**: Disallow children in void (self-closing) elements.
28. **noVoidTypeReturn**: Disallow returning values from functions typed `void`.
29. **useIsNan**: Require `isNaN()` when checking for `NaN`.
30. **useParseIntRadix**: Require specifying radix in `parseInt()`.
31. **useValidForDirection**: Ensure `for` loops update the counter in the correct direction.
32. **useValidTypeof**: Ensure `typeof` comparisons use valid values.
33. **useYield**: Require `yield` inside generator functions.

---

## Nursery

1. noDeprecatedImports: Restrict imports of deprecated exports.
2. noImportCycles: Prevent import cycles.
3. noUnresolvedImports: Warn when importing non-existing exports.
4. noUnusedExpressions: Disallow expression statements that are neither a function call nor an assignment.
5. noUselessUndefined: Disallow the use of useless `undefined`.
6. useConsistentArrowReturn: Enforce consistent arrow function bodies.
7. useExhaustiveSwitchCases: Require switch-case statements to be exhaustive.
8. useSortedClasses: Enforce sorting of CSS utility classes.
9. useVueMultiWordComponentNames: Enforce multi-word component names in Vue components.

---

## Performance

1. **noAccumulatingSpread**: Disallow the use of spread (`...`) syntax on accumulators.
2. **noDynamicNamespaceImportAccess**: Disallow accessing namespace imports dynamically.

---

## Security

1. **noBlankTarget**: Disallow `target="_blank"` attribute without `rel="noopener"`.
2. **noGlobalEval**: Disallow the use of global `eval()`.

---

## Style

1. noNonNullAssertion: Disallow non-null assertions using the `!` postfix operator.
2. useArrayLiterals: Disallow Array constructors.
3. useConst: Require `const` declarations for variables that are only assigned once.
4. useExponentiationOperator: Disallow the use of `Math.pow` in favor of the `**` operator.
5. useExportType: Promotes the use of `export type` for types.
6. useImportType: Promotes the use of `import type` for types.
7. useLiteralEnumMembers: Require all enum members to be literal values.
8. useNodejsImportProtocol: Enforces using the `node:` protocol for Node.js builtin modules.
9. useShorthandFunctionType: Enforce using function types instead of object type with call signatures.
10. useTemplate: Prefer template literals over string concatenation.

---

## Suspicious

1. **noApproximativeNumericConstant**: Use standard constants instead of approximated literals.
2. **noAssignInExpressions**: Disallow assignments in expressions.
3. **noAsyncPromiseExecutor**: Disallows using an async function as a Promise executor.
4. **noCatchAssign**: Disallow reassigning exceptions in catch clauses.
5. **noClassAssign**: Disallow reassigning class members.
6. **noCommentText**: Prevent comments from being inserted as text nodes.
7. **noCompareNegZero**: Disallow comparing against `-0`.
8. **noConfusingLabels**: Disallow labeled statements that are not loops.
9. **noConfusingVoidType**: Disallow `void` type outside of generic or return types.
10. **noConstEnum**: Disallow TypeScript `const enum`.
11. **noControlCharactersInRegex**: Prevent control characters in regex literals.
12. **noDebugger**: Disallow the use of `debugger`.
13. **noDocumentCookie**: Disallow direct assignments to `document.cookie`.
14. **noDoubleEquals**: Require the use of `===` and `!==`.
15. **noDuplicateCase**: Disallow duplicate case labels.
16. **noDuplicateClassMembers**: Disallow duplicate class members.
17. **noDuplicateElseIf**: Disallow duplicate conditions in `if-else-if` chains.
18. **noDuplicateJsxProps**: Prevent JSX props from being assigned multiple times.
19. **noDuplicateObjectKeys**: Disallow duplicate keys inside objects.
20. **noDuplicateParameters**: Disallow duplicate function parameter names.
21. **noEmptyInterface**: Disallow declaration of empty interfaces.
22. **noExplicitAny**: Disallow the `any` type usage.
23. **noExtraNonNullAssertion**: Prevent misuse of non-null assertion operator (`!`).
24. **noFallthroughSwitchClause**: Disallow fallthrough in `switch` clauses.
25. **noFunctionAssign**: Disallow reassigning function declarations.
26. **noGlobalAssign**: Disallow assigning to read-only global variables.
27. **noGlobalIsFinite**: Use `Number.isFinite` instead of global `isFinite`.
28. **noGlobalIsNan**: Use `Number.isNaN` instead of global `isNaN`.
29. **noImplicitAnyLet**: Disallow implicit `any` in variable declarations.
30. **noImportAssign**: Disallow assigning to imported bindings.
31. **noIrregularWhitespace**: Disallow irregular whitespace characters.
32. **noLabelVar**: Disallow labels that share a name with a variable.
33. **noMisleadingCharacterClass**: Disallow confusing character classes in regex.
34. **noMisleadingInstantiator**: Enforce proper use of `new` and `constructor`.
35. **noMisrefactoredShorthandAssign**: Disallow shorthand assign when variable appears on both sides.
36. **noNonNullAssertedOptionalChain**: Disallow non-null assertions after optional chaining.
37. **noOctalEscape**: Disallow octal escape sequences in strings.
38. **noPrototypeBuiltins**: Disallow direct use of `Object.prototype` built-ins.
39. **noRedeclare**: Disallow variable, function, or class redeclaration.
40. **noRedundantUseStrict**: Disallow redundant `"use strict"`.
41. **noSelfCompare**: Disallow self-comparison expressions.
42. **noShadowRestrictedNames**: Disallow shadowing of restricted names.
43. **noSparseArray**: Disallow sparse arrays (arrays with holes).
44. **noSuspiciousSemicolonInJsx**: Detect suspicious semicolons in JSX elements.
45. **noTemplateCurlyInString**: Disallow template literal placeholders in normal strings.
46. **noThenProperty**: Disallow use of `.then` property.
47. **noTsIgnore**: Disallow the `@ts-ignore` directive.
48. **noUnsafeDeclarationMerging**: Disallow unsafe interface-class declaration merging.
49. **noUnsafeNegation**: Disallow unsafe negation patterns.
50. **noUselessEscapeInString**: Disallow unnecessary escape characters in strings.
51. **noUselessRegexBackrefs**: Disallow useless regex backreferences.
52. **noWith**: Disallow `with` statements.
53. **useAdjacentOverloadSignatures**: Require adjacent overload signatures.
54. **useDefaultSwitchClauseLast**: Require `default` clause to be last in `switch`.
55. **useGetterReturn**: Enforce getters to always return a value.
56. **useGoogleFontDisplay**: Enforce proper `display` with Google Fonts.
57. **useIsArray**: Use `Array.isArray()` instead of `instanceof Array`.
58. **useIterableCallbackReturn**: Enforce consistent return values in iterable callbacks.
59. **useNamespaceKeyword**: Require `namespace` keyword instead of `module`.
60. **useDefaultSwitchClauseLast**: Enforce default clause last in switch statements.
