---
description: Instructions for accessible authentication and avoiding redundant entry, per WCAG 2.2
applyTo: '**/*.{html,jsx,tsx,vue,svelte}'
---

# Authentication and Redundant Entry Accessibility

## CRITICAL RULES

**WCAG 2.2 added two criteria that govern sign-in and multi-step forms: 3.3.8 Accessible
Authentication (Minimum) at Level AA, and 3.3.7 Redundant Entry at Level A.**

Both target *cognitive* accessibility — the part of WCAG that markup alone cannot fix. They are
about not requiring people to remember, transcribe, or solve puzzles.

### 1. No Cognitive Function Test Without an Alternative

3.3.8 forbids requiring a cognitive function test — remembering a password, solving a puzzle,
transcribing characters — at any step of authentication, unless one of these is provided:

- An **alternative** authentication method that is not a cognitive function test, or
- A **mechanism to assist** the user in completing it, or
- The test is **object recognition** (identify photos of a cat), or
- The test is **personal content** the user provided (identify a picture you uploaded)

```html
<!-- Bad - password field that blocks paste and autofill -->
<input type="password" name="password"
       onpaste="return false"
       autocomplete="off">
<!-- Blocking paste breaks password managers. The user must now *remember* and *transcribe*
     the password - a cognitive function test with no assistance. This fails 3.3.8. -->

<!-- Good - password managers work, so the memory burden is removed -->
<label for="password">Password</label>
<input type="password" id="password" name="password"
       autocomplete="current-password">
```

**Why this matters:**
- `autocomplete="current-password"` is what lets a password manager fill the field — it *is* the
  "mechanism to assist"
- Blocking paste is the single most common 3.3.8 failure, and it is usually added deliberately
  in the belief that it improves security. It does not; it pushes people toward weaker,
  memorable passwords

### 2. Never Block Paste, Autofill, or Password Managers

```html
<!-- Bad - all four of these fail 3.3.8 -->
<input type="password" onpaste="return false">
<input type="password" autocomplete="off">
<input type="password" oncopy="return false" oncut="return false">
<div contenteditable role="textbox"><!-- fake password field --></div>

<!-- Good -->
<input type="password" autocomplete="current-password">
<input type="password" autocomplete="new-password">   <!-- registration / reset -->
<input type="email"    autocomplete="username">
```

Use the correct `autocomplete` token. `autocomplete="off"` on a password field is both a 3.3.8
problem and a 1.3.5 Identify Input Purpose (AA) problem.

### 3. One-Time Codes Must Be Pasteable

Two-factor codes are the other frequent failure. Splitting a six-digit code into six separate
inputs forces transcription one character at a time.

```html
<!-- Bad - six boxes, paste lands in the first one only -->
<input maxlength="1"><input maxlength="1"><input maxlength="1">
<input maxlength="1"><input maxlength="1"><input maxlength="1">

<!-- Good - one field, pasteable, OS autofill works -->
<label for="otp">Six-digit code from your authenticator app</label>
<input type="text" id="otp" name="otp"
       inputmode="numeric"
       autocomplete="one-time-code"
       pattern="[0-9]{6}"
       maxlength="6">
```

`autocomplete="one-time-code"` lets iOS and Android offer the code from an SMS automatically. If
the design requires separate boxes, you must handle a paste of the full code into any box and
distribute it across the fields.

### 4. CAPTCHA Needs a Non-Cognitive Route

