/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable max-lines */
const PATHMINIE = './images/MinieAdultoInverno.png';
const PATHNUTELLA = './images/InvernoSuedeAdultoNutella.png';
const PATHSTITCH = './images/InvernoSuedeAdultoStitch.png';
const PATHLAZYANIMAL = './images/InvernoSuedeAdultoBichoPreguiça.png';
const BICHOPREGUICA = 'Bicho preguiça';

const products = [{
  category: 'pijama',
  model: 'Pijama Suede Adulto de Inverno',
  salePrice: 47.99,
  sizes: [
    {
      size: 'P',
      designs: [
        {
          name: 'Minie',
          quantity: 20,
          imgPath: PATHMINIE,
        },
        {
          name: 'Stitch',
          quantity: 40,
          imgPath: PATHSTITCH,
        },
        {
          name: BICHOPREGUICA,
          quantity: 15,
          imgPath: PATHLAZYANIMAL,
        },
        {
          name: 'Nutella',
          quantity: 20,
          imgPath: PATHNUTELLA,
        },
      ],
    },
    {
      size: 'M',
      designs: [
        {
          name: 'Minie',
          quantity: 15,
          imgPath: PATHMINIE,
        },
        {
          name: 'Stitch',
          quantity: 30,
          imgPath: PATHSTITCH,
        },
        {
          name: BICHOPREGUICA,
          quantity: 12,
          imgPath: PATHLAZYANIMAL,
        },
        {
          name: 'Nutella',
          quantity: 18,
          imgPath: PATHNUTELLA,
        },
      ],
    },
    {
      size: 'G',
      designs: [
        {
          name: 'Minie',
          quantity: 18,
          imgPath: PATHMINIE,
        },
        {
          name: 'Stitch',
          quantity: 35,
          imgPath: PATHSTITCH,
        },
        {
          name: BICHOPREGUICA,
          quantity: 10,
          imgPath: PATHLAZYANIMAL,
        },
        {
          name: 'Nutella',
          quantity: 22,
          imgPath: PATHNUTELLA,
        },
      ],
    },
    {
      size: 'GG',
      designs: [
        {
          name: 'Minie',
          quantity: 25,
          imgPath: PATHMINIE,
        },
        {
          name: 'Stitch',
          quantity: 50,
          imgPath: PATHSTITCH,
        },
        {
          name: BICHOPREGUICA,
          quantity: 8,
          imgPath: PATHLAZYANIMAL,
        },
        {
          name: 'Nutella',
          quantity: 30,
          imgPath: PATHNUTELLA,
        },
      ],
    },
  ],
},
{
  category: 'Cueca',
  model: 'Thork',
  salePrice: 12.99,
  sizes: [
    {
      size: 'EXGG',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
        },
        {
          name: 'Azul Royal',
          quantity: 20,
        },
        {
          name: 'Branca',
          quantity: 50,
        },
        {
          name: 'Vermelha',
          quantity: 10,
        },
        {
          name: 'Preta',
          quantity: 200,
        },
        {
          name: 'Cinza',
          quantity: 200,
        },
        {
          name: 'Azul marinho',
          quantity: 200,
        },
      ],
    },
    {
      size: 'GG',
      designs: [
        {
          name: 'Verde',
          quantity: 25, // Quantidade para o tamanho GG
        },
        {
          name: 'Azul Royal',
          quantity: 15, // Quantidade para o tamanho GG
        },
        {
          name: 'Branca',
          quantity: 40, // Quantidade para o tamanho GG
        },
        {
          name: 'Vermelha',
          quantity: 8, // Quantidade para o tamanho GG
        },
        {
          name: 'Preta',
          quantity: 180, // Quantidade para o tamanho GG
        },
        {
          name: 'Cinza',
          quantity: 180, // Quantidade para o tamanho GG
        },
        {
          name: 'Azul marinho',
          quantity: 180, // Quantidade para o tamanho GG
        },
      ],
    },
    {
      size: 'G',
      designs: [
        {
          name: 'Verde',
          quantity: 20, // Quantidade para o tamanho G
        },
        {
          name: 'Azul Royal',
          quantity: 10, // Quantidade para o tamanho G
        },
        {
          name: 'Branca',
          quantity: 30, // Quantidade para o tamanho G
        },
        {
          name: 'Vermelha',
          quantity: 6, // Quantidade para o tamanho G
        },
        {
          name: 'Preta',
          quantity: 160, // Quantidade para o tamanho G
        },
        {
          name: 'Cinza',
          quantity: 160, // Quantidade para o tamanho G
        },
        {
          name: 'Azul marinho',
          quantity: 160, // Quantidade para o tamanho G
        },
      ],
    },
    {
      size: 'M',
      designs: [
        {
          name: 'Verde',
          quantity: 15, // Quantidade para o tamanho M
        },
        {
          name: 'Azul Royal',
          quantity: 8, // Quantidade para o tamanho M
        },
        {
          name: 'Branca',
          quantity: 20, // Quantidade para o tamanho M
        },
        {
          name: 'Vermelha',
          quantity: 4, // Quantidade para o tamanho M
        },
        {
          name: 'Preta',
          quantity: 140, // Quantidade para o tamanho M
        },
        {
          name: 'Cinza',
          quantity: 140, // Quantidade para o tamanho M
        },
        {
          name: 'Azul marinho',
          quantity: 140, // Quantidade para o tamanho M
        },
      ],
    },
    {
      size: 'P',
      designs: [
        {
          name: 'Verde',
          quantity: 10, // Quantidade para o tamanho P
        },
        {
          name: 'Azul Royal',
          quantity: 5, // Quantidade para o tamanho P
        },
        {
          name: 'Branca',
          quantity: 10, // Quantidade para o tamanho P
        },
        {
          name: 'Vermelha',
          quantity: 2, // Quantidade para o tamanho P
        },
        {
          name: 'Preta',
          quantity: 120, // Quantidade para o tamanho P
        },
        {
          name: 'Cinza',
          quantity: 120, // Quantidade para o tamanho P
        },
        {
          name: 'Azul marinho',
          quantity: 120, // Quantidade para o tamanho P
        },
      ],
    },
  ],
},
{
  category: 'Calcinha',
  model: 'infantil sublimada',
  salePrice: 3.33,
  sizes: [
    {
      size: 'EGG',
      designs: [{ name: 'Variadas', quantity: 200 }],
    },
    {
      size: 'GG',
      designs: [{ name: 'Variadas', quantity: 150 }],
    },
    {
      size: 'G',
      designs: [{ name: 'Variadas', quantity: 100 }],
    },
    {
      size: 'M',
      designs: [{ name: 'Variadas', quantity: 50 }],
    },
    {
      size: 'P',
      designs: [{ name: 'Variadas', quantity: 25 }],
    },
  ],
},
{
  category: 'Meia Calça',
  model: 'Pacote Adulto',
  salePrice: 24.99,
  sizes: [
    { size: 'Tamanho único',
      designs: [
        { name: 'preta', quantity: 4 },
      ] },
  ],
},
];

export default {
  products,
};