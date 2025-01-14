import styles from '../styles/userList.module.css'; // Assurez-vous d'importer le module CSS

const UserList = ({ users, onDelete, onEdit }) => {
    return (
        <div className={styles.container}>
        <table className={styles.userTable}>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} className={styles.list}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className={styles.editButton} onClick={() => onEdit(user)}>Modifier</button>
                            <button className={styles.deleteButton} onClick={() => onDelete(user.id)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
};

export default UserList;