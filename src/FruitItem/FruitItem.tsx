import {FC, ReactElement} from 'react';
import Emoji from 'react-emoji-render';
import styles from './styles.module.css'
import {useFruitStore} from "../zustand/zustand.ts";
interface Props {
    id:string;
    name:string;
}


const unicodeIcons: Record<string,ReactElement> = {
    'banana':<Emoji text="🍌" className={styles.emoji}/>,
    'melon':<Emoji text="🍉" className={styles.emoji}/>,
    'grapes':<Emoji text="🍇" className={styles.emoji}/>,
}

export const FruitItem: FC<Props> = ({name,id}) => {
    const {removeFruit} = useFruitStore();
    return (
        <div className={styles.fruit}>
            <button onClick={()=>removeFruit(id)}>x</button>
            {unicodeIcons[name]}</div>
    );
};