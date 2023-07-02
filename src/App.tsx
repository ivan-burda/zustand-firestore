import {FC, useEffect} from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firestore/firestore.ts';
import {Fruit, useFruitStore} from "./zustand/zustand.ts";
import {AddButton} from "./AddButton/AddButton.tsx";
import {FruitItem} from './FruitItem/FruitItem.tsx';





export const App: FC = () => {
    const fruits = useFruitStore((state)=>state.fruits)
    const {init} = useFruitStore();
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'fruits'), (snapshot) => {
            const updatedData = snapshot.docs.map((doc) => {
            console.log(doc.data());
                return ({
                    id: doc.id,
                    ...doc.data(),
                });
            }) as Fruit[];
            init(updatedData);
        });

        return () => {
            unsubscribe();
        };
    }, []);

        return (
        <>
            <ul>
                {fruits.map(fruit=><FruitItem key={fruit.id} name={fruit.name} id={fruit.id}/>)}
            </ul>
            <AddButton name="banana" color="gold"/>
            <AddButton name="melon" color="tomato"/>
            <AddButton name="grapes" color="lavender"/>
        </>
    );
};

export default App
