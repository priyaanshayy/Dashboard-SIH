// pushData.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtoWjp8cu9ggnrONAv1RZ8RxNLIuLgyRs",
    authDomain: "collab-o-452a2.firebaseapp.com",
    projectId: "collab-o-452a2",
    storageBucket: "collab-o-452a2.appspot.com",
    messagingSenderId: "289580180962",
    appId: "1:289580180962:web:a66f65df99d6fdb69005bb",
    measurementId: "G-FVS0XWFXHM"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

// Data to be pushed
const alumniData = [
    {
        FollowersCount: 2000,
        FollowingCount: 350,
        PostsCount: 30,
        avatar: "https://example.com/avatar11.jpg",
        college: "GLA University",
        createdAt: "2024-08-27T15:20:35.361Z",
        desc: "Software Engineer at Google",
        email: "emma.wilson@example.com",
        fullName: "Emma Wilson",
        isverified: true,
        whoami: "Alumni",
        salary: "80k"
    },
    {
        FollowersCount: 1500,
        FollowingCount: 300,
        PostsCount: 22,
        avatar: "https://example.com/avatar12.jpg",
        college: "GLA University",
        createdAt: "2024-08-28T12:30:45.361Z",
        desc: "Data Analyst at Amazon",
        email: "michael.jones@example.com",
        fullName: "Michael Jones",
        isverified: true,
        whoami: "Alumni",
        salary: "70k"
    },
    {
        FollowersCount: 1800,
        FollowingCount: 320,
        PostsCount: 28,
        avatar: "https://example.com/avatar13.jpg",
        college: "GLA University",
        createdAt: "2024-08-29T16:45:55.361Z",
        desc: "Product Designer at Apple",
        email: "olivia.taylor@example.com",
        fullName: "Olivia Taylor",
        isverified: true,
        whoami: "Alumni",
        salary: "75k"
    },
    {
        FollowersCount: 2100,
        FollowingCount: 380,
        PostsCount: 35,
        avatar: "https://example.com/avatar14.jpg",
        college: "GLA University",
        createdAt: "2024-08-30T09:10:05.361Z",
        desc: "Marketing Manager at Facebook",
        email: "jack.brown@example.com",
        fullName: "Jack Brown",
        isverified: true,
        whoami: "Alumni",
        salary: "85k"
    },
    {
        FollowersCount: 2200,
        FollowingCount: 390,
        PostsCount: 40,
        avatar: "https://example.com/avatar15.jpg",
        college: "GLA University",
        createdAt: "2024-09-01T14:20:15.361Z",
        desc: "UX Researcher at Microsoft",
        email: "sophia.moore@example.com",
        fullName: "Sophia Moore",
        isverified: true,
        whoami: "Alumni",
        salary: "90k"
    },
    {
        FollowersCount: 2300,
        FollowingCount: 400,
        PostsCount: 45,
        avatar: "https://example.com/avatar16.jpg",
        college: "GLA University",
        createdAt: "2024-09-02T10:30:25.361Z",
        desc: "Cloud Engineer at IBM",
        email: "william.smith@example.com",
        fullName: "William Smith",
        isverified: true,
        whoami: "Alumni",
        salary: "95k"
    },
    {
        FollowersCount: 2400,
        FollowingCount: 410,
        PostsCount: 50,
        avatar: "https://example.com/avatar17.jpg",
        college: "GLA University",
        createdAt: "2024-09-03T11:40:35.361Z",
        desc: "Systems Analyst at Oracle",
        email: "ava.davis@example.com",
        fullName: "Ava Davis",
        isverified: true,
        whoami: "Alumni",
        salary: "100k"
    },
    {
        FollowersCount: 2500,
        FollowingCount: 420,
        PostsCount: 55,
        avatar: "https://example.com/avatar18.jpg",
        college: "GLA University",
        createdAt: "2024-09-04T13:50:45.361Z",
        desc: "Network Engineer at Cisco",
        email: "noah.johnson@example.com",
        fullName: "Noah Johnson",
        isverified: true,
        whoami: "Alumni",
        salary: "105k"
    }
];

  

// Batch write
const batch = writeBatch(db);
const adminsCollection = collection(db, 'users');

alumniData.forEach((alumni) => {
  const newDocRef = doc(collection(db, 'users')); // Create a new document reference with a random ID
  batch.set(newDocRef, alumni);
});

batch.commit().then(() => {
  console.log('Batch write succeeded');
}).catch((error) => {
  console.error('Error writing batch: ', error);
});