A distorted-text CAPTCHA is a cognitive function test. Object recognition ("select all the
buses") is explicitly permitted by 3.3.8, and so is personal content — but transcribing warped
characters or solving a puzzle is not, unless an alternative exists.

```html
<!-- Good - object recognition is allowed under 3.3.8 -->
<fieldset>
  <legend>Select every image containing a bicycle</legend>
  <!-- image checkboxes with real alt text -->
</fieldset>

<!-- Better - no cognitive test at all -->
<!-- Server-side risk scoring, or a privacy-preserving attestation check, asks nothing of the user. -->
```

Prefer approaches that ask the user for nothing. Where a challenge is unavoidable, do not make
text transcription the only route.

### 5. Do Not Ask Twice for the Same Information

3.3.7 Redundant Entry (Level A): within a single process, information the user already entered
must be auto-populated or available to select — not re-typed.

```html
<!-- Bad - checkout asks for the address again -->
<h2>Step 2: Billing address</h2>
<input name="billing_street" placeholder="Street">
<input name="billing_city" placeholder="City">
<!-- The user typed all of this on step 1 as the shipping address. -->

<!-- Good - offer it rather than demand it again -->
<h2>Step 2: Billing address</h2>
<label>
  <input type="checkbox" id="same-as-shipping" checked>
  Same as shipping address
</label>

<fieldset id="billing-fields">
  <legend>Billing address</legend>
  <label for="billing_street">Street</label>
  <input id="billing_street" name="billing_street" autocomplete="billing street-address">
</fieldset>
```

**Exceptions to 3.3.7:** re-entry is allowed when it is *essential* (confirming a new password),
when the information is no longer valid, or when re-entry is required for security (re-entering a
password to confirm a destructive action).

### 6. A Password Confirmation Field Is an Essential Exception — Nothing Else Is

```html
<!-- Good - essential exception correctly claimed -->
<label for="new-password">New password</label>
<input type="password" id="new-password" autocomplete="new-password">

<label for="confirm-password">Confirm new password</label>
<input type="password" id="confirm-password" autocomplete="new-password">

<!-- Bad - "confirm your email" on a signup form -->
<!-- Not essential. Show the entered address back and let the user correct it instead. -->
```

## Complete Sign-In Structure

```html
<main>
  <h1>Sign in</h1>

  <form action="/session" method="post" novalidate>
    <div class="field">
      <label for="email">Email address</label>
      <input type="email" id="email" name="email"
             autocomplete="username"
             aria-describedby="email-error"
             required>
      <p id="email-error" class="error" hidden></p>
    </div>

    <div class="field">
      <label for="password">Password</label>
      <input type="password" id="password" name="password"
             autocomplete="current-password"
             aria-describedby="password-error"
             required>
      <p id="password-error" class="error" hidden></p>
    </div>

    <button type="submit">Sign in</button>
  </form>

  <p><a href="/reset">Forgot your password?</a></p>

  <h2>Other ways to sign in</h2>
  <ul>
    <li><button type="button">Sign in with a passkey</button></li>
    <li><button type="button">Email me a sign-in link</button></li>
  </ul>

  <div role="alert" id="form-status"></div>
</main>
```

Passkeys and emailed sign-in links are not cognitive function tests at all, which is why offering
one is the cleanest way to satisfy 3.3.8 rather than arguing about exceptions.

## Examples

### React — multi-step form that does not re-ask

```jsx
function BillingStep({ shipping, billing, setBilling }) {
  const [sameAsShipping, setSameAsShipping] = useState(true);

  useEffect(() => {
    if (sameAsShipping) setBilling(shipping);   // 3.3.7: auto-populate, do not re-ask
  }, [sameAsShipping, shipping, setBilling]);

  return (
    <>
      <label>
        <input
          type="checkbox"
          checked={sameAsShipping}
          onChange={(e) => setSameAsShipping(e.target.checked)}
        />
        Billing address is the same as shipping
      </label>

      {!sameAsShipping && (
        <fieldset>
          <legend>Billing address</legend>
          {/* fields, pre-filled and editable */}
        </fieldset>
      )}
    </>
  );
}
```

Pre-fill and allow editing. Auto-populating a field the user cannot correct trades one failure
for another.

### Error handling on failed sign-in

See [error-handling.instructions.md](error-handling.instructions.md). Two authentication-specific
notes:

- Move focus to the error, or announce it in a live region — a failed sign-in that only changes
  colour is invisible to a screen reader user
- Keep the message identical for wrong-username and wrong-password. That is a security
  requirement, and it does not conflict with 3.3.1 Error Identification, which asks that the
  error be identified, not that it be diagnosed

## Testing

The mechanical parts:

```js
// autocomplete tokens present and correct
await expect(page.locator('#email')).toHaveAttribute('autocomplete', 'username');
await expect(page.locator('#password')).toHaveAttribute('autocomplete', 'current-password');

// paste is not blocked
await page.locator('#password').focus();
await page.evaluate(() => navigator.clipboard.writeText('correct horse battery staple'));
await page.keyboard.press('Control+V');
await expect(page.locator('#password')).toHaveValue('correct horse battery staple');
```

Whether an authentication alternative is genuinely usable, and whether a re-entry is genuinely
essential, are human judgements. State them as such.

## WCAG References

- **WCAG 2.2 Success Criterion 3.3.8**: Accessible Authentication (Minimum) (Level AA) — new in WCAG 2.2
- **WCAG 2.2 Success Criterion 3.3.9**: Accessible Authentication (Enhanced) (Level AAA) — new in WCAG 2.2
- **WCAG 2.2 Success Criterion 3.3.7**: Redundant Entry (Level A) — new in WCAG 2.2
- **WCAG 2.1 Success Criterion 1.3.5**: Identify Input Purpose (Level AA)
- **WCAG 2.1 Success Criterion 3.3.1**: Error Identification (Level A)
- **WCAG 2.1 Success Criterion 3.3.2**: Labels or Instructions (Level A)

## Implementation Checklist

On any sign-in, registration, or multi-step form:
- [ ] **Is paste allowed in every password and code field?** (CRITICAL — 3.3.8, Level AA)
- [ ] **Does every credential field carry the right `autocomplete` token?** (CRITICAL)
- [ ] **Is `autocomplete="off"` absent from password fields?** (CRITICAL)
- [ ] **Can a one-time code be pasted in one action?** (`autocomplete="one-time-code"`)
- [ ] **If a CAPTCHA exists, is there a route that is not text transcription?**
- [ ] **Is a non-memory method offered — passkey, email link, or similar?**
- [ ] **Is any information re-requested within the same process?** (3.3.7, Level A)
- [ ] **Where re-entry happens, is it genuinely essential or security-required?**
- [ ] **Are sign-in errors announced, not just shown in colour?**

## Quick Reference

| Field | `autocomplete` token |
|---|---|
| Username / email on sign-in | `username` |
| Existing password | `current-password` |
| New password (signup, reset) | `new-password` |
| Confirm new password | `new-password` |
| Two-factor code | `one-time-code` |

| Criterion | Level | Forbids |
|---|---|---|
| 3.3.7 Redundant Entry | A | Re-asking for information already given in the process |
| 3.3.8 Accessible Authentication (Min) | AA | Cognitive function tests with no alternative or assist |
| 3.3.9 Accessible Authentication (Enhanced) | AAA | Object recognition and personal content too |

| Permitted under 3.3.8 | Not permitted without an alternative |
|---|---|
| Object recognition ("pick the buses") | Distorted-text CAPTCHA |
| Personal content you uploaded | Puzzle or arithmetic challenge |
| Password field that accepts paste | Password field blocking paste |
| Passkey, email link, biometric | Memorised security questions |
