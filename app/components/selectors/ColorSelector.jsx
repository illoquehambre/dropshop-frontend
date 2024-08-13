'use client';
import { useEffect, useState } from 'react';
import { getColorCode } from '../../services/colorService';
//const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'];

const ColorSelector = ({ onSelect, colors }) => {
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    useEffect(() => {
        if (selectedColor) {
            onSelect(selectedColor);
        }
    }, [selectedColor, onSelect]);
    
    const handleColorClick = (color) => {
        setSelectedColor(color);
        onSelect(color)
    };

    const colorsCodes = colors.map(color => getColorCode(color))
    return (
        <div className="flex justify-left items-center my-3 ">
            {colorsCodes.length > 0 && colorsCodes.map((color) => (
                <div
                    key={color.name}
                    className={`w-8 h-8 rounded-full m-2 cursor-pointer transition-all  border-2   ${color.name === selectedColor ? 'border-red-600/75 hover:border-1' : 'border-zinc-700/75'
                        } hover:scale-125 hover:border-1`}
                    style={{ backgroundColor: color.code }}
                    onClick={() => handleColorClick(color.name)}
                ></div>
            ))}
        </div>


    );
};

export default ColorSelector;
