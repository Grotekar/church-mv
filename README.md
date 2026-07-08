# Церковь Божия города Минеральные Воды

## PRE-PUBLISH CHECKLIST

1. Replace all `PLACEHOLDER` values in `content/church.ts`.
2. Run `npm run build`.
3. Check mobile view.
4. Verify all links.
5. Upload the contents of `out/` to hosting.

## Временный preview на GitHub Pages

GitHub Pages используется только как временный preview-деплой для ревью.

Обычный деплой на shared hosting не меняется: локальная сборка без переменных окружения использует стандартные пути и создаёт статический сайт в `out/`.

```bash
npm run build
```

### Как настроить GitHub Pages

1. Откройте репозиторий проекта на GitHub.
2. Перейдите в `Settings` → `Pages`.
3. В разделе `Build and deployment` выберите источник `GitHub Actions`.
4. Сохраните настройку, если GitHub попросит подтверждение.
5. Перейдите во вкладку `Actions`.
6. Выберите workflow `Deploy GitHub Pages preview`.
7. Нажмите `Run workflow`.
8. Дождитесь завершения jobs `Build static site` и `Deploy preview`.
9. Откройте опубликованную ссылку из блока `Deploy preview` или из `Settings` → `Pages`.

### Как работает preview-сборка

Для GitHub Pages project page workflow устанавливает переменные:

```bash
GITHUB_PAGES=true
GITHUB_PAGES_BASE_PATH=/<repository-name>
```

Это включает `basePath` и `assetPrefix` только для preview-сборки. Статический сайт загружается из `out/`.

Пример URL для project page:

```text
https://<github-username>.github.io/<repository-name>/
```

Если имя репозитория изменится, workflow автоматически использует новое имя репозитория как `basePath`.

### Перед запуском preview

1. Убедитесь, что изменения отправлены в ветку, из которой запускается workflow.
2. Проверьте локально:

```bash
npm run lint
npm run build
```

3. Помните, что GitHub Pages в этом проекте используется только для ревью, не как финальный production hosting.
