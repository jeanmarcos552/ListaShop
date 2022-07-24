<h1 align="center">
  # Projeto Lista de compras
</h1>


<h3 align="center">
    Build Android
</h3>

```
yarn react-native bundle --platform android --dev false       --entry-file index.js       --bundle-output android/app/src/main/assets/index.android.bundle       --assets-dest android/app/build/intermediates/res/merged/release
```
then, run:
```
cd android && ./gradlew assembleRelease
```
