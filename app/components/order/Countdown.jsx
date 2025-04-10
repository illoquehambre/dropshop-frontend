// components/Countdown.js
'use client';
import { useState, useEffect } from 'react';

export default function Countdown({ interval, onTimeout }) {
    const [counter, setCounter] = useState(interval);
    console.log('counter', counter)
    console.log('interval', interval)
    // Reinicia el contador cuando cambia el intervalo
    useEffect(() => {
        setCounter(interval);
    }, [interval]);

    useEffect(() => {
        if (counter <= 0) {
            onTimeout();
            return;
        }
        const id = setInterval(() => {
            setCounter(prev => prev - 1);
        }, 1000);
        return () => clearInterval(id);
    }, [counter]);

    return (
        <p>
            Reconsultando en: <strong>{counter} segundos</strong>
        </p>
    );
}
