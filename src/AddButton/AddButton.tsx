import {FC} from 'react';
import {useFruitStore} from "../zustand/zustand.ts";

interface Props {
    name: string;
    color:string;
}

import styles from './styles.module.css'

export const AddButton: FC<Props> = ({name,color}) => {
    const {addFruit} = useFruitStore();
    return (
        <button className={styles.addButton} style={{backgroundColor: color}} onClick={() => addFruit(name)}>Add {name}</button>
    );
};