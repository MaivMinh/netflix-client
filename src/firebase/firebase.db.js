import {
  doc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "./firebase.config";

export default {
  addNewUser: async (uid) => {
    // Kiểm tra xem user có tồn tại hay không.
    const docRef = doc(db, "users", `${uid}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return;
    }
    try {
      setDoc(
        doc(db, "users", uid),
        {
          savedMovies: [],
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  },

  updateSavedMovies: async (status, uid, movie) => {
    const userRef = doc(db, "users", uid);
    if (status) {
      // Khi status == true => thêm phim vào danh sách các phim đã lưu.
      try {
        await updateDoc(userRef, {
          savedMovies: arrayUnion({
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
          }),
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // Ngược lại xoá các phim đã chọn.
      try {
        await updateDoc(userRef, {
          savedMovies: arrayRemove({
            id: movie.id,
            title: movie.title,
            backdrop_path: movie.backdrop_path,
          }),
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  },
};
