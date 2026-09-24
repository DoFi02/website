# Dominik Fink — personal website

A small, dependency-free bilingual website, ready for GitHub Pages.

## Preview locally

From this directory, run `python3 -m http.server 8000` and open `http://localhost:8000/`.

## Add articles later

Add objects to the array in `articles.js`. Each object needs a `title`, article `url`, and `comment` with `de` and `en` text. The article overview at `/articles/` updates automatically.

## Publish with GitHub Pages

The repository is [DoFi02/website](https://github.com/DoFi02/website), with `main` as its default branch. To publish it, open **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/ (root)`. The site uses relative paths, so it works under a GitHub Pages project URL as well as a custom domain.
