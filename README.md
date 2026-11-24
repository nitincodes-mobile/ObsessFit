# ObsessFit - React Native Fitness & Biometric App

A high-performance React Native fitness application built with pixel-perfect fidelity to the Figma design specifications and the **Fitness App UI & Animation** assignment requirements.

## 🌟 Key Features & Highlights

### 1. "Personalize Your Fitness Journey" Onboarding Flow
A complete, seamless 10-step assessment journey crafted to calculate metabolic rate and personalized workout splits:
- **Intro / Welcome Screen**: Full-screen atmospheric hero visual with glowing CTA to begin.
- **Step 1 - Biological Profile**: Interactive gender cards with smooth active states (Male, Female, Other).
- **Step 2 - Age Wheel Picker**: Smooth vertical scroll wheel with active focal band and dynamic typography scaling.
- **Step 3 - Current Weight Scale**: **True weighing scale dial** with angular drag rotation, live numeric readout, unit toggle (kg/lbs), inertia momentum, and haptic vibration on every tick!
- **Step 4 - Height Ruler**: **Precision vertical ruler** with millimeter & centimeter tick marks, fixed glowing indicator needle, momentum glide, and tick haptics!
- **Step 5 - Primary Fitness Goal**: 8 tailored fitness goals with custom iconography and smooth selection cards.
- **Step 6 - Target Weight Scale**: High-precision circular dial scale to establish target body mass.
- **Step 7 - Target Timeline**: Realistic progression speed options (1-3 months, 3-6 months, 6-12 months, lifestyle).
- **Step 8 - Daily Activity Level**: NEAT activity factor selection (Sedentary to Very Active) with BMR multipliers.
- **Step 9 - Fitness Experience**: Level calibrations from Beginner to Advanced.
- **Step 10 - Training Frequency**: Weekly split preference (2 to 5+ days/week).
- **Plan Generating Experience**: Interactive multi-stage biometric calculation screen with rotating ring indicator and checklist animations.

---

### 2. Physical Weighing Scale & Ruler Mechanics (Core Requirement)
Both scales are engineered to feel like authentic physical measuring instruments rather than standard sliders:
- **Circular Weight Scale Dial (`WeightScaleDial.tsx`)**:
  - Radial SVG gauge with 72 calibrated tick marks (major, medium, and minor).
  - Fixed cyan pointer needle at the top with ambient glow.
  - Tangential and angular touch tracking via `PanResponder`.
  - Natural angular velocity decay momentum on release.
  - Automatic snapping to the nearest 0.5 unit.
  - Live haptic vibration feedback (`Vibration.vibrate`) whenever a tick mark crosses under the pointer needle.
  - Animated toggle between metric (**kg**) and imperial (**lbs**).
- **Vertical Height Ruler (`HeightRuler.tsx`)**:
  - Precision vertical ruler with millimeter lines and centimeter labels.
  - Fixed glowing center pointer with horizontal guide indicator.
  - Fluid dragging with inertia deceleration.
  - Automatic snapping to the nearest whole integer.
  - Haptic tick vibration on each tick threshold.
  - Toggle between **cm** and **ft / in**.

---

### 3. Home Screen (Pixel-Perfect Figma Replication)
- **Top Header**: Live location selector (`Sector 62, Noida ▾`), notification badge, and profile avatar.
- **Global Search**: Search bar for gyms, sports courts, and events.
- **Category Navigation**: Quick filter pills (All, Gyms, Play, Events, Trainers).
- **"In The Spotlight" Featured Banner**: Showcase card for the **City Half Marathon 2026** with date tags, price tags, attendee avatars, and direct register CTA.
- **"Top Recommended Gyms"**: Horizontal carousel of gym cards featuring high-res imagery, rating badges, distance, tags (CrossFit, Strength, Steam), and monthly rates.
- **"Badminton & Sports Courts"**: Sports court cards with sport badges, surface information, pricing, and instant slot reservation.
- **"Upcoming Fitness Events"**: Upcoming races and events with date and venue info.

---

### 4. Event Details Screen (City Half Marathon)
- Parallax-style hero banner with back navigation and floating bookmark/share actions.
- Event metadata cards (Date & Time, JLN Stadium Venue with map preview).
- Attendee counter with avatar stack (+2,450 runners registered).
- "About the Event" comprehensive narrative and race distance categories (5K, 10K, 21K).
- "Things to Know" rules checklist with icons.
- Event photo gallery carousel.
- Verified organizer card ("Delhi Runners Club").
- Sticky bottom checkout bar with price indicator and "Book Now" CTA.

---

### 5. Extended Inner Flow Pages
Designed cohesively in the same sleek dark aesthetic:
- **Date & Time Picker Modal (`DatePickerModal.tsx`)**: Horizontal day/date chips and reporting time batch selectors.
- **Ticket Type Selector Modal (`TicketSelectModal.tsx`)**: 5K Fun Run, 10K Challenge, and 21K Half Marathon passes with perks and quantity counters.
- **Review Booking Screen (`ReviewBookingScreen.tsx`)**: Booking breakdown, promo code discount engine (e.g. `OBSESS15`), contact input fields, GST calculation, and platform fee summary.
- **Booking Confirmed Screen (`BookingSuccessScreen.tsx`)**: Celebration checkmark, digital pass with dashed tear perforation, high-resolution QR Code pass, and pass code.
- **Explore Gyms Screen (`GymsScreen.tsx`) & Details (`GymDetailsScreen.tsx`)**: Multi-category filterable gym directory with facility passes (Day Pass, Monthly, 3-Month).
- **Sports Courts Screen (`PlayScreen.tsx`) & Details (`CourtDetailsScreen.tsx`)**: Hourly court booking for Badminton, Turf Football, Pickleball, and Tennis with slot availability.
- **User Profile Screen (`ProfileScreen.tsx`)**: Biometric summary dashboard (Weight, Height, Target, calculated BMI), personalized plan blueprint, active digital passes with QR ticket view, and a 1-click button to re-run the assessment onboarding flow anytime.

---

## 🛠️ Tech Stack & Architecture

- **React Native 0.88.1** (New Architecture compatible)
- **React 19.3.0**
- **TypeScript** (Strict mode, 100% type-safe, zero compile errors)
- **React Navigation 7** (`@react-navigation/native-stack` & `@react-navigation/bottom-tabs`)
- **React Native SVG** (`react-native-svg`) for custom vector icons, dials, and ruler scales
- **React Native Safe Area Context**
- **Physics & Gestures**: React Native native `PanResponder`, `Animated`, and `Vibration` for 60fps momentum decay and haptics

---

## 🚀 Running the App

### Prerequisites
- Node.js >= 22
- JDK 17 (Zulu JDK 17 recommended)
- Android SDK Platform 35 / Command-line Tools / NDK

### Installation
```bash
npm install
```

### Running on Android
```bash
# Start Metro bundler
npm start

# In a separate terminal, launch Android app
npm run android
```

### Running on iOS
```bash
cd ios && bundle exec pod install && cd ..
npm run ios
```

### Building Android Release / Debug APK
```bash
cd android
./gradlew assembleDebug
# The output APK will be generated at:
# android/app/build/outputs/apk/debug/app-debug.apk
```
