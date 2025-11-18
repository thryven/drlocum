# Doses: Product Overview

**Doses** is a web-based Progressive Web Application (PWA) designed to assist healthcare professionals in accurately calculating medication dosages for both pediatric and adult patients. The primary goal is to enhance patient safety by providing a reliable, user-friendly tool based on established medical standards and official clinical guidelines.

## Target Audience

The application is intended for use by a wide range of healthcare professionals, including:

- Doctors
- Nurses and Nurse Practitioners
- Pharmacists
- Medical Students
- Paramedics and other emergency medical personnel

## Key Features

### 1. Quick Drug Reference & Dose Calculator

The core feature of the application is a rapid dose calculator integrated with a comprehensive quick-reference drug database.

- **Audience Modes**: Toggle between **Pediatric** and **Adult** modes to tailor calculations and drug information.
- **Weight-Based Dosing**: Calculates dosages based on patient weight. For pediatric patients, if weight is not provided, it estimates the weight based on age using standard growth charts.
- **Dynamic Filtering**: Users can filter the drug list by common clinical complaints (e.g., Pain & Fever, Respiratory, Antibiotics) for faster access.
- **Real-time Calculations**: Dosages are updated instantly as user inputs change.
- **Clear Dosage Display**: Each medication card shows the calculated dose, administration volume (e.g., mL), and frequency (e.g., TDS, QID).

### 2. Medical Calculators

A suite of interactive clinical calculators is available to assist in various diagnostic and assessment scenarios. Current calculators include:

- **Pregnancy Due Date Calculator**: Estimates due date based on Last Menstrual Period (LMP) and ultrasound data, following ACOG guidelines.
- **Neonate Weight Loss**: Calculates weight loss percentage in newborns to assess hydration and feeding status.
- **STOP-BANG Score**: A screening tool for Obstructive Sleep Apnea (OSA).
- **Ideal Body Weight (IBW)**: Calculates IBW using the Devine formula and provides Adjusted Body Weight for medication dosing in overweight patients.
- **Centor Score**: Determines the probability of streptococcal pharyngitis to guide testing and treatment.
- **Framingham Risk Score**: Assesses the 10-year risk of coronary heart disease.
- **Depression Anxiety Stress Scale (DASS-21)**: A 21-item questionnaire to measure the severity of depression, anxiety, and stress symptoms.
- **Patient Health Questionnaire-9 (PHQ-9)**: A tool for monitoring the severity of depression and guiding treatment.

### 3. Clinical Resources

A curated library of essential clinical reference guides and schedules.

- **National Immunisation Schedule**: Displays the Malaysian National Immunisation Programme (NIP) schedule.
- **Haematological Parameters**: Provides pediatric reference values for common blood tests.
- **Neonatal Jaundice Assessment**: Includes Kramer's rule for visual assessment and TSB level guidelines for phototherapy and exchange transfusion.

### 4. Drug Information Pages

Detailed pages for specific medications, providing in-depth clinical information.

- **MDX-Powered Content**: Content is written in MDX, allowing for rich formatting, tables, and custom components like callouts for warnings and notes.
- **Comprehensive Details**: Includes indications, contraindications, adverse effects, and administration notes.

### 5. Offline Capabilities (PWA)

The application is a fully-featured Progressive Web App, ensuring it remains functional even without an internet connection.

- **Offline Access**: Core drug data, calculators, and resources are cached for offline use.
- **Add to Home Screen**: Can be installed on mobile devices for a native-like app experience.

## Safety & Design Philosophy

- **Safety First**: The application is built with multiple layers of validation to prevent dosage errors. Warnings and notes are prominently displayed. It is designed as a tool to aid, not replace, clinical judgment.
- **Mobile-First & Responsive**: The UI is optimized for mobile devices, ensuring a seamless experience on phones, tablets, and desktops.
- **Accessibility**: The application is designed to be accessible, with support for keyboard navigation, screen readers, and high-contrast modes.
- **Performance**: The architecture is optimized for fast load times and smooth interactions, even on slower network connections.
