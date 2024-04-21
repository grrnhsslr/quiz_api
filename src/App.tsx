import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import EditQuestion from './views/EditQuestion';
import EditUser from './views/EditUser';
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import { CategoryType, UserType } from './types';



export default function App() {
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [category, setCategory] = useState<CategoryType|undefined>(undefined)

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)
    const [loggedInUser, setLoggedInUser] = useState<UserType>({
        email: '',
        first_name: '',
        last_name: '',
        token: '',
        user_id: NaN
    })


    useEffect(() => {
        async function getLoggedInUser(){
            if (isLoggedIn){
                setLoggedInUser({
                    email: localStorage.getItem('email')!,
                    first_name: localStorage.getItem('first_name')!,
                    last_name: localStorage.getItem('last_name')!,
                    token: localStorage.getItem('token')!,
                    user_id: parseInt(localStorage.getItem('user_id')!)
                })
            }
        }
        getLoggedInUser();
    }, [isLoggedIn])

    const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
        setMessage(newMessage)
        setCategory(newCategory)
        setTimeout(() => {
            if (newMessage && newCategory){
                flashMessage(undefined, undefined)
            }
        }, 10000)
    }

    const logUserIn = () => {
        setIsLoggedIn(true)
    }

    const logUserOut = () => {
        setIsLoggedIn(false);
        localStorage.clear();
        setLoggedInUser({
            admin: null,
            email: '',
            first_name: '',
            last_name: '',
            token: '',
            user_id: NaN
        });
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        localStorage.removeItem('currentUser');
        flashMessage('You have been logged out', 'dark');
    }

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
            <Container>
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser} flashMessage={flashMessage} /> } />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage} /> } />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn} /> } />
                    <Route path='/question/:questionId' element={<EditQuestion flashMessage={flashMessage} currentUser={loggedInUser} />} />
                    <Route path='/user' element={<EditUser logUserOut={logUserOut} flashMessage={flashMessage} />} />
                </Routes>
            </Container>
        </>
    )
}