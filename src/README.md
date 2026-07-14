# DermaVision+ landing page

## Files

- `DermaVisionLanding.jsx` — the whole page, one component, default export.
- `assets/dermavision-home.jpg` — the real app home screen (720 × 1441), shown inside the phone.

## Installing the asset

The phone reads the screenshot from `/assets/dermavision-home.jpg`, so the file
must be served from the web root.

**Vite / CRA**
```
public/assets/dermavision-home.jpg
```

**Next.js**
```
public/assets/dermavision-home.jpg
```

That's it — no import, no bundler config. If you'd rather bundle it, change the
constant near the top of the file:

```jsx
import appHome from "./assets/dermavision-home.jpg";
const APP_HOME = appHome;
```

## The APK

`APK.href` in the `Download` section points at `/downloads/derma-vision-latest.apk`.
Replace it with your real file, and update `version`, `size`, `minAndroid` and
`updated` in the same object.

Note: the `download` attribute only forces a download for same-origin files. If
you host the APK on S3/R2/a CDN, set a `Content-Disposition: attachment` header
on the object, or the browser may just navigate to it.

## Requirements

React 18+ and Tailwind. No other dependencies. Fonts (Poppins + Nunito Sans)
load via `@import` inside the component — on Next.js, move them to `next/font`
for a faster first paint.
