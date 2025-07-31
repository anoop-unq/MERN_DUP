// import axios from "axios";
// import { createContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";

// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   axios.defaults.withCredentials = true;
//   const [islogged, setIsLogged] = useState(false);
//   const [userdata, setUserData] = useState(null); // Changed from false to null


//   const backendUrl = import.meta.env.VITE_BACKEND_URL;

//   const getUserData = async () => {
//     try {
//       const response = await axios.get(`${backendUrl}/api/user/data`, {
//         withCredentials: true,
//       });

//       console.log(response.data);

//       if (response.data.success) {
//         // setIsLogged(true)
//         setUserData(response.data.userData);
//       } else {
//         toast.error(response.data.message || "Failed to fetch user data");
//       }
//     } catch (error) {
//       //  setIsLogged(false);
//       toast.error(
//         error?.response?.data?.message || error.message || "Something went wrong"
//       );
//     }
//   };

//  const getAuthState = async () => {
//   try {
//     const response = await axios.get(`${backendUrl}/api/user-auth`, {
//       withCredentials: true
//     });

//     if (response.data.success) {
//       setIsLogged(true);
//       getUserData();
//     } else {
//       setIsLogged(false);
//     }
//   } catch (error) {
//     setIsLogged(false); // <- fallback for unauthenticated users
//     console.warn("Not logged in:", error?.response?.data?.message);
//   }
// };


//       useEffect(()=>{
//     getAuthState();
//   },[])


//   useEffect(() => {
//         if (!guestId) {
//             createGuestProfile();
//         } else {
//             getGuestProfile(guestId);
//         }
//     }, [guestId]);

//   const value = {
//     backendUrl,
//     getUserData,
//     islogged,
//     setIsLogged,
//     userdata,
//     setUserData,
  
//   };

//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };



import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  axios.defaults.withCredentials = true;
  
  // User Authentication States
  const [islogged, setIsLogged] = useState(false);
  const [userdata, setUserData] = useState(null);

  // Guest AUthentication
  const [guest,setGuest] = useState('')
  const [realGuest,setRealguest] = useState('')
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Get user data (for authenticated users)
  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setUserData(response.data.userData);
      } else {
        toast.error(response.data.message || "Failed to fetch user data");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "Something went wrong"
      );
    }
  };

  // Get authentication state (check if user is logged in)
  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user-auth`, {
        withCredentials: true,
      });

      if (response.data.success) {
        setIsLogged(true);
        getUserData();
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      setIsLogged(false);
      console.warn("Not logged in:", error?.response?.data?.message);
    }
  };



  // const postGuest = async()=>{
  //   try {

  //     const response = await axios.post(backendUrl+"/api/guest")
  //     setGuest(response.data)
  //     console.log(response.data,"from AuthContext")
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const postGuest = async () => {
  try {
    const response = await axios.post(`${backendUrl}/api/guest`,{
           withCredentials: true,
    });

    if (response.data.success) {
      setGuest(response);
      localStorage.setItem("id",response.data.guestId)
      
      // Navigate to the home page after creating or verifying guest
      // navigate("/home");  // Assuming you are using `useNavigate` from React Router
    } else {
      toast.error(response.data.message || 'Guest profile already exists');
      // navigate("/home");  // Navigate to home even if the guest profile exists
    }
  } catch (error) {
    console.log(error);
    toast.error("Error creating guest profile");
  }
};

const getGuest = async () => {
    const guestId = localStorage.getItem("id")
    console.log(guestId);
    const userId = guest.guestId; // Get the guestId from your state or props
    console.log(userId)
    try {
        // Send the request to get the guest profile using guestId in the query params
        const response = await axios.get(`${backendUrl}/api/get-guest?guestId=${guestId}`, {
            withCredentials: true,  // This ensures the cookies (including token) are sent with the request
        });

        setRealguest(response.data);  // Set the guest profile data into the state
    } catch (error) {
        console.error("Error fetching guest profile:", error);
        toast.error('Error fetching guest profile.');
    }
};


const guestLogout = async()=>{
     try {
        // Send the request to get the guest profile using guestId in the query params
        const response = await axios.post(`${backendUrl}/api/guest-logout`, {
            withCredentials: true,  // This ensures the cookies (including token) are sent with the request
        });
        // setRealguest(null)
         localStorage.removeItem('guestId');
         console.log(response,"Logout")
                toast.success('Guest logged out successfully!');
           // If you are storing the guestId in localStorage
        // sessionStorage.removeItem('guestId');
        // Set the guest profile data into the state
    } catch (error) {
        console.error("Error fetching guest profile:", error);
        toast.error('Error fetching guest profile.');
    }
}

  // Effect hooks to manage state
  useEffect(() => {
    getAuthState();

 // Check user auth state on initial load
  }, []);

  useEffect(()=>{
    postGuest(),
    getGuest()
  },[])


  // Return context value
  const value = {
    backendUrl,
    getUserData,
    islogged,
    setIsLogged,
    userdata,
    setUserData,
    guest,
    postGuest,
    getGuest,
    realGuest,
    guestLogout
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};


