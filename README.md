# Támogató Ebek adománygyűjtő alkalmazás

Fullstack API - Vizsgaremek

## Követelmények:

- MongoDB-alapú, NoSQL - legalább 3-féle entitás legyen (pl.: termék, rendelés, vásárló).
- NodeJS API, saját maga által leprogramozott API szolgálja ki a frontendet - legalább 5
  különböző végpont legyen (pl.: api/user, api/product, api/order…).
- A frontend Angular/React-alapú - legalább 5 külön oldal legyen, model-service-component
  architektúra, Bootstrap/Material vagy egyéb sablon használata engedélyezett, reszponzív
  legyen. A felület bizonyos oldalai csak belépés után legyenek elérhetőek (JWT-autentikáció).
- A clean kód elveit kövesse az alkalmazás összes eleme.
- Minden API-útvonalhoz legalább egy tesztet kell írni. Legalább 1-1 unit/integrációs teszt.
- Swagger-alapú dokumentáció az API-hoz.
- Markdown-dokumentáció a repository-ban, amely tartalmazza az alkalmazás telepítését,
  konfigurálását, célját.
- Dockerizálva legyen a kész alkalmazás, konténerből legyen futtatható.

---

1.  AZ ALKALMAZÁS CÉLJA

    A Támogató Ebek alkalmazás célja, hogy támogatást gyűjtsön a kutyák képzéséhez, így lehetővé téve, hogy életünk számos területén tudjanak segíteni nekünk, olyan területeken és helyzetekben, amikre az ember nem képes. Az elérendő célok bemutatásával a támogató látja, hogy mire fordítódik a felajánlott összeg, így a szívéhez legközelebb álló témát tudja támogatni.

---

2.  AZ ALKALMAZÁS TELEPÍTÉSE

    - Ha még nincsen fenn a célgépen, akkor telepíteni kell az Angular keretrendszert az npm i -g @angular/cli paranccsal

    - Forkolni kell az adott GitHub repository tartalmát
    - A célgépre le kell klónozni az adott GitHub repository tartalmát: (git clone + url)
    - Telepíteni kell az alkalmazás függőségeit a terminálban:
      - Belépni a Backend mappába -> cd .\Backend\:
        - npm i parancs kiadása
      - Belépni a Frontend mappába, azon belül a Tamogato-Ebek mappába -> cd .\Frontend\ és cd .\Tamogato-Ebek\:
        - npm i parancs kiadása (dependency probléma esetén npm i --force parancsot használni helyette)
        - a terminálban a npm run build parancsot kell kiadni

---

3.  AZ ALKALMAZÁS INDÍTÁSA

    A megadott Docker container indítása és inicializálása:

    - El kell indítani a Docker Desktop alkalmazást
    - A /Backend mappába belépve a terminálban ki kell adni az / lásd 2-es pontban /:
      - npm run docker-compose parancsot ( az alábbiak megjelenése a terminálon jelzi, hogy az alkalmazás elindult:
        - "App listening at http://localhost:3000"
        - "info: MongoDB connection has been establised successfully" )

    Az alkalmazás az alábbi URL-en fut az indítás után: http://localhost:3000

    MEGJEGYZÉS:

    A belépéshez egy érvényes e-mail-cím és jelszó páros szükséges (példa):

    ​E-MAIL | JELSZÓ :

    - ADMIN-ként: hegyaljai83@hotmail.com | Admin_pw1
    - USER-ként: user@user.com | User_pw1

---

4.  A VÉGPONTOK DOKUMENTÁCIÓJA

        Swagger: Az alábbi URL-t kell beírni a böngészőbe: http://localhost:3000/api/api-docs/

---

5.  TESZTEK INDÍTÁSA

Az npm run test paranccsal futtatható. Az integrációs tesztek a docker indítása után futnak csak le.
​

---

## Felhasznált technológiák:

### Backend:

- NodeJS
- MongoDB / Atlas
- JEST
- Docker
- JSON Web Token
- Swagger UI

### Frontend:

- Angular (with SCSS)
- Ngx Toastr
- Bootstrap
- Font Awesome

---

## Entitások

1. User
   - Egy felhasználó, aki támogatást adhat az egyes célokra.
     Tároljuk az e-mail címét, jelszavát, nevét, életkorát, városát, a szerepkörét és az összes befizetését.
