import React from "react";
import ChipInput from './components/ChipInput';
import userData from './data/data.json'; 
import { User } from './types';
// import "./App.scss";

// as it might slow the app by little
// Validate or transform userData to ensure it matches the User[] type
// const validatedUserData: User[] = userData.map(user => ({
//   id: user.id,
//   name: user.name,
//   email: user.email,
// }));


const App: React.FC = () : JSX.Element => {

  return (
    <div className="grid place-items-center  mt-[100px]">
   
    <div className="flex justify-center w-[60%] flex-col items-center">
      
      <h1 className="text-blue-500 text-2xl font-[600]">Pick Users</h1>
     
      <ChipInput users={userData as User[]} />
    </div>
    </div>
  );
};

export default App;
