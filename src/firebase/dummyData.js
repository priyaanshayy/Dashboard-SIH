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
const studentsData = [
    {
        FollowersCount: 300,
        FollowingCount: 150,
        PostsCount: 10,
        avatar: "https://example.com/avatar1.jpg",
        college: "GLA University",
        createdAt: "2024-08-27T15:20:35.361Z",
        desc: "Student learning Full Stack Development with MERN stack",
        email: "john.doe@example.com",
        fullName: "John Doe",
        isverified: false,
        whoami: "Student",
        techStack: "MongoDB, Express, React, Node.js"
    },
    {
        FollowersCount: 350,
        FollowingCount: 120,
        PostsCount: 12,
        avatar: "https://example.com/avatar2.jpg",
        college: "GLA University",
        createdAt: "2024-08-28T12:30:45.361Z",
        desc: "Enthusiastic about Frontend Development, working with React and Tailwind CSS",
        email: "jane.doe@example.com",
        fullName: "Jane Doe",
        isverified: false,
        whoami: "Student",
        techStack: "HTML, CSS, JavaScript, React, Tailwind CSS"
    },
    {
        FollowersCount: 280,
        FollowingCount: 160,
        PostsCount: 8,
        avatar: "https://example.com/avatar3.jpg",
        college: "GLA University",
        createdAt: "2024-08-29T16:45:55.361Z",
        desc: "Aspiring Data Scientist with knowledge of Python and Machine Learning",
        email: "sam.smith@example.com",
        fullName: "Sam Smith",
        isverified: false,
        whoami: "Student",
        techStack: "Python, Pandas, Scikit-learn, TensorFlow"
    },
    {
        FollowersCount: 400,
        FollowingCount: 200,
        PostsCount: 15,
        avatar: "https://example.com/avatar4.jpg",
        college: "GLA University",
        createdAt: "2024-08-30T09:10:05.361Z",
        desc: "Back-end Developer focusing on RESTful APIs and cloud deployment",
        email: "lisa.brown@example.com",
        fullName: "Lisa Brown",
        isverified: false,
        whoami: "Student",
        techStack: "Node.js, Express, MongoDB, AWS"
    },
    {
        FollowersCount: 310,
        FollowingCount: 170,
        PostsCount: 9,
        avatar: "https://example.com/avatar5.jpg",
        college: "GLA University",
        createdAt: "2024-09-01T14:20:15.361Z",
        desc: "Mobile App Developer with a passion for Flutter and Firebase",
        email: "tom.jones@example.com",
        fullName: "Tom Jones",
        isverified: false,
        whoami: "Student",
        techStack: "Flutter, Dart, Firebase"
    },
    {
        FollowersCount: 270,
        FollowingCount: 140,
        PostsCount: 7,
        avatar: "https://example.com/avatar6.jpg",
        college: "GLA University",
        createdAt: "2024-09-02T10:30:25.361Z",
        desc: "AI enthusiast with hands-on experience in Deep Learning",
        email: "emily.davis@example.com",
        fullName: "Emily Davis",
        isverified: false,
        whoami: "Student",
        techStack: "Python, Keras, PyTorch"
    },
    {
        FollowersCount: 330,
        FollowingCount: 180,
        PostsCount: 11,
        avatar: "https://example.com/avatar7.jpg",
        college: "GLA University",
        createdAt: "2024-09-03T11:40:35.361Z",
        desc: "Web Developer with a knack for building responsive websites",
        email: "alex.johnson@example.com",
        fullName: "Alex Johnson",
        isverified: false,
        whoami: "Student",
        techStack: "HTML, CSS, JavaScript, Bootstrap"
    },
    {
        FollowersCount: 360,
        FollowingCount: 190,
        PostsCount: 14,
        avatar: "https://example.com/avatar8.jpg",
        college: "GLA University",
        createdAt: "2024-09-04T13:50:45.361Z",
        desc: "Blockchain Developer with a focus on smart contracts",
        email: "sarah.moore@example.com",
        fullName: "Sarah Moore",
        isverified: false,
        whoami: "Student",
        techStack: "Solidity, Ethereum, Web3.js"
    }
];

// Batch write
const batch = writeBatch(db);

studentsData.forEach((student) => {
  const newDocRef = doc(collection(db, 'users')); 
  batch.set(newDocRef, student);
});

batch.commit().then(() => {
  console.log('Batch write succeeded');
}).catch((error) => {
  console.error('Error writing batch: ', error);
});
