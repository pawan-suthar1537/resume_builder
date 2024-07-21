import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../config/firebase.config";
import { toast } from "react-toastify";

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

export const getTemplates = async () => {
  return new Promise((res, rej) => {
    const tempquery = query(
      collection(db, "templates"),
      orderBy("timestamp", "asc")
    );

    const unsubcribe = onSnapshot(tempquery, (snapshot) => {
      const templates = snapshot.docs.map((doc) => doc.data());
      res(templates);
    });
    return () => {
      unsubcribe();
    };
  });
};

export const SavetoCollection = async (user, data) => {
  try {
    console.log('Saving to collection', user, data);

    if (!user?.collection?.includes(data?._id)) {
      const ref = doc(db, "users", user?.uid);

      await updateDoc(ref, {
        collection: arrayUnion(data?._id),
      });
      toast.success("Added to collection");
    } else {
      toast.info("Already in collection");
    }
  } catch (err) {
    console.error('Error saving to collection', err);
    toast.error(err.message);
  }
};