import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";

export const getuserdetails = async () => {
  return new Promise((resolve, reject) => {
    const unsubscribeAuth = auth.onAuthStateChanged((usercred) => {
      if (usercred) {
        const userdata = usercred.providerData[0];
        const docRef = doc(db, "users", userdata.uid);

        const unsubscribeFirestore = onSnapshot(docRef, (docSnapshot) => {
          if (docSnapshot.exists()) {
            resolve(docSnapshot.data());
          } else {
            setDoc(docRef, userdata).then(() => {
              resolve(userdata);
            });
          }
        });

        return () => {
          unsubscribeFirestore();
          unsubscribeAuth();
        };
      } else {
        reject(new Error("not authenticated"));
        unsubscribeAuth();
      }
    });
  });
};
