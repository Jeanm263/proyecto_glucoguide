# Mobile App Build Instructions

## Prerequisites

To build the Android APK, you need to have the following installed:

1. **Java Development Kit (JDK) 17 or higher**
   - Download from Oracle or OpenJDK
   - Set JAVA_HOME environment variable

2. **Android Studio**
   - Download from https://developer.android.com/studio
   - Install with Android SDK

3. **Environment Variables**
   - Set ANDROID_HOME or ANDROID_SDK_ROOT to your Android SDK path
   - Add Android tools to your PATH

## Build Process

### 1. Build the Web Application
```bash
npm run build
```

### 2. Add Android Platform (if not already added)
```bash
npx cap add android
```

### 3. Copy Web Assets to Android Project
```bash
npx cap copy android
```

### 4. Build the APK
You can use one of these methods:

**Method 1: Using Gradle directly**
```bash
cd android
./gradlew assembleDebug
```

**Method 2: Using npm script**
```bash
npm run build:apk
```

The APK will be generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

### 5. Open in Android Studio (Optional)
```bash
npx cap open android
```

## For Windows Users

On Windows, you might need to use:
```bash
cd android
.\gradlew.bat assembleDebug
```

## Troubleshooting

1. **JAVA_HOME not set**: Make sure JAVA_HOME points to your JDK installation
2. **Android SDK not found**: Ensure ANDROID_HOME is set correctly
3. **Gradle issues**: Try running `./gradlew clean` before building

## Testing the APK

Once built, you can:
1. Install on an Android emulator
2. Install on a physical Android device
3. Upload to Google Play Store (for release builds)