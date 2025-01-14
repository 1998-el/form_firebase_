import { useState, useEffect } from "react";
import style from '../styles/form.module.css';

const UserForm = ({ onSubmit, initialData }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Enregistrer");

    // Utiliser useEffect pour charger les données initiales lorsque initialData change
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setButtonText("Mettre à jour");
        } else {
            setName('');
            setEmail('');
            setButtonText("Enregistrer");
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setButtonText("Enregistrement...");

        // Simuler un délai pour l'enregistrement
        await onSubmit({ name, email });

        // Après l'enregistrement, mettre à jour le texte du bouton
        setButtonText("Saved");
        setTimeout(() => {
            setButtonText("Enregistrer");
            setIsLoading(false);
            setEmail('');
            setName('');
        }, 2000); // Remettre le texte après 2 secondes
    };

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" className={style.submitButton} disabled={isLoading}>
                {isLoading ? (
                    <span className={style.spinner}></span>
                ) : (
                    buttonText
                )}
            </button>
        </form>
    );
};

export default UserForm;