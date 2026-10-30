# BLANK. Custom Apparel Studio

This project is a static storefront and can be hosted directly on GitHub Pages.

## GitHub Pages setup

1. Push this folder to a GitHub repository.
2. In GitHub, open the repository and go to Settings > Pages.
3. Set Source to `Deploy from a branch`.
4. Choose the `main` branch and the `/ (root)` folder.
5. Save.
6. GitHub will give you a Pages URL, such as:
   `https://<username>.github.io/<repository-name>/`

## Notes

- The site uses relative paths, so it works correctly under a GitHub Pages project URL.
- The admin/catalog API (`/api/products`) is optional and only works in a backend-enabled environment. The site includes a static fallback, so it still works on GitHub Pages without a server.
- The included `.nojekyll` file prevents GitHub Pages from processing the site with Jekyll.

## Local preview

Open `index.html` in a browser or run a simple local static server from this folder if you want to preview it before publishing.
