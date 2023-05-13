`sass-embedded` fails to compile with the following setup:

 * using an importer function
 * a file is imported twice
 * the next file fails to import

The last import path passed to the importer has the wrong format (start with `file://`) which prevents the importer from being able to resolve the file location.

This compiles correctly with `sass` (dart-sass), but is an error when compiling with `sass-embedded`.

## Environment

```
sass-embedded 1.62.0
Windows 10 (19045.2913); nodejs v16
WSL running Ubuntu 20.0.4; nodejs v18
```

------------------------------------

## Reproducing the issue

1. Clone this project

2. Run `npm install`

3. Run `npm run build` for the failing sass-embedded example

4. Run `npm run build-dart` for the successful dart-sass example

------------------------------------

## Expected output (from dart-sass)

```
$ node build.mjs dart
## DEBUG importer url= ./foo/_a.scss
## DEBUG importer url= ./foo/_a.scss
## DEBUG importer url= ./foo/_b.scss
OK
```

## Failing output (from sass-embedded)

```
$ node build.mjs embedded
## DEBUG importer url= foo/_a.scss
## DEBUG importer url= file:///home/coridyn/sass-embedded-import-error/src/foo/_b.scss
node:internal/process/esm_loader:97
    internalBinding('errors').triggerUncaughtException(
                              ^

Error: Error: Can't find stylesheet to import.
  ╷
2 │ @import "./foo/_b.scss";
  │         ^^^^^^^^^^^^^^^
```

