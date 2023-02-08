import { createStore } from "vuex";
import { auth, db } from '@/firebase'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth'
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore'



const store = createStore({
    state() {
        return {
            loggedIn: false,
            displayName: "",
            anilistUsername: "",
            uid: "",
            anilistAuth: ""
        }
    },
    getters: {
        user(state) {
            return {
                loggedIn: state.loggedIn,
                displayName: state.displayName,
                anilistUsername: state.anilistUsername,
                uid: state.uid,
                anilistAuth: state.anilistAuth
            };
        }
    },
    actions: {
        async login(state, {email, password}) {

            const response = await signInWithEmailAndPassword(auth, email, password);
            if (response) {
                const user = response.user;
                state.loggedIn = true;
                state.displayName = user.displayName;
                state.uid = user.uid;

                const q = query(collection(db, 'users'), where('uid', '==', state.uid))
                const querySnapshot = await getDocs(q);

                state.anilistUsername = querySnapshot.docs[0].data().username;
                state.anilistAuth = querySnapshot.docs[0].data().anilistAuth;
            } else {
                throw new Error('login failed')
            }
        },
        async register(state, {email, password, name, anilistUsername, anilistAuth}) {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {
                displayName: name
            });
            await addDoc(collection(db, "users"), {
                anilistAuth: anilistAuth,
                uid: user.uid,
                username: anilistUsername,
                header: "# __{{ name }}__ <br> <br> Challenge Start Date: {{ startDate }} <br> Challenge Finish Date: {{ endDate }} <br> Legend: [✓] = Completed [✗] = Not Completed <br> <hr>",
                footer: "",
            });
        },
        async logout(state) {
            await signOut(auth)
            state.loggedIn = false;
            state.displayName = "";
            state.anilistUsername = "";
            state.uid = "";
            state.anilistAuth = "";
        }
    },
})

export default store