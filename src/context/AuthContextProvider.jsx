/* ======= LINK THAM KHẢO: https://stackoverflow.com/questions/68104551/react-firebase-authentication-and-usecontext ====== */

/* Phần này bỏ hết các hàm signIn, signUp, logOut .. bên trong AuthContext<>. Thay vào đó, chúng ta viết trực tiếp chúng bên trong components. */

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined); // user == uid account.
  const [searchResult, setSearchResult] = useState(undefined);
  /* Chú ý quan trong: Hàm onAuthStateChanged() này chỉ nên thực hiện một lần, bởi vì nếu sử dụng các phương thức Authorization như google hoặc đăng nhập, đăng kí bằng password thì không sao, vì sau khi thực hiện thành công các phương thức đó sẽ gọi lại hàm onAuthStateChanged() này một lần nữa.
  Nhưng đối với đăng nhập bằng facebook thì khác, chúng sẽ không gọi lại hàm onAuthStateChanged() này, dẫn tới khi chúng ta đăng nhập xong, navigate('/') lại thì câu lệnh useEffect() này sẽ gọi, nó sẽ check trạng thái đăng nhập và vì đăng nhập = facebook nên không có thông tin của currentUser, dẫn tới user = undefined.
    Vì thế, cách làm tốt nhất là chỉ gọi useEffect() này một lần duy nhất khi page chạy (không cần cho user vào mảng theo dõi dòng 28.), vì nếu có user trước đó, thì user = currentUser, còn nếu không thì không sao và cũng vì các phương thức đăng nhập/kí hoặc google cũng đã gọi onAuthStateChanged() sau khi đăng nhập thành công rồi nên không cần gọi nhiều lần ở hàm useEffect() này.
   */

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser)
        setUser(currentUser?.uid);
      return () => {
        unSubcribe();
      };
    });

    const cookies = decodeURIComponent(document.cookie).split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name == "access_token") {
        const data = jwtDecode(value); // Thông tin của user.
        const _user = {
          "username": data.username,
          "permission": data.permission,
        };
        setUser(_user);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, searchResult, setSearchResult}}>
      {children}
    </AuthContext.Provider>
  );
};

export function UserAuth() {
  return useContext(AuthContext);
}
export default AuthContextProvider;
