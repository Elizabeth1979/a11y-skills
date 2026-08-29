---
description: Instructions for accessible form structure, labels, and overall form patterns
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Form Accessibility

## CRITICAL RULES

**Forms must be perceivable, operable, and understandable for all users, including those using assistive technologies.**

### 1. Every Input MUST Have an Associated Label

All form inputs require a programmatically associated label.

```html
<!-- Good - Explicit label with for/id -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email">

<!-- Good - Implicit label (wrapping) -->
<label>
  Email Address
  <input type="email" name="email">
</label>

<!-- Good - aria-label for inputs without visible labels -->
<input type="search" aria-label="Search products">

<!-- Good - aria-labelledby for complex labels -->
<span id="card-label">Credit Card Number</span>
<span id="card-hint">(16 digits, no spaces)</span>
<input type="text" aria-labelledby="card-label card-hint">

<!-- Bad - No label association -->
<span>Email Address</span>  <!-- Not a label! -->
<input type="email" name="email">

<!-- Bad - Placeholder as only label -->
<input type="email" placeholder="Email Address">  <!-- Placeholder is NOT a label! -->
```

**Why labels matter:**
- Screen readers announce labels when inputs receive focus
- Clicking labels focuses/activates the associated input
- Labels provide larger click targets (especially for checkboxes/radios)

### 2. Group Related Inputs with fieldset and legend

Use `<fieldset>` and `<legend>` to group related form controls.

```html
<!-- Good - Grouped with fieldset/legend -->
<fieldset>
  <legend>Shipping Address</legend>
  <label for="street">Street</label>
  <input type="text" id="street" name="street">

  <label for="city">City</label>
  <input type="text" id="city" name="city">

  <label for="zip">ZIP Code</label>
  <input type="text" id="zip" name="zip">
</fieldset>

<!-- Good - Radio buttons grouped -->
<fieldset>
  <legend>Preferred Contact Method</legend>
  <label>
    <input type="radio" name="contact" value="email"> Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone"> Phone
  </label>
  <label>
    <input type="radio" name="contact" value="mail"> Mail
  </label>
</fieldset>

<!-- Bad - Radio buttons without fieldset -->
<p>Preferred Contact Method</p>  <!-- Not associated with inputs -->
<label><input type="radio" name="contact" value="email"> Email</label>
<label><input type="radio" name="contact" value="phone"> Phone</label>
```

**Use fieldset/legend for:**
- Radio button groups
- Checkbox groups
- Address sections
- Any logically related set of inputs

### 3. Mark Required Fields Clearly

Indicate required fields both visually and programmatically.

```html
<!-- Good - Required attribute + visual indicator -->
<label for="name">
  Full Name <span aria-hidden="true">*</span>
  <span class="visually-hidden">(required)</span>
</label>
<input type="text" id="name" name="name" required aria-required="true">

<!-- Good - Instructions about required fields -->
<p id="required-note">Fields marked with * are required</p>
<form aria-describedby="required-note">
  <label for="email">Email *</label>
  <input type="email" id="email" required>
</form>

<!-- Good - Using aria-required -->
<label for="phone">Phone Number</label>
<input type="tel" id="phone" aria-required="true">

<!-- Bad - Only visual indicator -->
<label for="name">Full Name *</label>  <!-- Screen reader just says "asterisk" -->
<input type="text" id="name">  <!-- Missing required attribute -->
```

### 4. Provide Clear Instructions and Hints

Use `aria-describedby` to associate hints and instructions with inputs.

```html
<!-- Good - Hint text associated with input -->
<label for="password">Password</label>
<input
  type="password"
  id="password"
  aria-describedby="password-hint"
>
<p id="password-hint">Must be at least 8 characters with one number</p>

<!-- Good - Multiple descriptions -->
<label for="username">Username</label>
<input
  type="text"
  id="username"
  aria-describedby="username-hint username-error"
>
<p id="username-hint">Letters and numbers only, 3-20 characters</p>
<p id="username-error" role="alert">Username is already taken</p>

<!-- Bad - Hint not associated -->
<label for="password">Password</label>
<input type="password" id="password">
<p>Must be at least 8 characters</p>  <!-- Not programmatically connected -->
```

### 5. Use Appropriate Input Types

Use semantic input types for better accessibility and mobile experience.

