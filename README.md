# Mushaf Notebook

An editable Quran you can install on a phone, tablet or computer. It works offline for reading, notes, mistakes, drawing, qiraat, translations and tafsir, and online for recitation audio, Recite & check, live lessons and chat with a teacher.

## Install it (for students and teachers)

Open the app's link in your browser, then:

- **Android (Chrome):** tap the menu (⋮) → **Install app** or **Add to Home screen**.
- **iPhone / iPad (Safari):** tap **Share** → **Add to Home Screen**.
- **Windows / Mac (Chrome or Edge):** click the install icon at the right of the address bar.

Then open **Display → Save everything for offline** once, while you have internet, to keep all translations and tafsir on the device.

## The app

Live at **https://pama7786.github.io/mushaf-notebook/**

## Put it online with GitHub Pages

1. Create a free account at <https://github.com> if you don't have one.
2. Create a new **public** repository, for example `mushaf-notebook`.
3. Upload everything in this folder to the repository (on the repository page: **Add file → Upload files**, drag the whole folder's contents in, then **Commit changes**). Keep the folder structure (`icons/`, `tafsir/`).
4. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
5. After a minute or two the link appears at the top of that page, like `https://YOUR-NAME.github.io/mushaf-notebook/`. Send that link to your students and teacher.

To update the app later, upload the changed files again; installed apps pick up the new version the next time they open with internet.

## Chat and lessons: two ways

### Direct (works straight away, no accounts)

- Open **Dashboard** and choose **I'm a student** or **I'm a teacher**.
- Each install shows its **App ID**. The student types the teacher's App ID; the teacher adds each student with their App ID.
- Messages, lesson codes and results are delivered when both people have the app open. Anything sent while the other person is offline waits on your device and is delivered when you both next have the app open.
- Live lessons, automatic mistake marking and teacher corrections work the same way.

### Firebase (messages always delivered, like WhatsApp)

1. Go to <https://console.firebase.google.com>, sign in with a Google account, and **Add project** (Google Analytics is not needed).
2. **Build → Authentication → Get started → Sign-in method → Anonymous → Enable.**
3. **Build → Firestore Database → Create database** (production mode, a location near you).
4. In Firestore, open **Rules**, replace everything with the contents of `firestore.rules` from this folder, and **Publish**.
5. **Project settings (⚙) → General → Your apps → Web (</>)**, register the app, and copy the `firebaseConfig` values.
6. Open `firebase-config.js` in this folder and replace `window.MNB_FIREBASE = null;` with your values, for example:

   ```js
   window.MNB_FIREBASE = { apiKey: "AIza…", authDomain: "your-app.firebaseapp.com", projectId: "your-app", appId: "1:…:web:…" };
   ```

   Upload the changed `firebase-config.js` to GitHub.
7. **Make someone a teacher:** they open the app, choose **I'm a teacher**, and the app shows their App ID. In Firestore, create collection `config`, document `teachers`, with a field `uids` of type **array** containing that App ID. Add more teachers to the same array.
8. **Authentication → Settings → Authorized domains:** add `YOUR-NAME.github.io`.

With Firebase on, each student's chat and lessons are visible only to that student and the teachers listed in `config/teachers`. Identities are anonymous and tied to the device: reinstalling the app or clearing the browser creates a new App ID.

## Sources and licences

This repository contains only the app, the Quran text and openly shared study data. Translations, tafsir and recitations are not stored here: the app fetches them from their publishers' services when a reader first uses them, and keeps a copy on that reader's own device for offline use.

- **Quran text** (included): Tanzil Project, Uthmani text, CC BY 3.0, published verbatim — <https://tanzil.net>. The app hides the Bismillah inside ayah 1 at display time; the file itself is unchanged.
- **Ten qiraat table** (included): farsh al-huruf from Ibn al-Jazari's an-Nashr, by santrirevo-droid/qiraat-table on GitHub.
- **Al-Shatibiyyah positions and text** (included): hanizeidan-svg/qiraat on GitHub. The poem by Imam al-Shatibi is a classical text.
- **Root words** (included): Quranic Arabic Corpus morphology, GNU GPL, via mustafa0x/quran-morphology.
- **Recitations list** (included): mp3quran.net reciter index.
- **Translations** (fetched): Sahih International, Mahmud Abduh, Muhammad Hamidullah, Fateh Muhammad Jalandhry, Diyanet İşleri, Kementerian Agama, Ali Muhsin Al-Barwani — via fawazahmed0/quran-api.
- **Tafsir** (fetched): Ibn Kathir (abridged) and Tazkirul Quran via quran.com; Tafsir al-Muyassar via alquran.cloud.
- **Audio** (streamed): everyayah.com, mp3quran.net, quran.com word audio.

If you are the author of one of the included datasets and want it credited differently or removed, please open an issue.
