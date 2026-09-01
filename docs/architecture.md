# Lero Lero v2 architecture

The v2 codebase is split into small runtime layers so new form-filling features can be added without turning the content script into a monolith.

## Runtime flow

```text
FormScanner
    ↓
FieldDetector
    ↓
GeneratorRegistry
    ↓
FieldFiller
```

`content-script.js` is only the orchestrator. It receives extension messages, obtains the active field, asks the detector for a descriptor, selects a generator, and delegates the actual DOM update to the filler.

## Layers

- `src/background`: Manifest V3 service worker and browser-level events.
- `src/content`: page scanning, field detection and field filling.
- `src/generators`: generator registry plus local value generators.
- `src/storage`: persistence abstractions over `chrome.storage`.
- `src/profiles`: profile persistence and URL matching contracts.
- `src/templates`: template rendering boundary for dynamic values.
- `src/shared`: constants and the shared `LeroLero` namespace.
- `src/popup`: current extension popup.

## Field descriptor

`FieldDetector.detect(element)` returns a normalized object instead of making generators read arbitrary DOM attributes directly.

```js
{
  element,
  kind: "number",
  htmlType: "number",
  name: "quantity",
  id: "quantity",
  constraints: {
    min: 1,
    max: 100,
    step: 1,
    minLength: null,
    maxLength: null,
    required: true
  }
}
```

The next Smart Fill milestone will expand `kind`, semantic detection, supported controls and descriptor metadata.

## Generator contract

A generator only needs to expose:

```js
{
  generate(context) {
    return "value";
  }
}
```

Generators are registered by id in `GeneratorRegistry`. The legacy text JSON files are deliberately wrapped behind this contract so they can later be replaced by the new Lero Lero engine without changing the content orchestration.

## Profile contract

Profiles are not wired into filling yet, but persistence and URL resolution live behind dedicated classes. The intended shape is:

```js
{
  id: "contract-create",
  name: "Contract creation",
  match: {
    hostname: "example.com",
    pathname: "/contracts/*"
  },
  fields: []
}
```

Field rules, relative dates, templates and AI context will be introduced in their own milestones.

## Template contract

`TemplateEngine` currently resolves simple dotted variables such as `{{ field.title }}`. Date arithmetic, formatters, random helpers and dependency ordering are intentionally deferred to the template milestone.
