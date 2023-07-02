import {FC, useEffect} from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import {Fruit, subscribeToUpdates, useFruitStore} from "./zustand/zustand.ts";
import {AddButton} from "./AddButton/AddButton.tsx";
import {FruitItem} from './FruitItem/FruitItem.tsx';


export const App: FC = () => {
    const fruits = useFruitStore((state)=>state.fruits)
    const {init} = useFruitStore();

const handleDataUpdate = (updatedData: Fruit[]) =>{
    init(updatedData);
}

    useEffect(() => {
        const unsubscribe = subscribeToUpdates( handleDataUpdate);
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
