# EldoCare

## Table of Contents
- [Project Overview](#project-overview)
- [Problem Statement](#problem-statement)
- [Solution Architecture](#solution-architecture)
- [Key Features](#key-features)
- [User Roles](#user-roles)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Deployment Guide](#deployment-guide)
- [Contributing Guidelines](#contributing-guidelines)
- [License](#license)

---

## Project Overview
EldoCare is a voice-based health triage platform connecting communities to emergency healthcare services through multi-role dashboards. The system enables rapid response via automated calling systems and real-time case management for different healthcare stakeholders.

---

## Problem Statement

### Healthcare Access Challenges
- **Delayed Emergency Response**: Critical time lost in traditional healthcare pathways  
- **Limited Community Coverage**: Insufficient reach to remote areas  
- **Poor Resource Coordination**: Inefficient stakeholder collaboration  
- **Data Fragmentation**: Disconnected patient tracking systems  
- **Digital Exclusion**: Limited smartphone access in underserved communities  

### Target Impact Areas
- Rural and peri-urban communities with limited infrastructure  
- Emergency medical situations requiring immediate triage  
- Chronic disease management in underserved populations  
- Public health monitoring and response coordination  

---

## Solution Architecture

### Core Design Philosophy
Voice-first approach combining basic mobile phone access with web-based dashboards for healthcare providers.

### Technology Stack
- **Frontend**: React 19 with React Router DOM  
- **Styling**: Tailwind CSS with responsive design  
- **API Communication**: Axios for HTTP requests  
- **State Management**: React Hooks  
- **Routing**: React Router v6  

### System Components
- **Voice Gateway**: Handles incoming/outgoing voice calls  
- **Dashboard System**: Multi-role web interface  
- **Case Management Engine**: Tracks patient cases  
- **Analytics Module**: Performance insights  
- **Notification System**: Real-time alerts  

---

## Key Features

### Voice-Based Triage System
- Simple phone number input for emergency calls  
- Automatic callback within minutes  
- Country code validation  
- Real-time call status tracking  

###  Multi-Role Dashboard System

#### 1. Community Health Volunteer Dashboard
- Case submission with patient details  
- Activity tracking and verification status  
- Performance metrics and statistics  
- Quick action buttons  

#### 2. Hospital Dashboard
- Patient lead management  
- Real-time case prioritization  
- Resource allocation tracking  
- Emergency response coordination  

#### 3. NGO / Government Dashboard
- System-wide analytics and metrics  
- High-risk case monitoring  
- Resource utilization tracking  
- Impact assessment and reporting  

#### 4. Admin Dashboard
- User management and role assignment  
- System configuration  
- Audit logs and security monitoring  
- Performance analytics  

###  Real-Time Features
- Live case updates across dashboards  
- Automatic priority flagging  
- Escalation protocols for critical situations  
- Notification system for alerts  

---

##  User Roles

### 1. Community Members / Patients
- Request emergency health consultations via voice calls  
- Receive timely callback from providers  
- Access basic health information  

### 2. Community Health Volunteers
- Submit new patient cases  
- Track case verification and resolution  
- Monitor community health metrics  
- Coordinate with healthcare facilities  

### 3. Hospital Staff
- Manage incoming patient leads  
- Prioritize cases by severity  
- Coordinate emergency responses  
- Track patient outcomes  

### 4. NGO / Government Officials
- Monitor system-wide health metrics  
- Analyze community health trends  
- Coordinate resource allocation  
- Generate impact reports  

### 5. System Administrators
- Manage user accounts and permissions  
- Monitor system performance  
- Configure system settings  
- Maintain security protocols  

---

##  System Architecture

### High-Level Data Flow
1. Call Initiation: Patient submits phone number → Voice system processes request  
2. Case Creation: Successful call → Case record created in database  
3. Dashboard Update: All relevant dashboards receive real-time updates  
4. Action Processing: Healthcare providers take appropriate actions  
5. Status Tracking: Case progress tracked through resolution  
6. Analytics Generation: System performance and outcomes analyzed  

### Security Architecture
- Role-based access control with JWT tokens  
- Granular permissions for different user roles  
- HTTPS for all communications  
- Comprehensive audit logging  
- Server-side input validation  

---

##  Getting Started

### Prerequisites
- Node.js 16.x or higher  
- npm 8.x or higher  
- Modern web browser  
- Backend API endpoints  

### Installation Steps

#### Clone the Repository
```bash
git clone https://github.com/Tesla-sudo/eldo_Care
cd eldocare
````

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file:

```env
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=+
BASE_URL=https://uneclipsed-misguidingly-casen.ngrok-free.dev
PORT=3000
MONGODB_URI=mongodb://localhost:27017/health-access-db
SKIP_TWILIO_VALIDATION=true
ADMIN_API_KEY=supersecretadminkey123
HOSPITAL_API_KEY=hospitalsecretkey456
GEMINI_API_KEY=
VITE_API_BASE_URL=http://localhost:3000
VITE_ADMIN_API_KEY=YOUR_ADMIN_API_KEY
VITE_HOSPITAL_API_KEY=YOUR_HOSPITAL_API_KEY
```

#### Start Development Server

```bash
npm start
```

#### Build for Production

```bash
npm run build
```

---

##  API Documentation

### Voice API – Initiate Call

```http
POST /voice/call-me
```

### Voice API – Check Call Status

```http
GET /voice/status/:callId
```

### Hospital API – Update Lead Status

```http
PATCH /insights/hospital/leads/:leadId
```

---

##  Deployment Guide

### Deployment Options

* Traditional VPS
* Docker Container
* AWS Amplify

---

##  Contributing Guidelines

### Development Process

```bash
git checkout -b feature/your-feature-name
```

* Follow existing code style
* Write meaningful commit messages
* Include tests
* Update documentation

---

##  License

**MIT License**

Copyright (c) 2024 EldoCare Team

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

```

---

If you want, I can:
- Strip this down further for **hackathon judging**
- Add **badges** (license, build, contributors)
- Convert to a **one-page README**
- Align it with **GitHub best practices**

```
