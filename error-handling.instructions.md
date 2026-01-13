---
description: Instructions for accessible form validation and error handling
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Error Handling Accessibility

## CRITICAL RULES

**Errors must be clearly identified, described, and associated with the relevant form fields so all users can understand and correct them.**

### 1. Associate Errors with Form Fields

Error messages must be programmatically connected to their fields using `aria-describedby`.

```html
<!-- Good - Error associated with input -->
<label for="email">Email Address</label>
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
>
<p id="email-error" class="error">Please enter a valid email address</p>

<!-- Good - Multiple descriptions (hint + error) -->
<label for="password">Password</label>
<input
  type="password"
  id="password"
  aria-invalid="true"
  aria-describedby="password-hint password-error"
>
<p id="password-hint">Must be at least 8 characters</p>
<p id="password-error" class="error">Password is too short</p>

<!-- Bad - Error not associated -->
<label for="email">Email Address</label>
<input type="email" id="email">
<p class="error">Please enter a valid email address</p>  <!-- Not connected! -->
```

**Why association matters:**
- Screen readers announce errors when the field receives focus
- Users understand which error belongs to which field
- Assistive technology can navigate between fields and their errors

### 2. Use aria-invalid to Mark Invalid Fields

Set `aria-invalid="true"` on fields with errors.

```html
<!-- Good - Invalid field marked -->
<input
  type="email"
  id="email"
  aria-invalid="true"
  aria-describedby="email-error"
>

<!-- Good - Valid field (omit or set false) -->
<input type="email" id="email" aria-invalid="false">
<!-- Or simply omit aria-invalid when valid -->
<input type="email" id="email">

<!-- Bad - Error shown but field not marked invalid -->
<input type="email" id="email">
<p class="error">Invalid email</p>  <!-- Missing aria-invalid! -->
```

### 3. Announce Errors to Screen Readers

Use live regions or `role="alert"` to announce errors immediately.

```html
<!-- Good - Error announced with role="alert" -->
<p id="email-error" role="alert" class="error">
  Please enter a valid email address
</p>

<!-- Good - Error summary announced -->
<div role="alert" aria-live="assertive">
  <h2>Please correct the following errors:</h2>
  <ul>
    <li><a href="#email">Email address is required</a></li>
    <li><a href="#password">Password must be at least 8 characters</a></li>
  </ul>
</div>

<!-- Good - Polite announcement for inline validation -->
<p id="username-error" aria-live="polite" class="error">
  Username already taken
</p>

<!-- Bad - Error not announced -->
<p class="error">Invalid email</p>  <!-- Screen reader won't know it appeared -->
```

**When to use each:**
- `role="alert"` / `aria-live="assertive"`: Form submission errors
- `aria-live="polite"`: Inline validation while typing
- Error summary: Multiple errors on form submission

### 4. Provide Clear Error Messages

Error messages should explain the problem AND how to fix it.

```html
<!-- Good - Explains problem and solution -->
<p id="email-error" class="error">
  Please enter a valid email address (e.g., name@example.com)
</p>

<p id="date-error" class="error">
  Enter the date in MM/DD/YYYY format
</p>

<p id="password-error" class="error">
  Password must be at least 8 characters and include a number
</p>

<!-- Bad - Vague or unhelpful -->
<p class="error">Invalid input</p>
<p class="error">Error</p>
<p class="error">This field is required</p>  <!-- Which field? What's needed? -->
```

### 5. Provide Error Summary for Multiple Errors

When forms have multiple errors, provide a summary at the top.

```html
<!-- Good - Error summary with links -->
<div role="alert" id="error-summary" tabindex="-1">
  <h2>There are 3 errors in this form</h2>
  <ul>
    <li><a href="#email">Email: Please enter a valid email address</a></li>
    <li><a href="#password">Password: Must be at least 8 characters</a></li>
    <li><a href="#phone">Phone: Please enter a valid phone number</a></li>
  </ul>
</div>

<script>
// Move focus to error summary on submit
function onSubmitError() {
  document.getElementById('error-summary').focus();
}
</script>
```

**Error summary best practices:**
- Place at the top of the form
- Include links to each invalid field
- Move focus to the summary on form submission
- Use `role="alert"` to announce immediately

## Error Handling Patterns

