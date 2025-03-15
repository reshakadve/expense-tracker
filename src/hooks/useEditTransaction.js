import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useEditTransaction = () => {
  const editTransaction = async (transactionID, updatedData) => {
    try {
      const transactionRef = doc(db, "transactions", transactionID);
      await updateDoc(transactionRef, updatedData);
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  };

  return { editTransaction };
};
