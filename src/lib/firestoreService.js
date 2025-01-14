// lib/firestoreService.js
import { db } from './firebaseConfig.js';
import { collection, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Ajouter un utilisateur

export const addUser = async (userData) => {
  try {
    const newUser = {
      ...userData,
      createdAt: serverTimestamp(), // Ajoute un timestamp du serveur
    };
    const docRef = await addDoc(collection(db, 'users'), newUser);
    console.log("Utilisateur ajouté avec succès, ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    // Gestion des erreurs améliorée
    console.error("Erreur lors de l'ajout de l'utilisateur: ", error.message);
    if (error.code) {
      switch (error.code) {
        case 'permission-denied':
          console.error("Vous n'avez pas la permission d'écrire dans cette collection.");
          break;
        case 'unavailable':
          console.error("Le service est temporairement indisponible. Veuillez réessayer plus tard.");
          break;
        default:
          console.error("Une erreur inconnue s'est produite.");
      }
    }
    return null; // Retourne null en cas d'erreur
  }
};
// Supprimer un utilisateur
export const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, 'users', id));
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur: ", error);
  }
};

// Mettre à jour un utilisateur
export const updateUser = async (id, userData) => {
  try {
    const userRef = doc(db, 'users', id);
    const updatedData = {
      ...userData,
      updatedAt: serverTimestamp(), // Optionnel : ajoute un timestamp de mise à jour
    };
    await updateDoc(userRef, updatedData);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur: ", error);
  }
};