2. Aid

   - Támogatás, amire támogatást adhat a felhasználó illetve amire támogatást vár az oldal.
     Tároljuk a címét, a leírását, dátumát, az összegét, eddig nyújtott támogatás összegét.

3. Dog
   - A kutyák adatait bemutató entitás.
     Tároljuk a nevét, fajtáját, korát, tanul-e még, bevethető-e és egy képet róla.
4. Success
   - A kutyák eddigi tevékenységeit, megjelenéseit bemutató oldal.
     Tároljuk a címét, helyét, dátumát, leírását.

---

## User story - agilis felhasználói történet

## Képernyők

### Bejelentkezés (gomb)

A felhasználó bejelentkezhet e-mail cím és jelszó megadásával.

- Csak kitöltés után válik aktívvá az elküldés gomb.
- Helytelen adatok megadása esetén figyelmeztető üzenet jelenik meg.

### Főoldal

A főoldal egy üdvözlő képernyő a Támogató Ebek oldal céljával.

- Megnézem a kutyákat gomb:
  - Átvisz a kutyákat bemutató oldalra.
- Adományozok gomb:
  - Átvisz az adományot váró célokat bemutató oldalra.

### Kutyáink

A gyűjtésben résztvevő kutyákat mutatja be kártyás formában.

- Az egeret a kártyára húzva jelennek meg a kutya adatai.
- Adományozok gomb:
  - Átvisz az adományt váró célokat bemutató oldalra.

### Amire gyűjtünk

Azokat a célokat mutatja be kártyás formátumban, amikre támogatást várnak.

- Támogatom gomb megnyomásával az adományozó oldalra jutunk. Csak belépés után érhető el.
- Fizetés után visszajutunk a kártyás oldalra, ahol a fizetett összeg hozzáadódik a már gyűjtött összeghez, százalékosan mérve, hogy mennyi gyűlt össze szükséges összegből és figyeli, hogy elért-e már a kívánt összeget.

### Ahol már bizonyítottunk

A kutyák eddig elért eredményeit és megjelenéseit bemutató listázó oldal.

- A listában szereplő címe kattintva lenyílik az elem és megtekinthető a leírása és a dátuma.
- Adományozok gomb:
  - Átvisz az adományt váró célokat bemutató oldalra.

### Felhasználók

A már regisztrált felhasználók adatait táblázatos formában felsoroló oldal. Csak bejelentkezés után érhető el és csak admin jogosultsággal.

- Új felhasználó gomb:
  - egy új felhasználót lehet létrehozni a megfelelő adatok kitöltése után
- Táblázat végén található módosítás gomb (ceruza):
  - az adott felhasználó adatai szerkeszthetővé válnak nyomtatványos formában
- Táblázat végén található törlés gomb (kuka):
  - az adott felhasználó törlésre kerül
- A táblázat címsorának elemeire kattintva növekvő és csökkenő sorrendbe lehet rendezni a listát
- A címsorok alatt található kereső mezőben lehet szűrni a listát az adott tulajdonság szerint

### Profilom

A bejelentkezett felhasználó adatai láthatóak táblázatos formában. Csak bejelentkezés után érhető el.

### Kijelentkezés (gomb)

Kilépteti a felhasználót az alkalmazásból. A támogatásfizetés és a felhasználók oldal csak új belépés után lesz elérhető.

---

## API végpontok:

- POST /api/login – felhasználó bejelentkezés
- POST /api/ refresh - felhasználó accessToken megújítás
- POST /api/logout – felhasználó kilépés
- GET /api/dogs – kutyák lekérdezése
- GET /api/aid – támogatások lekérdezése
- GET /api/ aid /:id - adott támogatás fizetési oldalának megnyitása
- PATCH /api/ aid /:id - támogatás fizetése
- GET /api/success – megjelenések lekérdezése
- GET /api/users – felhasználók lekérdezése
- GET /api/users / :id – felhasználó profil oldala
- POST /api/users – felhasználó létrehozása
- PATCH /api/ users / :id - felhasználó módosítása
- DELETE /api/ users / :id - felhasználó törlése

---

## Megvalósítás időtartama:

8 hét

---

## További fejlesztési lehetőségek

- További admin oldalak létrehozása a többi entitás kezelésére, mint a usernek (új létrehozás, törlés, szerkesztés).
- Adott támogatási összeg hozzáadása a felhasználó eddigi összes támogatásainak összegéhez
- Regisztráció
