"use client";

import { useEffect, useState } from 'react';
import { db } from '../lib/firebaseConfig'; 
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import { addUser, deleteUser, updateUser } from '../lib/firestoreService';
import { collection, getDocs } from 'firebase/firestore'; 
import styles from '../styles/Home.module.css'; 
import img from '../assets/employees-885338_1280.jpg'

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
  
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users'); 
        const userSnapshot = await getDocs(usersCollection); 
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList); 
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async (userData) => {
    const id = await addUser(userData);
    setUsers([...users, { id, ...userData }]);
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    setUsers(users.filter(user => user.id !== id));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async (userData) => {
    await updateUser(editingUser.id, userData);
    setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...userData } : user)));
    setEditingUser(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
       

      </div>
      <div className={styles.rightSection}>
      <h3 className={styles.title}>Manager Users</h3>
      <UserForm onSubmit={editingUser ? handleUpdateUser : handleAddUser} initialData={editingUser} />
      <UserList users={users} onDelete={handleDeleteUser} onEdit={handleEditUser} />
      </div>
    </div>
  );
};

export default Home;
