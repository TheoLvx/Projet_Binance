// import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../context/UserContext"; // Import du contexte

// const MiniBlog = () => {
//   const { user } = useContext(UserContext); // Récupérer l'utilisateur connecté
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
//     setMessages(storedMessages);
//   }, []);

//   const envoyerMessage = () => {
//     if (!user) {
//       alert("Tu dois être connecté pour envoyer un message !");
//       return;
//     }

//     if (!message.trim()) {
//       alert("Écris un message !");
//       return;
//     }

//     const nouveauMessage = { auteur: user.username, contenu: message, date: new Date().toLocaleString() };
//     const nouveauxMessages = [...messages, nouveauMessage];

//     setMessages(nouveauxMessages);
//     localStorage.setItem("messages", JSON.stringify(nouveauxMessages));
//     setMessage("");
//   };

//   return (
//     <div className="mini-blog-container">
//       <h2>📝 Mini-Blog</h2>
      
//       {user ? (
//         <div>
//           <textarea
//             placeholder="Écris ton message ici..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//           />
//           <button onClick={envoyerMessage}>Envoyer</button>
//         </div>
//       ) : (
//         <p>🚫 Tu dois être connecté pour écrire un message.</p>
//       )}

//       <h3>💬 Messages :</h3>
//       <ul>
//         {messages.map((msg, index) => (
//           <li key={index}>
//             <strong>{msg.auteur}</strong> ({msg.date}) : {msg.contenu}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MiniBlog;
