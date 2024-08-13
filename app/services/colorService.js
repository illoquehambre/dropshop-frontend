const colorMap = {
    "White": "#FFFFFF",
    "Black": "#000000",
    "DarkGrey": "#333333",
    "LightGrey": "#CCCCCC",
    "Red": "#FF0000",
    "Green": "#008000",
    "Blue": "#0000FF",
    "Yellow": "#FFFF00",
    "Orange": "#FFA500",
    "Pink": "#FFC0CB",
    "Purple": "#800080",
    "Brown": "#A52A2A",
    "Light Blue": "#ADD8E6",
    "Lime Green": "#32CD32",
    "Turquoise": "#40E0D0",
    "Lavender": "#E6E6FA",
    "Olive": "#808000",
    "Navy": "#000080",
    "Maroon": "#800000",
    "Sky Blue": "#87CEEB",
    "Dark Heather": "#3D3C3A",
    "Oxblood Black": "#53413F",
    "Cardinal": "#490005",
    "Dark Brown": "#4C2F20",
    "Heather Midnight Navy": "#2A2A35",
    "Heather Forest": "#23463D",
    "DarkRed": "#56272D",
    "True Royal": "#0D2D60",
    "Dark GreyHeather": "#A6A39F",
    "Berry": "#871631",
    "Asphalt": "#515151",
    "Army": "#4B5320",
    "Heather Olive": "#4C4B34",
    "Heather Raspberry": "#7C2832",
    "Autumn": "#D17B49",
    "Heather Deep Teal": "#21525B",
    "Heather True Royal": "#275487",
    "Aqua": "#1A82A0",
    "Toast": "#C59A6C",
    "Kelly": "#008C3D",
    "Heather Kelly": "#568F61",
    "Mauve": "#C1828D",
    "Heather Mauve": "#D19BA6",
    "Leaf": "#556B2F",
    "Steel Blue": "#406C80",
    "Pebble": "#9E9D8C",
    "Burnt Orange": "#BF5E23",
    "Heather Orchid": "#D9B3E6",
    "Gold": "#FFC100",
    "Mustard": "#FFB600",
    "Heather Stone": "#9A8A75",
    "Heather Prism Lilac": "#D4A9E6",
    "Tan": "#D2B48C",
    "Heather Dusty Blue": "#7A96B5",
    "Lilac": "#C8A2C8",
    "Heather Prism Mint": "#9FE2BF",
    "Heather Prism Peach": "#F2BEB2",
    "Soft Cream": "#F3E5AB",
    "Heather Prism Ice Blue": "#93D2E2",
    "Mint": "#A3E1D4",
    "Silver": "#C0C0C0",
    "Ash": "#B2BEB5",
    "Citron": "#DFFF00",
    "Charcoal Heather": "#CDCBCC"
}

  
  export const getColorCode = (colorName) => {
    return {
        "code": `${colorMap[colorName] || '#000000'}`,
        "name": colorName
    }// Default to black if color not found
  };
  
  // Example usage
  /*
  const productColor = 'Rojo';
  const colorCode = getColorCode(productColor);
  
  console.log(`The color code for ${productColor} is ${colorCode}`);
  */