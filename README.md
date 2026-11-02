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

## Signing in

The app opens on a sign-in screen. Nobody reaches the Quran or the dashboards until they sign in, and the screen has a language picker so everyone can read it in their own language.

- **With Firebase switched on:** everyone signs in with email and password. The role (student or teacher) is chosen once at sign-up and can never be changed, not in the app and not through the database rules. A teacher who also wants a student account signs up again with another email. After the first sign-in the app also opens offline.
- **Without Firebase:** the first screen asks once whether you are a student or a teacher. That choice is fixed on that device.

## Chat and lessons: two ways

### Direct (works straight away, no accounts)

- Open **Dashboard** and choose **I'm a student** or **I'm a teacher**.
- Each install shows its **App ID**. The student types the teacher's App ID; the teacher adds each student with their App ID.
- Messages, lesson codes and results are delivered when both people have the app open. Anything sent while the other person is offline waits on your device and is delivered when you both next have the app open.
- Live lessons, automatic mistake marking and teacher corrections work the same way.

### Accounts and classes (Firebase)

With Firebase switched on, everyone signs up with an email and password as a **student** or a **teacher**:

- **Teachers** create classes, each with a join code and a timetable. For every class they see all students, take **attendance**, run the **recitation queue** (Call next student), set each student's **Sabaq, Sabqi and Murajaah** for today, record each recitation as **Passed or Repeat** with grade, mistakes and comment, and see a **class summary**: where each student is reciting, their pass rate and their most common mistake.
- **Students** join a class with the code and see today's Sabaq, Sabqi and Murajaah, their **place in the queue** (with a message when it's their turn), the **learning times**, and their **daily summary** of what the teacher marked and commented. Students who join no class learn on their own.
- **Students choose how to learn** when they sign up: **in a class** (with the teacher's code) or **on their own**. Learning on your own means setting your own daily Sabaq, Sabqi and Murajaah and logging how each recitation went. A student can join a class later, or leave one, at any time.
- **Everyone has a profile** (My profile): name, place, country, languages, about me; students add their level, what they have memorized and their goal; teachers add their ijazah, the qiraat they teach and years teaching. Phone, date of birth, email and guardian details are private: only the person and the teachers of the classes they joined can see them.
- The **app language** is chosen on the sign-up form and can be changed in the profile at any time.
- **Each student's programme**: the teacher sets that student's own lesson times, whether lessons are online or in person (with the place or meeting link), the amount per lesson, what it takes to pass (most mistakes allowed, minimum grade) and extra work. The student sees it all under My programme, with their next lesson.
- **Changing the time**: the teacher can edit the times at any time, and the student can tap **Request a time change**. The request appears in their chat and the teacher taps **Accept** (the new time is saved straight into the programme) or **Decline**.
- Every teacher comment, note and chat message has a **Translate** button that translates it into the reader's chosen language. This is machine translation by MyMemory, and its quality varies, especially for Somali and Swahili.

**Switching it on (about 10 minutes):**

1. Go to <https://console.firebase.google.com>, sign in with a Google account and **Add project** (Google Analytics is not needed).
2. **Build → Authentication → Get started → Sign-in method → Email/Password → Enable → Save.**
3. **Authentication → Settings → Authorized domains → Add domain:** `pama7786.github.io`
4. **Build → Firestore Database → Create database** (production mode, a location near you).
5. In Firestore, open **Rules**, replace everything with the contents of `firestore.rules` from this repository, and **Publish**.
6. **Project settings (⚙) → General → Your apps → Web (</>)**, register the app, and copy the `firebaseConfig` values.
7. Edit `firebase-config.js` in this repository and replace `window.MNB_FIREBASE = null;` with your values:

   ```js
   window.MNB_FIREBASE = { apiKey: "AIza…", authDomain: "your-app.firebaseapp.com", projectId: "your-app", appId: "1:…:web:…" };
   ```

   Commit the change. The live app picks it up within a minute or two.

The Firebase `apiKey` is not a secret: it identifies your project, and the security rules decide who can read and write what. Each student sees only their own plan, records and chat, and only the class teacher can change them.

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
