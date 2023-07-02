import {create} from "zustand";
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import {produce} from "immer";
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firestore/firestore.ts';
export interface Fruit{
    id: string;
    name:string;
}

interface FruitsState{
    fruits:Fruit[];
    init:(fruits:Fruit[])=>void;
    addFruit: (fruit: string)=> void;
    removeFruit: (fruitId: string)=> void;
}

const DELIBERATE_DELAY = 100;

const handleAddFruit = async(fruit:Fruit)=>{
    try{
        const docRef = doc(db, 'fruits',fruit.id);
        setTimeout(async()=> await setDoc(docRef, fruit),DELIBERATE_DELAY)
        console.log(`Fruit ${fruit.name} added with ID:`, docRef.id);
    }
    catch(error){
        console.log('Error adding a new fruit', error);
    }
}

const handleRemoveFruit = async(id:string)=>{
    try{
        const docRef = doc(db, 'fruits', id)
        setTimeout(async()=> await deleteDoc(docRef),DELIBERATE_DELAY)
        console.log(`The fruit with the id ${id} has been removed.`);
    }
    catch(error){
        console.log('Error removing the fruit', error);
    }
}

export const useFruitStore = create<FruitsState>(
    (set) => ({
        fruits: [],
        init: (fruits:Fruit[]) => {
            set(produce((state) => {
                state.fruits = fruits;
            }));
        },
        addFruit: (fruit:string) => {
            set(produce((state) => {
                const id = uuidv4()
                state.fruits.push({name:fruit, id });
                handleAddFruit({name:fruit, id })
            }));
        },
        removeFruit: (fruitId: string) => {
            set(produce((state) => {
                state.fruits = state.fruits.filter((stateFruit:Fruit)=>stateFruit.id!==fruitId);
                handleRemoveFruit(fruitId);
            }));
        },
    }),
);