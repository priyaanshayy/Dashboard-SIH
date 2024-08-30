import { getFirestore, doc, getDoc } from "firebase/firestore";

const fetchThemeColors = async (adminId) => {
  const db = getFirestore();
  const adminRef = doc(db, "admins", adminId);
  const docSnap = await getDoc(adminRef);

  if (docSnap.exists()) {
    return docSnap.data().themeColors; // Adjust based on your Firestore structure
  } else {
    console.log("No such document!");
    return null;
  }
};
