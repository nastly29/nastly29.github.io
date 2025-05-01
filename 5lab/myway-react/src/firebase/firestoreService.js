import { collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp,query,orderBy, increment,limit} from "firebase/firestore";
import { db } from "./firebase";

// Запис інформації про користувача
export const saveUserProfile = async (uid, profileData) => {
  try {
    await setDoc(doc(db, "users", uid), profileData);
  } catch (error) {
    console.error("Помилка при збереженні профілю:", error);
  }
};

// Читання інформації про користувача
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Помилка при отриманні профілю:", error);
    return null;
  }
};

//Збільшення монет користувача
export const updateUserCoins = async (uid, amount) => {
  await updateDoc(doc(db, "users", uid), {
    coins: increment(amount)
  });
};

//Повертає кількість монет користувача з профілю
export const getUserCoins = async (uid) => {
     const snap = await getDoc(doc(db, "users", uid));
     return snap.exists() ? snap.data().coins || 0 : 0;
   };
  

//Отримання топ користувачів за монетами
export const getTopUsers = async (topN = 10) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("coins", "desc"), limit(topN));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Додавання нової цілі
export const addGoal = async (uid, goalData) => {
  try {
    await addDoc(collection(db, `users/${uid}/goals`), goalData);
  } catch (error) {
    console.error("Помилка при додаванні цілі:", error);
  }
};

// Отримання всіх цілей користувача
export const getGoals = async (uid) => {
  try {
    const goalsCollection = collection(db, `users/${uid}/goals`);
    const goalsSnapshot = await getDocs(goalsCollection);
    const goalsList = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return goalsList;
  } catch (error) {
    console.error("Помилка при отриманні цілей:", error);
    return [];
  }
};

//Оновити статус цілі
export const updateGoalStatus = async(uid, goalId, newStatus) => {
  const goalRef = doc(db, `users/${uid}/goals/${goalId}`);
  await updateDoc(goalRef, { status: newStatus });
};

// Видалити ціль
export const deleteGoal = async (uid, goalId) => {
  const goalRef = doc(db, `users/${uid}/goals/${goalId}`);
  await deleteDoc(goalRef);
};

//Оновити виконані кроки цілі
export const updateCompletedSteps = async(uid, goalId, completedSteps) =>{
  const goalRef = doc(db, `users/${uid}/goals/${goalId}`);
  await updateDoc(goalRef, {completedSteps});
};

//Додати новий пост у спільноту
export const addCommunityPost = async(postData) =>{
  await addDoc(collection(db, "posts"),{
    ...postData,
    createAt: serverTimestamp(),
    likes: 0,
  });
};

// Отримати всі пости спільноти
export const getCommunityPosts = async () => {
  const q = query(collection(db, "posts"), orderBy("createAt", "desc"));
  const postsSnapshot = await getDocs(q);
  const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return postsList;
};

export const toggleCommunityPostLike = async (postId, userId) => {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);

  if (postSnap.exists()) {
    const postData = postSnap.data();
    const likedBy = postData.likedBy || [];

    let updatedLikes = postData.likes || 0;
    let updatedLikedBy = [...likedBy];

    if (likedBy.includes(userId)) {
      // Якщо вже лайкнув — забираємо лайк
      updatedLikes--;
      updatedLikedBy = likedBy.filter(id => id !== userId);
    } else {
      // Якщо ще не лайкнув — додаємо лайк
      updatedLikes++;
      updatedLikedBy.push(userId);
    }

    await updateDoc(postRef, {
      likes: updatedLikes,
      likedBy: updatedLikedBy
    });
  }
};