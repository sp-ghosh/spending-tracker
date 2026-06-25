# CLAUDE.md

## Project Overview

**Spendly** is a Flask 3.1.3 expense tracker using server-side Jinja2 templating, vanilla CSS/JS, and SQLite. It is an incremental learning project — most routes are stubs waiting for implementation.

## Architecture

```
expense-tracker/
├── app.py                  # All routes and Flask app setup
├── database/
│   ├── __init__.py         # Empty
│   └── db.py               # Stub — will hold get_db(), init_db(), seed_db()
├── templates/
│   ├── base.html           # Layout: navbar, footer, block slots
│   ├── landing.html         # Marketing landing page
│   ├── register.html        # Registration form (POST handler not yet wired)
│   ├── login.html           # Login form (POST handler not yet wired)
│   ├── terms.html           # Static legal page
│   └── privacy.html         # Static legal page
├── static/
│   ├── css/style.css        # All styles, CSS custom properties at top
│   └── js/main.js           # YouTube modal logic (minimal)
├── requirements.txt         # Flask, Werkzeug, pytest, pytest-flask
├── .gitattributes           # Enforces LF line endings for all source files
└── .gitignore
```

### Where things belong

- **New routes** → `app.py`. One function per route, snake_case names.
- **All DB logic** → `database/db.py`. Never put SQL or connection handling in `app.py`.
- **New pages** → `templates/`. Every template must `{% extends "base.html" %}` and use `{% block content %}`.
- **All styles** → `static/css/style.css`. Use existing CSS custom properties from `:root`. No inline styles except where the current templates already use them (terms/privacy width overrides).
- **Client-side JS** → `static/js/main.js`. No JS frameworks, no npm, no bundlers.
- **Tests** → `tests/` directory (does not exist yet — create it when adding tests). Use `pytest-flask`.

## Commands

```bash
# First-time setup
python -m venv venv
venv\Scripts\activate          # Windows
source venv/bin/activate       # macOS/Linux
pip install -r requirements.txt

# Run dev server (port 5001)
python app.py

# Run all tests
pytest

# Run a single test file
pytest tests/test_auth.py

# Run a single test by name
pytest tests/test_auth.py -k "test_login_valid"
```

## Code Style

- **Route functions**: lowercase `snake_case`. Name matches the page concept (`landing`, `register`, `login`, `add_expense`).
- **Templates**: use `url_for('function_name')` for all internal links. Exception: `register.html` and `login.html` currently hardcode form `action` URLs — fix this when implementing POST handlers.
- **Template titles**: follow `Page Name — Spendly` pattern via `{% block title %}`.
- **Error display**: templates expect an `error` variable for flash-style messages (see `{% if error %}` blocks in auth templates). Pass it from the route via `render_template("register.html", error="...")`.
- **CSS naming**: BEM-ish flat classes scoped by component prefix (`hero-`, `auth-`, `mock-`, `nav-`, `feature-`, `cta-`, `footer-`, `terms-`, `form-`, `btn-`).
- **CSS custom properties**: all colors, fonts, radii, and widths are in `:root`. Use them — never hardcode hex values.
- **No comments** unless explaining a non-obvious "why".

## Tech Constraints

- **Framework**: Flask only. No Django, no FastAPI.
- **Database**: SQLite only (`expense_tracker.db`). No ORMs — use raw `sqlite3`.
- **Frontend**: Vanilla HTML/CSS/JS. No React, no Tailwind, no npm packages, no build step.
- **Fonts**: DM Serif Display (headings) and DM Sans (body) loaded from Google Fonts in `base.html`. Do not add other font imports.
- **Currency**: Indian Rupees (₹) everywhere. Never use $ or other currency symbols.
- **Line endings**: LF enforced via `.gitattributes`. Do not change this.
- **Dependencies**: only add to `requirements.txt` if absolutely necessary. Current deps are Flask, Werkzeug, pytest, pytest-flask.

## Route / Feature Status

| Route | Methods | Status | Notes |
|---|---|---|---|
| `/` | GET | **Done** | Landing page with hero, features, CTA, video modal |
| `/register` | GET | **Partial** | Form renders, but no POST handler — form submits to hardcoded `/register` |
| `/login` | GET | **Partial** | Form renders, but no POST handler — form submits to hardcoded `/login` |
| `/terms` | GET | **Done** | Static legal page |
| `/privacy` | GET | **Done** | Static legal page |
| `/logout` | GET | **Stub** | Returns plain string "coming in Step 3" |
| `/profile` | GET | **Stub** | Returns plain string "coming in Step 4" |
| `/expenses/add` | GET, POST | **Stub** | Returns plain string "coming in Step 7" (no POST method registered yet) |
| `/expenses/<id>/edit` | GET, POST | **Stub** | Returns plain string "coming in Step 8" (no POST method registered yet) |
| `/expenses/<id>/delete` | GET | **Stub** | Returns plain string "coming in Step 9" |

## Warnings / Gotchas

- **Port 5001**, not 5000. Hardcoded in `app.py` line 65.
- **No `app.secret_key`** is set. Sessions and `flash()` will not work until you add one. Set it before implementing auth.
- **`database/db.py` is entirely a stub** — it has only comments describing what `get_db()`, `init_db()`, and `seed_db()` should do. No actual code.
- **`database/__init__.py` is empty.** Don't assume anything is importable from `database` yet.
- **No tests directory exists.** `pytest-flask` is in requirements but there are no test files or `conftest.py`.
- **Auth forms hardcode action URLs** — `register.html` uses `action="/register"` and `login.html` uses `action="/login"` instead of `url_for()`. Fix when adding POST handlers.
- **Stub routes lack HTTP methods** — `/expenses/add` and `/expenses/<id>/edit` are registered as GET-only despite needing POST. Add `methods=["GET", "POST"]` when implementing.
- **YouTube iframe API** is loaded in `base.html` on every page (line 46), not just landing. The video modal only exists in `landing.html`.
- **`expense_tracker.db` is gitignored.** Each dev environment starts with no database — `init_db()` must create tables.
