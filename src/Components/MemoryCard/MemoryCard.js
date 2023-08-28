import React, { useEffect, useState } from 'react'
import './MemoryCard.css'
import Data from './MemoryCardData'

const MemoryCard = () => {
    const [choiceOne, setchoiceOne] = useState('');
    const [choiceTwo, setchoiceTwo] = useState('');
    const [ComingData, setComingData] = useState(Data);
    const [matchedCards, setmatchedCards] = useState(0);
    const [score, setScore] = useState(0);
    const flipCard = (Data) => {
        if (!choiceOne) {
            setchoiceOne(Data.img);
            Data.flipped = true;
            Data.flipped2 = true;
        }
        else {
            if (!choiceTwo) {
                setchoiceTwo(Data.img);
                Data.flipped = true;
                Data.flipped2 = true;
            }
        }
    }
    useEffect(() => {
        resetGame();
    }, [])
    useEffect(() => {
        setTimeout(() => {
            checkMatching();
        }, 1000);
    }, [choiceTwo, choiceTwo])
    useEffect(() => {
        resetGame();
    }, [matchedCards === 6])
    const resetGame = () => {
        const shuffleCards = ComingData
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, flipped: false, flipped2: false, matched: false, shake: false }))
        setComingData(shuffleCards);
        setmatchedCards(0);
        setScore(0)
    }
    const checkMatching = () => {
        if (choiceOne && choiceTwo) {
            if (choiceOne === choiceTwo) {
                setScore(score + 10);
                setComingData(pre => {
                    return pre.map((card => {
                        if (card.img === choiceOne) {
                            return { ...card, matched: true, }
                        }
                        else {
                            return card;
                        }
                    }))
                })
                setTimeout(() => {
                    setmatchedCards(matchedCards + 1);
                }, 1000);
            }
            else {
                score === 0 ? setScore(0) : setScore(score - 5);
                setComingData(pre => {
                    return pre.map((card => {
                        if ((card.img === choiceOne && card.flipped !== false) || (card.img === choiceTwo && card.flipped !== false)) {
                            return { ...card, flipped: false, flipped2: false, shake: true }
                        }
                        else {
                            return card;
                        }
                    }))
                })
            }
            setchoiceOne('')
            setchoiceTwo('')
        }
    }
    return (
        <>
            <div class="container">
                <h1>Your Score : {score}</h1>
                <div class="game-container">
                    {ComingData.map((Data, index) => (
                        <div className={Data.flipped === false && Data.shake === true ? 'image shake' : 'image'} onClick={() => { (Data.flipped !== true && Data.flipped2 !== true) && flipCard(Data) }}>
                            <div className={Data.flipped === true || Data.matched === true ? 'img back-flipped' : 'img'}>
                                <img src={Data.img} alt="" />
                            </div>
                            <div className={Data.flipped2 === true || Data.matched === true ? 'background-color front-flipped ' : 'background-color'}>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MemoryCard
