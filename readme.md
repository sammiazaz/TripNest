tripnest/
├── backend/
│   ├── config/
│   │   └── supabase.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── permissions.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── trips.js
│   │   ├── logs.js
│   │   └── invitations.js
│   ├── utils/
│   │   └── generateInviteLink.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Dashboard/
    │   │   │   ├── TripCard.jsx
    │   │   │   └── TripList.jsx
    │   │   ├── TripSpace/
    │   │   │   ├── Timeline.jsx
    │   │   │   ├── MapView.jsx
    │   │   │   └── TripHeader.jsx
    │   │   ├── Modals/
    │   │   │   ├── AddLogModal.jsx
    │   │   │   └── InviteModal.jsx
    │   │   └── Layout/
    │   │       ├── Navbar.jsx
    │   │       └── Sidebar.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── SocketContext.jsx
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── TripDetail.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── index.jsx
    └── package.json