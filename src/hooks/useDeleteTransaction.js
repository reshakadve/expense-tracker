import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase-config";

export const useDeleteTransaction = () => {
  const deleteTransaction = async (transactionID) => {
    try {
      await deleteDoc(doc(db, "transactions", transactionID));
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  return { deleteTransaction };
};