### Inline Validation (Real-time)

```html
<!-- Validate as user types -->
<label for="username">Username</label>
<input
  type="text"
  id="username"
  aria-describedby="username-hint username-status"
  oninput="validateUsername(this)"
>
<p id="username-hint">3-20 characters, letters and numbers only</p>
<p id="username-status" aria-live="polite"></p>

<script>
function validateUsername(input) {
  const status = document.getElementById('username-status');
  const value = input.value;

  if (value.length < 3) {
    status.textContent = 'Username must be at least 3 characters';
    input.setAttribute('aria-invalid', 'true');
  } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
    status.textContent = 'Only letters and numbers allowed';
    input.setAttribute('aria-invalid', 'true');
  } else {
    status.textContent = '';
    input.removeAttribute('aria-invalid');
  }
}
</script>
```

### On Submit Validation

```html
<form onsubmit="return validateForm(event)">
  <!-- Error summary container (initially hidden) -->
  <div id="error-summary" role="alert" tabindex="-1" hidden></div>

  <div class="form-field">
    <label for="email">Email *</label>
    <input type="email" id="email" required aria-describedby="email-error">
    <p id="email-error" class="error" hidden></p>
  </div>

  <div class="form-field">
    <label for="password">Password *</label>
    <input type="password" id="password" required aria-describedby="password-error">
    <p id="password-error" class="error" hidden></p>
  </div>

  <button type="submit">Submit</button>
</form>

<script>
function validateForm(event) {
  const errors = [];
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Reset previous errors
  clearErrors();

  // Validate email
  if (!emailInput.value) {
    errors.push({ field: 'email', message: 'Email is required' });
    showFieldError('email', 'Please enter your email address');
  } else if (!emailInput.validity.valid) {
    errors.push({ field: 'email', message: 'Email is invalid' });
    showFieldError('email', 'Please enter a valid email (e.g., name@example.com)');
  }

  // Validate password
  if (!passwordInput.value) {
    errors.push({ field: 'password', message: 'Password is required' });
    showFieldError('password', 'Please enter a password');
  } else if (passwordInput.value.length < 8) {
    errors.push({ field: 'password', message: 'Password too short' });
    showFieldError('password', 'Password must be at least 8 characters');
  }

  // Show error summary if errors exist
  if (errors.length > 0) {
    event.preventDefault();
    showErrorSummary(errors);
    return false;
  }

  return true;
}

function showFieldError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);

  input.setAttribute('aria-invalid', 'true');
  error.textContent = message;
  error.hidden = false;
}

function showErrorSummary(errors) {
  const summary = document.getElementById('error-summary');
  summary.innerHTML = `
    <h2>Please correct ${errors.length} error${errors.length > 1 ? 's' : ''}:</h2>
    <ul>
      ${errors.map(e =>
        `<li><a href="#${e.field}">${e.message}</a></li>`
      ).join('')}
    </ul>
  `;
  summary.hidden = false;
  summary.focus();
}

function clearErrors() {
  document.querySelectorAll('[aria-invalid]').forEach(el => {
    el.removeAttribute('aria-invalid');
  });
  document.querySelectorAll('.error').forEach(el => {
    el.textContent = '';
    el.hidden = true;
  });
  document.getElementById('error-summary').hidden = true;
}
</script>
```

### React Error Handling

```jsx
function Form() {
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryRef = useRef(null);

  const validate = (values) => {
    const newErrors = {};

    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData);

    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitted(true);

    if (Object.keys(validationErrors).length > 0) {
      // Focus error summary
      errorSummaryRef.current?.focus();
    } else {
      // Submit form
      submitForm(values);
    }
  };

  const errorList = Object.entries(errors);

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Error Summary */}
      {submitted && errorList.length > 0 && (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          className="error-summary"
        >
          <h2>Please correct {errorList.length} error{errorList.length > 1 ? 's' : ''}:</h2>
          <ul>
            {errorList.map(([field, message]) => (
              <li key={field}>
                <a href={`#${field}`}>{message}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Form Fields */}
      <FormField
        id="email"
        label="Email"
        type="email"
        required
        error={errors.email}
      />

      <FormField
        id="password"
        label="Password"
        type="password"
        required
        error={errors.password}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

