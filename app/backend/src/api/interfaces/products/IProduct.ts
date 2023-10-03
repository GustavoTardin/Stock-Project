import IDesign from './IDesign';

export default interface IProduct {
  id?: number,
  category: string,
  model: string,
  designs: IDesign[]
}

const product1: IProduct = {
  id: 1,
  category: 'Baby doll',
  model: 'Suede',
  designs: [
    {
      name: 'Nutella',
      picPath: '../Uploads/products/nutella',
      info: [
        {
          size: 'P',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'M',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'G',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'GG',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'EGG',
          quantity: 5,
          allertLow: 0,
          price: 35,
          cost: 25,
        },
      ],
    },
    {
      name: 'Minie',
      picPath: '../Uploads/products/Minie',
      info: [
        {
          size: 'P',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'M',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'G',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
        {
          size: 'GG',
          quantity: 10,
          allertLow: 0,
          price: 30,
          cost: 20,
        },
      ],
    },
  ],
};

// Design Variation Table
const example = {
  id: 'SUUHSHUDSUIHDUIHUWE',
  CATEGORY: 'Baby doll',
  model: 'PV',
  design: { 'nome da estampa': { sizes: ['P', 'M', 'G', 'GG', 'EGG'] } },
};

// cueca thork - 10.99 x 599 = 
// calcinha - 4.99 x 80 = 

/* const babyDoll2 = {
  id: 1,
  category: 'Baby Doll', //Baby doll PV: 
  model: 'Pv',
  design: 'llama'
  size: 'gg'
  buyPrice: 20.99,
  salePrice: 30.99,
  totalQuantity: 5
  allertLow: 5 
};

const newDesign = {
  name: 'llama'
  pic: foto,
  designs
}

const updatedProducts = [...products, newDesign]

const babyDoll: IProduct = {
  id: 1,
  category: 'Baby Doll',
  model: 'Pv',
  buyPrice: 20.99,
  salePrice: 30.99,
  sizes: [
    {
      size: 'GG',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
    {
      size: 'G',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
    {
      size: 'M',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
    {
      size: 'P',
      designs: [
        {
          name: 'LLama',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Mulher maravilha',
          quantity: 40,
          alertStock: 5,
        },
        {
          name: 'Snoopy',
          quantity: 60,
          alertStock: 10,
        },
      ],
    },
  ],
};

const thork: IProduct = {
  id: 2,
  category: 'Cueca',
  model: 'Box Thork',
  buyPrice: 9.99,
  salePrice: 13.50,
  sizes: [
    {
      size: 'GG',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
    {
      size: 'G',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
    {
      size: 'M',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
    {
      size: 'P',
      designs: [
        {
          name: 'Verde',
          quantity: 30,
          alertStock: 0,
        },
        {
          name: 'Vermelho',
          quantity: 20,
          alertStock: 0,
        },
        {
          name: 'Azul marinho',
          quantity: 20,
          alertStock: 0,
        },
      ],
    },
  ],
};
*/