```html
<!-- Good - Semantic input types -->
<input type="email" name="email">      <!-- Email keyboard on mobile -->
<input type="tel" name="phone">        <!-- Phone keyboard on mobile -->
<input type="url" name="website">      <!-- URL keyboard -->
<input type="number" name="quantity">  <!-- Numeric keyboard -->
<input type="date" name="birthdate">   <!-- Date picker -->
<input type="search" name="query">     <!-- Search semantics -->

<!-- Good - Autocomplete attributes -->
<input type="text" name="name" autocomplete="name">
<input type="email" name="email" autocomplete="email">
<input type="tel" name="phone" autocomplete="tel">
<input type="text" name="address" autocomplete="street-address">
<input type="text" name="cc-number" autocomplete="cc-number">

<!-- Bad - Generic types for everything -->
<input type="text" name="email">  <!-- Use type="email" -->
<input type="text" name="phone">  <!-- Use type="tel" -->
```

**Autocomplete values for common fields:**
- `name`, `given-name`, `family-name`
- `email`, `tel`
- `street-address`, `address-line1`, `city`, `postal-code`, `country`
- `cc-number`, `cc-exp`, `cc-csc`
- `username`, `current-password`, `new-password`

## Form Structure Patterns

### Complete Form Example

```html
<form aria-labelledby="form-title" aria-describedby="form-instructions">
  <h2 id="form-title">Contact Us</h2>
  <p id="form-instructions">
    Fields marked with <span aria-hidden="true">*</span>
    <span class="visually-hidden">asterisk</span> are required.
  </p>

  <!-- Personal Information Group -->
  <fieldset>
    <legend>Personal Information</legend>

    <div class="form-field">
      <label for="full-name">
        Full Name <span aria-hidden="true">*</span>
      </label>
      <input
        type="text"
        id="full-name"
        name="name"
        required
        autocomplete="name"
      >
    </div>

    <div class="form-field">
      <label for="email">
        Email Address <span aria-hidden="true">*</span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        autocomplete="email"
        aria-describedby="email-hint"
      >
      <p id="email-hint" class="hint">We'll never share your email</p>
    </div>

    <div class="form-field">
      <label for="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        autocomplete="tel"
      >
    </div>
  </fieldset>

  <!-- Contact Preference Group -->
  <fieldset>
    <legend>Preferred Contact Method <span aria-hidden="true">*</span></legend>
    <label>
      <input type="radio" name="contact-method" value="email" required>
      Email
    </label>
    <label>
      <input type="radio" name="contact-method" value="phone">
      Phone
    </label>
  </fieldset>

  <!-- Message -->
  <div class="form-field">
    <label for="message">
      Your Message <span aria-hidden="true">*</span>
    </label>
    <textarea
      id="message"
      name="message"
      required
      rows="5"
      aria-describedby="message-hint"
    ></textarea>
    <p id="message-hint" class="hint">Maximum 500 characters</p>
  </div>

  <button type="submit">Send Message</button>
</form>
```

### React Form Component

```jsx
function ContactForm() {
  const [errors, setErrors] = useState({});

  return (
    <form aria-labelledby="form-title" onSubmit={handleSubmit}>
      <h2 id="form-title">Contact Us</h2>

      <FormField
        label="Full Name"
        name="name"
        type="text"
        required
        autoComplete="name"
        error={errors.name}
      />

      <FormField
        label="Email"
        name="email"
        type="email"
        required
        autoComplete="email"
        hint="We'll never share your email"
        error={errors.email}
      />

      <fieldset>
        <legend>Preferred Contact Method</legend>
        <RadioGroup
          name="contactMethod"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
          ]}
          required
        />
      </fieldset>

      <button type="submit">Send Message</button>
    </form>
  );
}

// Reusable FormField component
function FormField({
  label,
  name,
  type = 'text',
  required,
  hint,
  error,
  ...props
}) {
  const id = `field-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        aria-required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        {...props}
      />
      {hint && <p id={hintId} className="hint">{hint}</p>}
      {error && <p id={errorId} className="error" role="alert">{error}</p>}
    </div>
  );
}
```

### Vue Form Component

```vue
<template>
  <form @submit.prevent="handleSubmit" aria-labelledby="form-title">
    <h2 id="form-title">Contact Us</h2>

    <FormField
      v-model="form.name"
      label="Full Name"
      name="name"
      type="text"
      required
      autocomplete="name"
      :error="errors.name"
    />

    <FormField
      v-model="form.email"
      label="Email"
      name="email"
      type="email"
      required
      autocomplete="email"
      hint="We'll never share your email"
      :error="errors.email"
    />

    <fieldset>
      <legend>Preferred Contact Method</legend>
      <label v-for="option in contactOptions" :key="option.value">
        <input
          type="radio"
          name="contactMethod"
          :value="option.value"
          v-model="form.contactMethod"
          required
        >
        {{ option.label }}
      </label>
    </fieldset>

    <button type="submit">Send Message</button>
  </form>