function FormField({ id, label, type, required, error }) {
  const errorId = `${id}-error`;

  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} className="error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

### Vue Error Handling

```vue
<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <!-- Error Summary -->
    <div
      v-if="submitted && hasErrors"
      ref="errorSummary"
      role="alert"
      tabindex="-1"
      class="error-summary"
    >
      <h2>Please correct {{ errorCount }} error{{ errorCount > 1 ? 's' : '' }}:</h2>
      <ul>
        <li v-for="(message, field) in errors" :key="field">
          <a :href="`#${field}`">{{ message }}</a>
        </li>
      </ul>
    </div>

    <!-- Form Fields -->
    <FormField
      v-model="form.email"
      id="email"
      label="Email"
      type="email"
      required
      :error="errors.email"
    />

    <FormField
      v-model="form.password"
      id="password"
      label="Password"
      type="password"
      required
      :error="errors.password"
    />

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: { email: '', password: '' },
      errors: {},
      submitted: false
    };
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0;
    },
    errorCount() {
      return Object.keys(this.errors).length;
    }
  },
  methods: {
    validate() {
      const errors = {};

      if (!this.form.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(this.form.email)) {
        errors.email = 'Please enter a valid email address';
      }

      if (!this.form.password) {
        errors.password = 'Password is required';
      } else if (this.form.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
      }

      return errors;
    },
    handleSubmit() {
      this.errors = this.validate();
      this.submitted = true;

      if (this.hasErrors) {
        this.$nextTick(() => {
          this.$refs.errorSummary?.focus();
        });
      } else {
        this.submitForm();
      }
    }
  }
};
</script>
```

## Common Mistakes

### Error Not Associated with Field

```html
<!-- Bad -->
<input type="email" id="email">
<span class="error">Invalid email</span>

<!-- Good -->
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<span id="email-error" class="error">Invalid email</span>
```

### Missing aria-invalid

```html
<!-- Bad - Error shown but field not marked -->
<input type="email" id="email" aria-describedby="email-error">
<span id="email-error">Invalid email</span>

<!-- Good - Field marked as invalid -->
<input type="email" id="email" aria-invalid="true" aria-describedby="email-error">
<span id="email-error">Invalid email</span>
```

### Error Not Announced

```html
<!-- Bad - Error appears silently -->
<span class="error">Invalid email</span>

<!-- Good - Error announced -->
<span class="error" role="alert">Invalid email</span>
```

## WCAG References

- **WCAG 2.1 Success Criterion 3.3.1**: Error Identification (Level A)
- **WCAG 2.1 Success Criterion 3.3.3**: Error Suggestion (Level AA)
- **WCAG 2.1 Success Criterion 3.3.4**: Error Prevention (Level AA)
- **WCAG 2.1 Success Criterion 4.1.3**: Status Messages (Level AA)

## Implementation Checklist

- [ ] **Are error messages associated with fields via `aria-describedby`?**
- [ ] **Are invalid fields marked with `aria-invalid="true"`?**
- [ ] **Are errors announced using `role="alert"` or `aria-live`?**
- [ ] **Do error messages explain the problem AND how to fix it?**
- [ ] **Is there an error summary for multiple errors?**
- [ ] **Does focus move to error summary on form submission?**
- [ ] **Do error summary links navigate to the invalid fields?**
- [ ] **Is inline validation using `aria-live="polite"`?**

## Quick Reference

```
ERROR HANDLING RULES:

1. Associate errors with fields:
   <input aria-invalid="true" aria-describedby="field-error">
   <span id="field-error">Error message</span>

2. Mark invalid fields:
   aria-invalid="true" on the input element

3. Announce errors:
   - Form submission: role="alert" or aria-live="assertive"
   - Inline validation: aria-live="polite"

4. Clear error messages:
   - Explain what's wrong
   - Tell user how to fix it
   - Example: "Please enter a valid email (e.g., name@example.com)"

5. Error summary for multiple errors:
   - Place at top of form
   - Include links to invalid fields
   - Focus summary on submit
   - Use role="alert"

NEVER:
  - Show errors without aria-describedby association
  - Forget aria-invalid="true" on invalid fields
  - Use vague messages like "Invalid input"
  - Rely only on color to indicate errors
```
