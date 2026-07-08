# Церковь Божия города Минеральные Воды

## PRE-PUBLISH CHECKLIST

1. Replace all `PLACEHOLDER` values in `content/church.ts`.
2. Run `npm run build`.
3. Check mobile view.
4. Verify all links.
5. Upload the contents of `out/` to hosting.

## Временный preview на GitHub Pages

GitHub Pages используется только как временный preview-деплой для ревью.

Локальная разработка и обычный shared hosting используют стандартные пути:

```bash
npm run build
```

Для GitHub Pages project page workflow устанавливает:

```bash
GITHUB_PAGES=true
GITHUB_PAGES_BASE_PATH=/<repository-name>
```

Это включает `basePath` и `assetPrefix` только для preview-сборки. Статический сайт загружается из `out/`.

В GitHub нужно включить Pages с источником GitHub Actions, затем запустить workflow `Deploy GitHub Pages preview`.
