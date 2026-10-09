# Student Activity Compilation: HTML, CSS, Creativity and Responsive Design

**Aleck Joaquin T. Abacan** · BS Financial Technology · FINT109 Mobile Web App Development · Section FINT109-CON05 · 1Q26

Live site: `https://YOUR-USERNAME.github.io/fint109-compilation/` (replace with your GitHub Pages link)

## Activities

| # | Activity | Folder | What it shows |
| --- | --- | --- | --- |
| 1 | Personal Portfolio | `activities/portfolio/` | My OJT e-portfolio: profile, journey, projects, skills, certificates and contact |
| 2 | Product Information: Kova Wallet | `activities/kova-wallet/` | Two-page site for a fictional stablecoin e-wallet |
| 3 | Mobile Web App: Kova Wallet | `activities/kova-app/` | Mobile-first app that rearranges for phone, tablet and desktop |

## Folder structure

```
fint109-compilation/
├── index.html              Compilation home (Home, Activities, About)
├── css/style.css
├── images/                 Project screenshots and portrait
├── fonts/                  Hanken Grotesk, JetBrains Mono (+ licenses)
└── activities/
    ├── portfolio/          index.html, css/, js/, images/, fonts/
    ├── kova-wallet/        index.html, about.html, css/, images/, fonts/
    └── kova-app/           index.html, css/, js/, images/, fonts/
```

## Technical notes

- HTML5 and CSS3 in separate files, relative paths only, kebab-case names for files, folders, classes and IDs.
- Semantic elements on every page: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- Mobile-first CSS with media queries, Flexbox and CSS Grid; images scale with `max-width`, `aspect-ratio` and `object-fit`.
- JavaScript is optional and only adds small extras (menu animation, tabs, filters, live estimates). Every page's content and navigation still work with JavaScript turned off.
- All pages pass the W3C Nu HTML Checker with 0 errors and 0 warnings.

## Credits

- Kova Wallet is a fictional product. All names, balances, prices and rates are illustrative.
- Screenshots, illustrations, the Kova logo and icons are original work. The portrait is my own photo. The Mapúa University logo, campus photo and E.T. Yuchengco School of Business lockup in my portfolio belong to Mapúa University and are used only to identify my school.
- Fonts: Inter, Plus Jakarta Sans, Hanken Grotesk and JetBrains Mono, used under the SIL Open Font License 1.1 (license files are in each `fonts/` folder).