</template>

<script>
// FormField.vue component
export default {
  props: ['modelValue', 'label', 'name', 'type', 'required', 'hint', 'error'],
  computed: {
    inputId() {
      return `field-${this.name}`;
    },
    describedBy() {
      const ids = [];
      if (this.hint) ids.push(`${this.inputId}-hint`);
      if (this.error) ids.push(`${this.inputId}-error`);
      return ids.join(' ') || undefined;
    }
  }
};
</script>
```

## Common Mistakes

### Placeholder as Label

```html
<!-- Bad - Placeholder disappears when typing -->
<input type="email" placeholder="Email Address">

<!-- Good - Proper label -->
<label for="email">Email Address</label>
<input type="email" id="email" placeholder="name@example.com">
```

### Missing Label Association

```html
<!-- Bad - Label not associated -->
<label>Email Address</label>
<input type="email" id="email">

<!-- Good - Explicit association -->
<label for="email">Email Address</label>
<input type="email" id="email">
```

### Button Without Type

```html
<!-- Bad - Defaults to submit, may cause issues -->
<button>Cancel</button>

<!-- Good - Explicit types -->
<button type="submit">Submit</button>
<button type="button">Cancel</button>
<button type="reset">Reset</button>
```

## WCAG References

- **WCAG 2.1 Success Criterion 1.3.1**: Info and Relationships (Level A)
- **WCAG 2.1 Success Criterion 2.4.6**: Headings and Labels (Level AA)
- **WCAG 2.1 Success Criterion 3.3.2**: Labels or Instructions (Level A)
- **WCAG 2.1 Success Criterion 4.1.2**: Name, Role, Value (Level A)
- **WCAG 2.1 Success Criterion 1.3.5**: Identify Input Purpose (Level AA)

## Related Skills

- [checkbox.instructions.md](checkbox.instructions.md) - Checkbox accessibility
- [radio.instructions.md](radio.instructions.md) - Radio button groups
- [combobox.instructions.md](combobox.instructions.md) - Autocomplete patterns
- [error-handling.instructions.md](error-handling.instructions.md) - Form validation errors

## Implementation Checklist

- [ ] **Does every input have an associated label?**
- [ ] **Are related inputs grouped with fieldset/legend?**
- [ ] **Are required fields marked with `required` and visually indicated?**
- [ ] **Are hints/instructions connected via `aria-describedby`?**
- [ ] **Are appropriate input types used (email, tel, etc.)?**
- [ ] **Are autocomplete attributes provided for common fields?**
- [ ] **Do buttons have explicit type attributes?**
- [ ] **Can the form be completed using only a keyboard?**

## Quick Reference

```
FORM ACCESSIBILITY RULES:

Labels:
  - Every input MUST have a label
  - Use <label for="id"> or wrap input in <label>
  - Placeholders are NOT labels
  - Use aria-label for inputs without visible labels

Grouping:
  - Use <fieldset> + <legend> for related inputs
  - Required for radio/checkbox groups
  - Use for address sections, preferences, etc.

Required Fields:
  - Use required attribute on input
  - Add visual indicator (* with explanation)
  - Consider aria-required="true"

Instructions:
  - Connect hints via aria-describedby
  - Provide format hints (date format, password rules)
  - Explain any constraints

Input Types:
  type="email"    - Email addresses
  type="tel"      - Phone numbers
  type="url"      - URLs
  type="number"   - Numeric values
  type="date"     - Dates
  type="search"   - Search queries

Autocomplete:
  autocomplete="name"           - Full name
  autocomplete="email"          - Email
  autocomplete="tel"            - Phone
  autocomplete="street-address" - Address
  autocomplete="cc-number"      - Credit card

NEVER:
  - Use placeholder as the only label
  - Forget to associate labels with inputs
  - Omit fieldset/legend for radio groups
  - Leave required fields unmarked
```
